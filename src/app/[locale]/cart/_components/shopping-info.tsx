"use client";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn, formatPrice } from "@/lib/utils";
import { Link } from "@/navigation";
import useCartShoppingStore from "@/store/use-cart-shopping-store";
import useCurrencyStore from "@/store/use-currency-store";
import { useTranslations } from "next-intl";
import useUpdateCart from "../hooks/use-update-cart";
import { Cart } from "@/types/cart";

const ShoppingInfo = () => {
  const t = useTranslations();
  const invoice_value = useCartShoppingStore((state) => state.invoice_value);
  const currency = useCurrencyStore((state) => state.currency);
  const symbol = useCurrencyStore((state) => state.symbol);

  return (
    <div
      className={cn(
        "w-full md:w-5/12 space-y-6 static md:sticky top-16 p-4 lg:w-4/12 sm:ms-4 lg:ms-10",
        {
          "hidden md:hidden": invoice_value !== undefined && invoice_value <= 0,
        }
      )}
    >
      <h3 className="text-xl uppercase font-bold">{t("shopping-info")}</h3>
      <Separator />
      <div className="space-y-2">
        <p className="capitalize text-lg flex w-full justify-between items-center">
          <span className="text-primary font-medium">{t("subtotal")}</span>{" "}
          <span>{formatPrice(invoice_value * currency, symbol)}</span>
        </p>
        {/* <p className="capitalize text-lg flex w-full justify-between items-center">
          <span className="text-primary font-medium">{t("total")}</span>{" "}
          <span>{formatPrice(total, "USD")}</span>
        </p> */}
      </div>
      <Link
        href="/checkout"
        className={cn(
          buttonVariants({ size: "lg" }),
          "w-full text-lg h-12 uppercase"
        )}
      >
        {t("continue-to-checkout")}
      </Link>
    </div>
  );
};

export default ShoppingInfo;
