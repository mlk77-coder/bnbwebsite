"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FetcherResponse } from "@/lib/fetcher";
import { GetCartResponse } from "@/types/cart";
import { ShoppingBag, ShoppingCart, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC } from "react";
import CartCountBadge from "./cart-count-badge";
import CartPopoverContent from "./cart-popover-content";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type PropsType = {
  cartResponse: FetcherResponse<GetCartResponse>;
  userToken: string;
  isLoggedIn: boolean;
  insideSheet?: boolean;
};

const CartPopover: FC<PropsType> = ({
  cartResponse,
  userToken,
  isLoggedIn,
  insideSheet = false,
}) => {
  const t = useTranslations();
  const cart = cartResponse.data?.data;
  const items = cart?.items ?? [];
  const itemCount = items.reduce((a, b) => a + b.quantity, 0);
  const hasItems = itemCount > 0;

  return (
    <Popover>
      <Tooltip text={t("cart.title")}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "relative group hover:bg-gray-100/80 transition-all duration-300",
              hasItems && "hover:bg-primary/5"
            )}
          >
            <span className="sr-only">{t("cart.title")}</span>
            <div className="relative">
              <ShoppingBag 
                className={cn(
                  "w-5 h-5 transition-all duration-300",
                  hasItems 
                    ? "text-primary" 
                    : "text-gray-700 group-hover:text-gray-900"
                )} 
              />
              {/* Animated ring on hover */}
              <span className="absolute inset-0 rounded-full bg-primary/10 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500" />
            </div>
            <CartCountBadge
              key={itemCount}
              initialCount={itemCount}
            />
          </Button>
        </PopoverTrigger>
      </Tooltip>
      <PopoverContent
        alignOffset={8}
        align="end"
        className="w-88 sm:w-108 max-h-[calc(100vh-7rem)] p-0 overflow-hidden rounded-3xl shadow-2xl shadow-primary/15 border border-primary/10 bg-white"
      >
        <div className="relative overflow-hidden border-b border-primary/10 bg-linear-to-br from-primary/10 via-primary/5 to-transparent px-5 py-4">
          <div className="absolute -inset-e-8 -top-8 size-24 rounded-full bg-primary/10 blur-2xl" />
          <div className="relative flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                <ShoppingCart className="size-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-950">{t("cart.title")}</h3>
                <p className="text-xs text-muted-foreground">
                  {t("cart.products-count", { count: itemCount })}
                </p>
              </div>
            </div>
            {hasItems ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold text-primary shadow-sm">
                <Sparkles className="size-3" />
                BNB
              </span>
            ) : null}
          </div>
        </div>

        <div className="custom-scrollbar max-h-[calc(100vh-13rem)] overflow-y-auto">
          {cart ? (
            <CartPopoverContent
              cart={cart}
              userToken={userToken}
              isLoggedIn={isLoggedIn}
              insideSheet={insideSheet}
            />
          ) : (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShoppingCart className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">{t("cart-empty")}</p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CartPopover;
