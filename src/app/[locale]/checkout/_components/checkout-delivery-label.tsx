"use client";

import { formatPrice } from "@/lib/utils";
import useCheckoutStore from "@/store/use-checkout-store";
import useCurrencyStore from "@/store/use-currency-store";
import { useTranslations } from "next-intl";

const CheckoutDeliveryLabel = () => {
  const t = useTranslations();
  const currency = useCurrencyStore((state) => state.currency);
  const symbol = useCurrencyStore((state) => state.symbol);
  const shipping = useCheckoutStore((state) => state.shipping);
  return (
    <p className="capitalize flex w-full justify-between items-center">
      <span className="text-primary font-medium">{t("delivery")}</span>{" "}
      <span>
        {shipping === -1 ? "--" : formatPrice(shipping * currency, symbol)}
      </span>
    </p>
  );
};

export default CheckoutDeliveryLabel;
