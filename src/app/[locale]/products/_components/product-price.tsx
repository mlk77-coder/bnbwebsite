"use client";

import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import useProductDetailsStore from "@/store/use-product-details-store";
import { ProductDetails, Product } from "@/types/products";
import { FC, useEffect, useState } from "react";
import { isWithinInterval, subDays } from "date-fns";
import { useTranslations } from "next-intl";
import useCurrencyStore from "@/store/use-currency-store";

type PropsType = {
  defaultProduct: ProductDetails;
};

const ProductPrice: FC<PropsType> = ({ defaultProduct }) => {
  const t = useTranslations();
  const currency = useCurrencyStore((state) => state.currency);
  const symbol = useCurrencyStore((state) => state.symbol);
  const product = useProductDetailsStore(
    (state) => state.productVariant
  ) as ProductDetails | null;
  const [currentProduct, setCurrentProduct] =
    useState<ProductDetails>(defaultProduct);

  useEffect(() => {
    if (product && "price" in product) {
      setCurrentProduct(product);
    } else {
      setCurrentProduct(defaultProduct);
    }
  }, [product, defaultProduct]);

  const isNewProduct = (dateString: string) => {
    const productDate = new Date(dateString);
    const weekAgo = subDays(new Date(), 7);
    return isWithinInterval(productDate, { start: weekAgo, end: new Date() });
  };

  const renderPrice = (price: number, priceAfterSale?: number) => (
    <div className="flex justify-start items-center gap-2">
      {priceAfterSale ? (
        <>
          <p className="text-3xl font-bold text-primary line-through">
            {formatPrice(price * currency, symbol)}
          </p>
          <p className="text-3xl font-bold text-orange">
            {formatPrice(priceAfterSale * currency, symbol)}
          </p>
        </>
      ) : (
        <p className="text-3xl font-bold text-primary">
          {formatPrice(price * currency, symbol)}
        </p>
      )}
    </div>
  );

  if (!currentProduct) {
    return null;
  }

  return (
    <div className="flex justify-start items-center gap-3">
      {renderPrice(
        +currentProduct.price,
        currentProduct.has_discount
          ? +currentProduct.price_after_sale!
          : undefined
      )}

      {currentProduct.has_discount ? (
        <Badge variant="destructive" className="capitalize">
          {t("sale")}
        </Badge>
      ) : isNewProduct(currentProduct.created_at) ? (
        <Badge variant="secondary" className="capitalize">
          {t("new-in")}
        </Badge>
      ) : null}
    </div>
  );
};

export default ProductPrice;
