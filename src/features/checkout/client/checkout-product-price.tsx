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
    <p className="mt-1 text-sm font-bold text-primary tabular-nums">
      {formatPrice(+price * quantity * currency, symbol)}
    </p>
  );
};

export default CheckoutProductPrice;
