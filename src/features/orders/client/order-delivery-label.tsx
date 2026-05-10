"use client";

import { formatPrice } from "@/lib/utils";
import useCurrencyStore from "@/store/use-currency-store";
import { useTranslations } from "next-intl";

const OrderDeliveryLabel = ({ delivery }: { delivery: number }) => {
  const t = useTranslations();
  const currency = useCurrencyStore((state) => state.currency);
  const symbol = useCurrencyStore((state) => state.symbol);
  return (
    <p className="capitalize flex w-full justify-between items-center">
      <span className="text-primary font-medium">{t("delivery")}</span>{" "}
      <span>{formatPrice(delivery * currency, symbol)}</span>
    </p>
  );
};

export default OrderDeliveryLabel;
