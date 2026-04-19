"use client";

import { Cart } from "@/types/cart";
import useUpdateCart from "../hooks/use-update-cart";
import CartProductCard from "./cart-product-card";
import { Fragment } from "react";
import Loader from "@/components/ui/loader";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/navigation";
import { Undo2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

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
  if (isPending) return <Loader size="lg" />;
  if (isError)
    return (
      <p className="w-full text-center text-primary text-lg">
        {t("failed-to-fetch-cart")}
      </p>
    );
  return (
    <Fragment>
      {isFetching ? (
        <div className="w-full absolute max-md:top-6 top-0 start-0 flex justify-center items-center">
          <Loader size="sm" />
        </div>
      ) : null}
      {data.products.length === 0 ? (
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
          <h1 className="text-primary text-2xl sm:text-3xl font-semibold">
            {t("your-cart")}
          </h1>
          <div className="space-y-4">
            {data.products.map((product, index) => (
              <CartProductCard
                key={`${product.id}-${product.variant_id}-${index}`}
                userToken={userToken}
                product={product}
              />
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CartProductsList;
