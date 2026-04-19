"use client";

import ProductPreviewCard from "@/components/product-preview-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn, formatPrice } from "@/lib/utils";
import { Link } from "@/navigation";
import { Cart } from "@/types/cart";
import { PopoverClose } from "@radix-ui/react-popover";
import { X } from "lucide-react";
import { Fragment } from "react";
import useUpdateCart from "../../cart/hooks/use-update-cart";
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
      <div className="size-full flex justify-center items-center">
        <Loader className="text-primary" variant="bars" size="lg" />
      </div>
    );
  if (isFetching)
    return (
      <div className="size-full flex justify-center items-center">
        <Loader className="text-primary" variant="bars" size="lg" />
      </div>
    );
  if (isError)
    return (
      <p className="w-full text-center text-primary text-lg">
        Failed to fetch cart
      </p>
    );
  if (data.products.length === 0)
    return (
      <p className="w-full capitalize text-center text-primary text-lg">
        {t("cart.your-cart-is-empty")}
      </p>
    );
  return (
    <Fragment>
      <div className="w-full flex justify-between items-center">
        <p className="text-lg rtl:text-base font-medium">
          {t("item-s-in-your-cart")}
        </p>
        <PopoverClose asChild>
          <Button variant="ghost" size="icon" className="size-5">
            <span className="sr-only">close</span>
            <X />
          </Button>
        </PopoverClose>
      </div>
      <div className="w-full space-y-2">
        {data.products.map((product, index) => (
          <ProductPreviewCard
            key={`${product.id}-${index}`}
            product={product}
          />
        ))}
      </div>
      <Separator />
      <div className="w-full flex justify-start items-start flex-col px-3 gap-2">
        <p className="w-full flex justify-between items-center">
          <span>{t("subtotal")}</span>{" "}
          <span className="font-bold">
            {formatPrice(data.invoice_value * currency, symbol)}
          </span>
        </p>
        <Link
          href="/cart"
          className={cn(
            buttonVariants(),
            "w-full text-base uppercase ltr:tracking-wider p-0"
          )}
        >
          <Components asChild>
            <PopoverClose asChild>
              <span className="inline-flex size-full justify-center items-center">
                {t("view-cart")}
              </span>
            </PopoverClose>
          </Components>
        </Link>
      </div>
    </Fragment>
  );
};

export default CartPopoverContent;
