"use client";

import { formatPrice } from "@/lib/utils";
import useCurrencyStore from "@/store/use-currency-store";

const CheckoutProductPrice = ({
  price,
  quantity,
}: {
  price: number;
  quantity: number;
}) => {
  const currency = useCurrencyStore((state) => state.currency);
  const symbol = useCurrencyStore((state) => state.symbol);
  return (
    <p className="text-base font-semibold text-foreground tabular-nums">
      {formatPrice(+price * quantity * currency, symbol)}
    </p>
  );
};

export default CheckoutProductPrice;
