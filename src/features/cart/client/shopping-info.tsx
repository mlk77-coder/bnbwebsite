"use client";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn, formatPrice } from "@/lib/utils";
import { Link } from "@/navigation";
import useCartShoppingStore from "@/store/use-cart-shopping-store";
import useCurrencyStore from "@/store/use-currency-store";
import { ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { useTranslations } from "next-intl";

const ShoppingInfo = () => {
  const t = useTranslations();
  const subtotal = useCartShoppingStore((state) => state.subtotal);
  const tax = useCartShoppingStore((state) => state.tax);
  const shipping = useCartShoppingStore((state) => state.shipping);
  const total = useCartShoppingStore((state) => state.total);
  const currency = useCurrencyStore((state) => state.currency);
  const symbol = useCurrencyStore((state) => state.symbol);

  return (
    <div
      className={cn(
        "w-full md:w-5/12 lg:w-4/12 sm:ms-4 lg:ms-10 static md:sticky top-20",
        {
          "hidden md:hidden": subtotal <= 0,
        }
      )}
    >
      <div className="overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-xl shadow-primary/10">
        <div className="bg-linear-to-br from-primary/10 via-primary/5 to-transparent p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">
                BNB Store
              </p>
              <h3 className="mt-1 text-2xl font-bold text-foreground">
                {t("shopping-info")}
              </h3>
            </div>
            <span className="flex size-11 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
              <ShieldCheck className="size-5" />
            </span>
          </div>
        </div>

        <div className="space-y-4 p-5">
          <div className="space-y-3 rounded-2xl bg-secondary/40 p-4">
            <p className="flex w-full items-center justify-between text-sm capitalize">
              <span className="text-muted-foreground">{t("subtotal")}</span>
              <span className="font-medium">
                {formatPrice(subtotal * currency, symbol)}
              </span>
            </p>
            <p className="flex w-full items-center justify-between text-sm capitalize">
              <span className="text-muted-foreground">{t("tax")}</span>
              <span className="font-medium">
                {formatPrice(tax * currency, symbol)}
              </span>
            </p>
            <p className="flex w-full items-center justify-between text-sm capitalize">
              <span className="text-muted-foreground">{t("shipping")}</span>
              <span className="font-medium">
                {formatPrice(shipping * currency, symbol)}
              </span>
            </p>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="text-base font-semibold capitalize text-foreground">
              {t("total")}
            </span>
            <span className="text-2xl font-bold text-primary">
              {formatPrice(total * currency, symbol)}
            </span>
          </div>

          <Link
            href="/checkout"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-13 w-full gap-2 rounded-2xl text-base uppercase shadow-lg shadow-primary/20"
            )}
          >
            {t("continue-to-checkout")}
            <ArrowRight className="size-4 rtl:rotate-180" />
          </Link>

          <div className="flex items-center gap-3 rounded-2xl border border-primary/10 bg-primary/5 p-3 text-sm text-muted-foreground">
            <Truck className="size-5 shrink-0 text-primary" />
            <span>{t("cart.secure-checkout-hint")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingInfo;
