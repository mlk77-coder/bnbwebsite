"use client";

import { Cart } from "@/types/cart";
import useUpdateCart from "../hooks/use-update-cart";
import CartProductCard from "./cart-product-card";
import { Fragment } from "react";
import Loader from "@/components/ui/loader";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/navigation";
import { ShoppingBag, Undo2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import ClearCartButton from "./clear-cart-button";

const CartProductsList = ({
  cart,
  userToken,
  isLoggedIn,
}: {
  cart: Cart;
  userToken: string;
  isLoggedIn: boolean;
}) => {
  const { isPending, data, isError, isFetching } = useUpdateCart(
    cart,
    userToken,
    isLoggedIn
  );
  const t = useTranslations();
  if (isPending)
    return (
      <div className="flex min-h-80 w-full flex-col items-center justify-center gap-4 rounded-3xl border border-primary/10 bg-primary/5">
        <span className="flex size-16 items-center justify-center rounded-full bg-white shadow-lg shadow-primary/10">
          <Loader size="lg" className="text-primary" />
        </span>
        <div className="text-center">
          <p className="text-lg font-semibold text-primary">
            {t("cart.loading")}
          </p>
          <p className="text-sm text-muted-foreground">
            {t("cart.loading-description")}
          </p>
        </div>
      </div>
    );
  if (isError)
    return (
      <p className="w-full text-center text-primary text-lg">
        {t("failed-to-fetch-cart")}
      </p>
    );
  return (
    <Fragment>
      {isFetching ? (
        <div className="absolute inset-x-0 top-0 z-20 flex justify-center pt-3">
          <div className="flex items-center gap-2 rounded-full border border-primary/10 bg-white/90 px-4 py-2 text-sm font-medium text-primary shadow-lg shadow-primary/10 backdrop-blur">
            <Loader size="xs" className="text-primary" />
            {t("cart.updating")}
          </div>
        </div>
      ) : null}
      {data.items.length === 0 ? (
        <div className="w-full flex flex-col capitalize items-center text-xl rounded p-4 gap-20">
          <Image
            src="/empty-cart.svg"
            alt="empty cart"
            width={600}
            height={400}
          />
          <p className="text-2xl font-semibold text-primary">
            {t("cart.your-cart-is-empty")}
          </p>
          <Link
            href="/"
            className={cn(
              " flex gap-1.5 text-primary items-center relative before:content-[''] before:absolute before:-bottom-0.5 before:w-full before:h-px before:bg-primary hover:before:hidden"
            )}
          >
            <Undo2Icon size={16} />
            {t("go-home")}
          </Link>
        </div>
      ) : (
        <Fragment>
          <div className="flex flex-col gap-4 rounded-3xl border border-primary/10 bg-white p-5 shadow-sm shadow-primary/5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ShoppingBag className="size-5" />
              </span>
              <div>
                <h1 className="text-2xl font-bold text-primary sm:text-3xl">
                  {t("your-cart")}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {t("cart.products-count", {
                    count: data.items.reduce(
                      (sum, item) => sum + item.quantity,
                      0
                    ),
                  })}
                </p>
              </div>
            </div>
            <ClearCartButton />
          </div>
          <div className="space-y-4">
            {data.items.map((item) => (
              <CartProductCard
                key={`${item.id}-${item.product.id}`}
                item={item}
              />
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CartProductsList;
