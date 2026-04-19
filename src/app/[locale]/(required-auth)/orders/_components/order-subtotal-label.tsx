"use client";

import { formatPrice } from "@/lib/utils";
import useCurrencyStore from "@/store/use-currency-store";
import { useTranslations } from "next-intl";

const OrderSubtotalLabel = ({
  invoice_value,
  coupon,
}: {
  invoice_value: number;
  coupon: null | string;
}) => {
  const t = useTranslations();
  const currency = useCurrencyStore((state) => state.currency);
  const symbol = useCurrencyStore((state) => state.symbol);

  return (
    <>
      <p className="capitalize flex w-full justify-between items-center">
        <span className="text-primary font-medium">{t("subtotal")}</span>{" "}
        <span>
          {formatPrice((invoice_value) * currency, symbol)}
        </span>
      </p>
      <p className="capitalize flex w-full justify-between items-center">
        <span className="text-primary font-medium">{t("coupon-value")}</span>{" "}
        <span>
          {formatPrice((coupon ? +coupon : 0) * currency, symbol)}
        </span>
      </p>
    </>
  );
};

export default OrderSubtotalLabel;
