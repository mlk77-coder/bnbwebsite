"use client";

import { formatPrice } from "@/lib/utils";
import useCheckoutStore from "@/store/use-checkout-store";
import useCurrencyStore from "@/store/use-currency-store";
import { Coupon } from "@/types/checkout";
import { useTranslations } from "next-intl";
import { FC } from "react";

type PropsType = {
  total: number;
};

const OrderTotalLabel: FC<PropsType> = ({ total }) => {
  const t = useTranslations();
  const currency = useCurrencyStore((state) => state.currency);
  const symbol = useCurrencyStore((state) => state.symbol);

  return (
    <p className="capitalize px-4 flex w-full justify-between items-center">
      <span className="text-primary font-medium">{t("total")}</span>
      <span className="text-xl font-bold">
        {formatPrice(total * currency, symbol)}
      </span>
    </p>
  );
};

export default OrderTotalLabel;
