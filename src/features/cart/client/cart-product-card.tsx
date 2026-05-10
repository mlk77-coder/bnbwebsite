"use client";

import { CartItem } from "@/types/cart";
import Image from "next/image";
import { FC } from "react";
import ProductCartQuantity from "@/features/cart/client/product-cart-quantity";
import RemoveProductFromCart from "@/features/cart/client/remove-product-from-cart";
import { useTranslations } from "next-intl";
import { formatPrice } from "@/lib/utils";
import useCurrencyStore from "@/store/use-currency-store";
import { Link } from "@/navigation";
import { CheckCircle2, PackageX, Sparkles } from "lucide-react";

type PropsType = {
  item: CartItem;
};

const CartProductCard: FC<PropsType> = ({ item }) => {
  const t = useTranslations();
  const currency = useCurrencyStore((state) => state.currency);
  const symbol = useCurrencyStore((state) => state.symbol);
  const product = item.product;
  const price = product.sale_price ?? product.price;
  const hasSale =
    product.sale_price !== null && product.sale_price < product.price;

  return (
    <div className="group relative w-full overflow-hidden rounded-3xl border border-primary/10 bg-white p-4 shadow-sm shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/10 sm:p-5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <RemoveProductFromCart item={item} />

      <div className="relative grid w-full grid-cols-[auto_1fr] gap-4 sm:gap-5">
        <Link
          href={`/products/${product.id}`}
          className="relative block overflow-hidden rounded-2xl bg-secondary"
        >
          <Image
            className="size-28 shrink-0 object-cover transition-transform duration-500 group-hover:scale-105 sm:size-32"
            src={product.image ?? "/no-product.svg"}
            width={300}
            height={300}
            alt={product.name}
          />
          {hasSale ? (
            <span className="absolute inset-s-2 top-2 inline-flex items-center gap-1 rounded-full bg-primary px-2 py-1 text-[10px] font-semibold text-primary-foreground shadow">
              <Sparkles className="size-3" />
              Sale
            </span>
          ) : null}
        </Link>

        <div className="flex min-w-0 flex-col justify-between gap-4 pe-8">
          <div className="space-y-2">
            <Link className="inline-block w-full" href={`/products/${product.id}`}>
              <h2
                title={product.name}
                className="line-clamp-2 text-base font-semibold text-foreground transition-colors hover:text-primary lg:text-lg"
              >
                {product.name}
              </h2>
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              {!product.is_available ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
                  <PackageX className="size-3.5" />
                  {t("out-of-stock")}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                  <CheckCircle2 className="size-3.5" />
                  {product.stock_quantity > 5
                    ? t("in-stock")
                    : t("few-in-stock")}
                </span>
              )}
              <span className="rounded-full bg-secondary/70 px-3 py-1 text-xs text-muted-foreground">
                {t("quantity")}: {item.quantity}
              </span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
            <div className="grid grid-cols-2 gap-3 rounded-2xl bg-secondary/40 p-3">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  {t("price")}
                </span>
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="font-semibold text-foreground">
                    {formatPrice(price * currency, symbol)}
                  </span>
                  {hasSale ? (
                    <span className="text-xs text-muted-foreground line-through">
                      {formatPrice(product.price * currency, symbol)}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  {t("total")}
                </span>
                <p className="font-bold text-primary">
                  {formatPrice(item.subtotal * currency, symbol)}
                </p>
              </div>
            </div>

            <ProductCartQuantity item={item} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
