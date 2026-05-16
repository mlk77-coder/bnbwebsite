"use client";

import PaymentButton from "@/features/checkout/client/payment-button";
import { FC } from "react";

type PropsType = {
  isLoggedIn: boolean;
  token: string;
};

/** Cart totals already include shipping; order API only needs address + payment + notes. */
const PayOrGetShipping: FC<PropsType> = ({ isLoggedIn, token }) => (
  <PaymentButton isLoggedIn={isLoggedIn} token={token} />
);

export default PayOrGetShipping;
