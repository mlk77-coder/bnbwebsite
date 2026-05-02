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
    <p className="flex w-full items-center justify-between text-base capitalize">
      <span className="font-medium text-primary">{t("subtotal")}</span>
      <span className="tabular-nums text-muted-foreground">
        {formatPrice(invoice_value * currency, symbol)}
      </span>
    </p>
  );
};

export default CheckoutSubtotalLabel;
