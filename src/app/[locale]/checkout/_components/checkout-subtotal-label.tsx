"use client";

import { formatPrice } from "@/lib/utils";
import useCurrencyStore from "@/store/use-currency-store";
import { useTranslations } from "next-intl";

const CheckoutSubtotalLabel = ({
  invoice_value,
}: {
  invoice_value: number;
}) => {
  const t = useTranslations();
  const currency = useCurrencyStore((state) => state.currency);
  const symbol = useCurrencyStore((state) => state.symbol);

  return (
    <p className="capitalize flex w-full justify-between items-center">
      <span className="text-primary font-medium">{t("subtotal")}</span>{" "}
      <span>{formatPrice(invoice_value * currency, symbol)}</span>
    </p>
  );
};

export default CheckoutSubtotalLabel;
