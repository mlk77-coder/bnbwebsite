"use client";

import { formatPrice } from "@/lib/utils";
import useCheckoutStore from "@/store/use-checkout-store";
import useCurrencyStore from "@/store/use-currency-store";
import { Coupon } from "@/types/checkout";
import { useTranslations } from "next-intl";
import { FC } from "react";

type PropsType = {
  invoice_value: number;
};

const CheckoutTotalLabel: FC<PropsType> = ({ invoice_value }) => {
  const t = useTranslations();
  const shipping = useCheckoutStore((state) => state.shipping);
  const coupon = useCheckoutStore((state) => state.coupon);
  const currency = useCurrencyStore((state) => state.currency);
  const symbol = useCurrencyStore((state) => state.symbol);

  const calculateDiscount = (
    coupon: Coupon | null,
    invoiceValue: number
  ): number => {
    if (!coupon) return 0;
    if (coupon.discount_amount) {
      const discountAmount = parseFloat(coupon.discount_amount);
      // إذا كانت قيمة الخصم أكبر من قيمة الفاتورة، اجعل الخصم مساويًا لقيمة الفاتورة
      return discountAmount > invoiceValue ? invoiceValue : discountAmount;
    }
    if (coupon.discount_percentage) {
      return (parseFloat(coupon.discount_percentage) / 100) * invoiceValue;
    }
    return 0;
  };

  const discount = calculateDiscount(coupon, invoice_value);
  const subtotal = invoice_value - discount;
  
  // إذا لم يتم تعيين قيمة التوصيل، اجعل total صفرًا إذا كان الخصم يغطي قيمة الفاتورة
  let total = subtotal > 0
    ? subtotal + (shipping !== -1 ? shipping : 0)
    : shipping !== -1
    ? shipping
    : 0;

  return (
    <p className="flex w-full items-center justify-between capitalize">
      <span className="text-lg font-semibold text-primary">{t("total")}</span>
      <span className="text-2xl font-bold tracking-tight text-foreground tabular-nums">
        {formatPrice(total * currency, symbol)}
      </span>
    </p>
  );
};

export default CheckoutTotalLabel;
