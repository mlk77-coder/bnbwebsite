"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";
import { Link } from "@/navigation";
import { Cart } from "@/types/cart";
import { PopoverClose } from "@radix-ui/react-popover";
import Image from "next/image";
import { ArrowRight, PackageOpen, ShoppingBag, X } from "lucide-react";
import { Fragment } from "react";
import useUpdateCart from "../../../cart/hooks/use-update-cart";
import { useTranslations } from "next-intl";
import useCurrencyStore from "@/store/use-currency-store";
import Loader from "@/components/ui/loader";
import { SheetClose } from "@/components/ui/sheet";
import { Slot } from "@radix-ui/react-slot";

const CartPopoverContent = ({
  cart,
  userToken,
  isLoggedIn,
  insideSheet = false,
}: {
  cart: Cart;
  userToken: string;
  isLoggedIn: boolean;
  insideSheet?: boolean;
}) => {
  const t = useTranslations();
  const currency = useCurrencyStore((state) => state.currency);
  const symbol = useCurrencyStore((state) => state.symbol);
  const { isPending, data, isError, isFetching } = useUpdateCart(
    cart,
    userToken,
    isLoggedIn
  );

  const Components = insideSheet ? SheetClose : Slot;
  if (isPending)
    return (
      <div className="flex min-h-72 flex-col items-center justify-center gap-4 p-8">
        <span className="flex size-16 items-center justify-center rounded-full bg-primary/10">
          <Loader className="text-primary" variant="spinner" size="lg" />
        </span>
        <div className="text-center">
          <p className="font-semibold text-primary">{t("cart.loading")}</p>
          <p className="text-xs text-muted-foreground">
            {t("cart.loading-description")}
          </p>
        </div>
      </div>
    );
  if (isError)
    return (
      <p className="w-full p-8 text-center text-lg text-primary">
        Failed to fetch cart
      </p>
    );
  if (data.items.length === 0)
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-3 p-8 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <PackageOpen className="size-8" />
        </span>
        <p className="text-lg font-semibold capitalize text-primary">
          {t("cart.your-cart-is-empty")}
        </p>
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "rounded-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
          )}
        >
          {t("go-home")}
        </Link>
      </div>
    );
  return (
    <Fragment>
      <div className="relative">
        {isFetching ? (
          <div className="absolute inset-x-0 top-2 z-20 flex justify-center">
            <div className="flex items-center gap-2 rounded-full border border-primary/10 bg-white/90 px-3 py-1.5 text-xs font-medium text-primary shadow-lg shadow-primary/10 backdrop-blur">
              <Loader size="xs" className="text-primary" />
              {t("cart.updating")}
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex w-full items-center justify-between px-5 py-3">
        <p className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
          <ShoppingBag className="size-4 text-primary" />
          {t("item-s-in-your-cart")}
        </p>
        <PopoverClose asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-full text-muted-foreground hover:bg-red-50 hover:text-red-500"
          >
            <span className="sr-only">close</span>
            <X className="size-4" />
          </Button>
        </PopoverClose>
      </div>

      <div className="space-y-3 px-4 pb-4">
        {data.items.map((item, index) => (
          <Link
            key={`${item.id}-${item.product.id}-${index}`}
            href={`/products/${item.product.id}`}
            className="group grid grid-cols-[auto_1fr] gap-3 rounded-2xl border border-primary/10 bg-secondary/30 p-2.5 transition-all hover:border-primary/25 hover:bg-primary/5"
          >
            <div className="relative overflow-hidden rounded-xl bg-white">
              <Image
                src={item.product.image ?? "/no-product.svg"}
                alt={item.product.name}
                width={160}
                height={160}
                className="size-20 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="min-w-0 space-y-2">
              <div className="flex items-start justify-between gap-3">
                <h4
                  title={item.product.name}
                  className="line-clamp-2 text-sm font-semibold leading-snug text-foreground group-hover:text-primary"
                >
                  {item.product.name}
                </h4>
                <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-primary shadow-sm">
                  x{item.quantity}
                </span>
              </div>
              <div className="flex items-end justify-between gap-2">
                <p className="text-xs text-muted-foreground">
                  {formatPrice(
                    (item.product.sale_price ?? item.product.price) * currency,
                    symbol
                  )}
                </p>
                <p className="text-sm font-bold text-foreground">
                  {formatPrice(item.subtotal * currency, symbol)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="border-t border-primary/10 bg-white p-4">
        <div className="mb-3 space-y-2 rounded-2xl bg-secondary/40 p-3">
          <p className="flex w-full items-center justify-between text-sm">
            <span className="text-muted-foreground">{t("subtotal")}</span>
            <span className="font-semibold">
              {formatPrice(data.summary.subtotal * currency, symbol)}
            </span>
          </p>
          <p className="flex w-full items-center justify-between text-sm">
            <span className="text-muted-foreground">{t("total")}</span>
            <span className="text-lg font-bold text-primary">
              {formatPrice(data.summary.total * currency, symbol)}
            </span>
          </p>
        </div>

        <Link
          href="/cart"
          className={cn(
            buttonVariants({ size: "lg" }),
            "w-full rounded-2xl text-base uppercase ltr:tracking-wider p-0 shadow-lg shadow-primary/20"
          )}
        >
          <Components asChild>
            <PopoverClose asChild>
              <span className="inline-flex size-full items-center justify-center gap-2">
                {t("view-cart")}
                <ArrowRight className="size-4 rtl:rotate-180" />
              </span>
            </PopoverClose>
          </Components>
        </Link>
      </div>
    </Fragment>
  );
};

export default CartPopoverContent;
