import getCart from "@/api/cart/get-cart";
import useCartCountStore from "@/store/use-cart-count-store";
import useCartShoppingStore from "@/store/use-cart-shopping-store";
import { Cart } from "@/types/cart";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

const useUpdateCart = (cart: Cart, userToken: string, isLoggedIn: boolean) => {
  const locale = useLocale();
  const [hasFetched, setHasFetched] = useState(false);
  const setPrice = useCartShoppingStore((state) => state.setPrice);
  const setProductsCount = useCartCountStore((state) => state.setProductsCount);

  const query = useQuery({
    queryKey: ["cart"],
    initialData: cart,
    queryFn: async () => {
      const response = await getCart(userToken, locale, isLoggedIn);
      if (!response.ok)
        return {
          created_at: "",
          id: 0,
          invoice_value: 0,
          total: 0,
          products: [],
        };
      return response.data.cart;
    },
  });

  useEffect(() => {
    if (query.data) {
      setPrice({
        invoice_value: query.data.invoice_value,
        total: query.data.total,
      });
      setProductsCount(query.data.products.reduce((a, b) => a + b.quantity, 0));
    }
  }, [query.data]);

  // Effect to set hasFetched to true after the first render
  useEffect(() => {
    if (!hasFetched) {
      setHasFetched(true);
    }
  }, [hasFetched]);

  return query;
};

export default useUpdateCart;
