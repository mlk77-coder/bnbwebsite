import { FetcherResponse } from "@/lib/fetcher";
import CartProductsList from "@/features/cart/client/cart-product-list";
import { GetCartResponse } from "@/types/cart";
import { FC } from "react";

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
  if (!cartResponse.ok) return null;
  const cart = cartResponse.data.data;
  return (
    <div className="space-y-6">
      <CartProductsList
        cart={cart}
        isLoggedIn={isLoggedIn}
        userToken={userToken}
      />
    </div>
  );
};

export default CartProducts;
