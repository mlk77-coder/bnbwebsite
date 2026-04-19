"use client";

import SheetCloseLink from "@/app/[locale]/_components/SheetCloseLink";
import { Link } from "@/navigation";
import { ProductCard as ProductCardType } from "@/types/products";
import { useLocale, useTranslations } from "next-intl";
import { FC, useMemo, useState } from "react";
import { getLangDir } from "rtl-detect";
import { Card, CardFooter } from "../ui/card";
import ColorSelector from "./color-selector";
import ProductImage from "./product-image";
import ProductInfo from "./product-info";

type PropsType = {
  product: ProductCardType;
  insideSheet?: boolean;
};

const ProductCard: FC<PropsType> = ({ product, insideSheet }) => {
  const locale = useLocale();
  const t = useTranslations();
  const dir = getLangDir(locale);
  const colorsImages = useMemo(() => {
    return product.product_color_attributes.filter(
      (color) => color.color && color.color_image && color.image
    );
  }, [product.product_color_attributes]);

  const [selectedColor, setSelectedColor] = useState("");
  const Wrapper = insideSheet ? SheetCloseLink : Link;

  return (
    <Card
      dir={dir}
      key={product.id}
      className="p-0 group relative rounded-none border-0 shadow-none"
    >
      <div className="relative">
        <Wrapper href={`/products/${product.slug}`}>
          {product.quantity === 0 ? (
            <div className="z-10 text-orange font-black uppercase ltr:tracking-widest flex bg-white/80 justify-center items-center absolute left-0 top-0 w-full h-full">
              {t("out-of-stock")}
            </div>
          ) : null}
          <ProductImage
            product={product}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </Wrapper>
      </div>
      <CardFooter className="px-0 pt-2 pb-0 clear-start flex-col justify-start items-start gap-1">
        <ColorSelector
          colorsImages={colorsImages}
          setSelectedColor={setSelectedColor}
        />
        <ProductInfo
          product={product}
          insideSheet={insideSheet}
          selectedColor={selectedColor}
        />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
