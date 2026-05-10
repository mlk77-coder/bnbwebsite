"use client";

import useDebounceValue from "@/app/hooks/use-debounce-value";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { CartItem } from "@/types/cart";
import { Minus, Plus } from "lucide-react";
import { FC, useEffect, useState } from "react";
import useUpdateCartItem from "@/features/cart/client/hooks/use-update-cart-item";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

type PropsType = {
  item: CartItem;
};
const ProductCartQuantity: FC<PropsType> = ({ item }) => {
  const [value, setValue] = useState(item.quantity);
  const [debouncedValue] = useDebounceValue(value, 500);
  const t = useTranslations();

  const { mutate, isPending } = useUpdateCartItem(item);

  useEffect(() => {
    if (debouncedValue !== item.quantity) {
      mutate(debouncedValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);
  useEffect(() => {
    setValue(item.quantity);
  }, [item.quantity]);

  const handleChange = (newValue: number) => {
    if (newValue < 1) return;

    if (
      item.product.stock_quantity &&
      newValue > item.product.stock_quantity
    ) {
      toast.warning(t("you-cant-add-more-than-the-available-quantity"));
    } else {
      setValue(newValue);
    }
  };
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white p-1 shadow-sm">
      <Button
        onClick={() => handleChange(value - 1)}
        disabled={value === 1 || isPending}
        className="size-8 rounded-full bg-primary/10 text-primary shadow-none hover:bg-primary hover:text-primary-foreground disabled:opacity-60"
        type="button"
        size="icon"
        variant="ghost"
      >
        <span className="sr-only">Minus</span>
        <Minus className="size-3.5" />
      </Button>
      <div className="relative flex size-9 select-none items-center justify-center rounded-full bg-secondary/70 text-sm font-semibold text-foreground">
        <span className={isPending ? "opacity-0" : undefined}>{value}</span>
        {isPending ? (
          <Loader
            size="xs"
            variant="spinner"
            className="absolute text-primary"
          />
        ) : null}
      </div>
      <Button
        disabled={isPending}
        onClick={() => handleChange(value + 1)}
        className="size-8 rounded-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-60"
        size="icon"
        type="button"
      >
        <span className="sr-only">Plus</span>
        <Plus className="size-3.5" />
      </Button>
    </div>
  );
};

export default ProductCartQuantity;
