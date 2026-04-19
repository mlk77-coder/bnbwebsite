import { FetcherResponse } from "@/lib/fetcher";
import { Cart, GetCartResponse } from "@/types/cart";
import { FC } from "react";
import CartProductsList from "./cart-product-list";
import { getTranslations } from "next-intl/server";

type PropsType = {
  cartResponse: FetcherResponse<GetCartResponse>;
  userToken: string;
  isLoggedIn: boolean;
};

const CartProducts: FC<PropsType> = async ({
  cartResponse,
  userToken,
  isLoggedIn,
}) => {
  const t = await getTranslations();
  if (!cartResponse.ok) return null;
  const cart = cartResponse.data;
  return (
    <div className="space-y-6">
      <CartProductsList
        cart={cart.cart}
        isLoggedIn={isLoggedIn}
        userToken={userToken}
      />
    </div>
  );
};

export default CartProducts;
