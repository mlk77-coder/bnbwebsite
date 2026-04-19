"use client";

import useCheckoutStore from "@/store/use-checkout-store";
import GetShippingButton from "./get-shipping-button";
import PaymentButton from "./payment-button";
import { FC } from "react";

type PropsType = {
  id: number;
  isLoggedIn: boolean;
  token: string;
};
const PayOrGetShipping: FC<PropsType> = ({ id, isLoggedIn, token }) => {
  const shipping = useCheckoutStore((state) => state.shipping);
  return (
    <div className="px-4">
      {shipping === -1 ? (
        <GetShippingButton />
      ) : (
        <PaymentButton id={id} isLoggedIn={isLoggedIn} token={token} />
      )}
    </div>
  );
};

export default PayOrGetShipping;
