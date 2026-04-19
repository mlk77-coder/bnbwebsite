"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { ProductCard as ProductCardType } from "@/types/products";
import { cn, formatPrice } from "@/lib/utils";
import { isWithinInterval, subDays } from "date-fns";
import { Link } from "@/navigation";
import { Badge } from "../ui/badge";
import useCurrencyStore from "@/store/use-currency-store";
import SheetCloseLink from "@/app/[locale]/_components/SheetCloseLink";

type ProductInfoProps = {
  product: ProductCardType;
  insideSheet?: boolean;
  selectedColor: string;
};

const ProductInfo: FC<ProductInfoProps> = ({ product, insideSheet }) => {
  const t = useTranslations();
  const currency = useCurrencyStore((state) => state.currency);
  const symbol = useCurrencyStore((state) => state.symbol);
  const Wrapper = insideSheet ? SheetCloseLink : Link;

  const isNewProduct = (dateString: string) => {
    const productDate = new Date(dateString);
    const weekAgo = subDays(new Date(), 7);
    return isWithinInterval(productDate, { start: weekAgo, end: new Date() });
  };

  return (
    <>
      <Wrapper href={`/products/${product.slug}`}>
        <p className="line-clamp-2 text-base">{product.name}</p>
      </Wrapper>
      {product.has_discount && product.quantity !== 0 ? (
        <Badge variant="destructive" className="font-medium uppercase">
          {t("sale")}
        </Badge>
      ) : isNewProduct(product.created_at) ? (
        <Badge variant="secondary" className="capitalize">
          {t("new-in")}
        </Badge>
      ) : null}
      <div className="flex text-sm justify-start items-center gap-2">
        <p
          className={cn(
            "font-bold",
            product.has_discount && product.quantity !== 0 ? "line-through" : ""
          )}
        >
          {formatPrice(+product.price * currency, symbol)}
        </p>
        {product.has_discount &&
        product.price_after_sale &&
        product.quantity !== 0 ? (
          <p className="font-bold text-orange">
            {formatPrice(product.price_after_sale * currency, symbol)}
          </p>
        ) : null}
      </div>
    </>
  );
};

export default ProductInfo;
