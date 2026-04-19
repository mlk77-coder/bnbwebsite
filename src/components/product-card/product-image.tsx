"use client";

import { FC } from "react";
import Image from "next/image";
import { ProductCard as ProductCardType } from "@/types/products";
import { CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

type ProductImageProps = {
  product: ProductCardType;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
};

const ProductImage: FC<ProductImageProps> = ({ product, selectedColor }) => {
  return (
    <CardContent className="p-0 group/image aspect-square relative">
      <Image
        src={selectedColor ? selectedColor : product.image}
        alt={`${product.name} product image`}
        width={1000}
        height={1000}
        className={cn(
          "size-full object-cover transition-opacity duration-300",
          product.alternative_image
            ? "group-hover/image:opacity-0"
            : "opacity-100"
        )}
      />
      {product.alternative_image ? (
        <Image
          src={product.alternative_image ?? ""}
          alt={`${product.name} alternative product image`}
          width={1000}
          height={1000}
          className="size-full object-cover opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 absolute top-0 left-0"
        />
      ) : null}
    </CardContent>
  );
};

export default ProductImage;
