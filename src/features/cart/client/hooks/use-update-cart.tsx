"use client";

import getCart from "@/features/cart/api/get-cart";
import useCartCountStore from "@/store/use-cart-count-store";
import useCartShoppingStore from "@/store/use-cart-shopping-store";
import { Cart } from "@/types/cart";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useEffect } from "react";

const useUpdateCart = (cart: Cart, userToken: string, isLoggedIn: boolean) => {
  const locale = useLocale();
  const setCartSummary = useCartShoppingStore((state) => state.setCartSummary);
  const setProductsCount = useCartCountStore((state) => state.setProductsCount);

  const query = useQuery({
    queryKey: ["cart"],
    initialData: cart,
    queryFn: async () => {
      const response = await getCart(userToken, locale, isLoggedIn);
      if (!response.ok)
        return {
          items: [],
          summary: {
            subtotal: 0,
            tax: 0,
            shipping: 0,
            total: 0,
          },
        };
      return response.data.data;
    },
  });

  useEffect(() => {
    if (query.data) {
      setCartSummary({
        subtotal: query.data.summary.subtotal,
        tax: query.data.summary.tax,
        shipping: query.data.summary.shipping,
        total: query.data.summary.total,
      });
      setProductsCount(query.data.items.reduce((a, b) => a + b.quantity, 0));
    }
  }, [query.data, setCartSummary, setProductsCount]);

  return query;
};

export default useUpdateCart;
