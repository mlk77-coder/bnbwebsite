"use client";
import { formatPrice } from "@/lib/utils";
import useCurrencyStore from "@/store/use-currency-store";
import { Truck } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

const DeliveryAlert = () => {
  const t = useTranslations();
  const currency = useCurrencyStore((state) => state.currency);
  const country = useCurrencyStore((state) => state.country);
  const symbol = useCurrencyStore((state) => state.symbol);
  const shipmentFees = useCurrencyStore((state) => state.shipmentFees);
  const locale = useLocale();
  const region =
    country === "LEBANON"
      ? "Lebanon"
      : country === "SYRIA"
      ? "syria"
      : country === "AE"
      ? "UAE"
      : "Lebanon";
  const regionAr =
    country === "LEBANON"
      ? "لبنان"
      : country === "SYRIA"
      ? "سوريا"
      : country === "AE"
      ? "الامارات"
      : "لبنان";
  return (
    <p className="w-full flex justify-center gap-2 py-4 text-primary font-medium items-center bg-[#e5e2d1]">
      <Truck />
      {t("standard-home-delivery-region-from", {
        price: formatPrice(shipmentFees * currency, symbol),
        region: locale === "ar" ? regionAr : region,
      })}
    </p>
  );
};

export default DeliveryAlert;
