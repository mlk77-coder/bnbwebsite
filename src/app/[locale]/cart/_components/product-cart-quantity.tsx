"use client";

import useDebounceValue from "@/app/hooks/use-debounce-value";
import { Button } from "@/components/ui/button";
import { CartProduct } from "@/types/cart";
import { Minus, Plus } from "lucide-react";
import { FC, useEffect, useState } from "react";
import useDecreaseProduct from "../hooks/use-decrease-product";
import useIncreaseProduct from "../hooks/use-increase-product";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

type PropsType = {
  product: CartProduct;
  userToken: string;
};
const ProductCartQuantity: FC<PropsType> = ({ product, userToken }) => {
  const [value, setValue] = useState(product.quantity);
  const [debouncedValue] = useDebounceValue(value, 500);
  const t = useTranslations();

  const { handleDecreaseProduct, isPending: isDecreasePending } =
    useDecreaseProduct(product, userToken);
  const { handleIncreaseProduct, isPending: isIncreasePending } =
    useIncreaseProduct(product, userToken);

  useEffect(() => {
    if (debouncedValue !== product.quantity) {
      if (value < product.quantity) {
        handleDecreaseProduct(value);
      }
      if (value > product.quantity) {
        handleIncreaseProduct(value);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);
  useEffect(() => {
    setValue(product.quantity);
  }, [product.quantity]);

  const handleChange = (newValue: number, product_quantity?: number) => {
    if (product_quantity && newValue > product_quantity) {
      toast.warning(t("you-cant-add-more-than-the-available-quantity"));
    } else {
      setValue(newValue);
    }
  };
  return (
    <div className="flex justify-start items-center gap-1">
      <Button
        onClick={() => handleChange(value - 1)}
        disabled={value === 1 || isDecreasePending || isIncreasePending}
        className="size-6 sm:size-8 md:size-10 disabled:opacity-100"
        type="button"
        size="icon"
      >
        <span className="sr-only">Minus</span>
        <Minus className="size-3 sm:size-4" />
      </Button>
      <p className="size-6 sm:size-8 md:size-10 rounded flex border border-foreground justify-center items-center select-none text-xs sm:text-sm">
        {value}
      </p>
      <Button
        disabled={isDecreasePending || isIncreasePending}
        onClick={() => handleChange(value + 1, product.product_quantity)}
        className="size-6 sm:size-8 md:size-10 disabled:opacity-100"
        size="icon"
        type="button"
      >
        <span className="sr-only">Plus</span>
        <Plus className="size-3 sm:size-4" />
      </Button>
    </div>
  );
};

export default ProductCartQuantity;
