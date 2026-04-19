"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FetcherResponse } from "@/lib/fetcher";
import { GetCartResponse } from "@/types/cart";
import { ShoppingBag, ShoppingCart } from "lucide-react";
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
  if (!cartResponse.ok) {
    return null;
  }

  const cart = cartResponse.data.cart;
  const itemCount = cart.products.reduce((a, b) => a + b.quantity, 0);
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
              key={cart.id}
              initialCount={itemCount}
            />
          </Button>
        </PopoverTrigger>
      </Tooltip>
      <PopoverContent
        alignOffset={8}
        align="end"
        className="w-80 sm:w-96 max-h-[calc(100vh-10rem)] p-0 overflow-hidden rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-100"
      >
        {/* Cart Header */}
        <div className="px-4 py-3 bg-gradient-to-r from-primary/5 to-transparent border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{t("cart.title")}</h3>
              <p className="text-xs text-gray-500">
                {itemCount} {t("items")}
              </p>
            </div>
          </div>
        </div>

        {/* Cart Content */}
        <div className="overflow-y-auto custom-scrollbar max-h-[calc(100vh-16rem)]">
          {cartResponse.ok ? (
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
