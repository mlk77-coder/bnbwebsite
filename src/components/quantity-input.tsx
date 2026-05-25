"use client";

import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { Button } from "./ui/button";

type PropsType = {
  value: number;
  setValue: (quantity: number) => void;
  size?: "default" | "sm";
};

const QuantityInput: FC<PropsType> = ({
  setValue,
  value,
  size = "default",
}) => {
  const t = useTranslations();
  return (
    <div className="flex justify-start items-center gap-2">
      <Button
        onClick={() => setValue(value - 1)}
        disabled={value === 1}
        className={cn(size === "sm" ? "size-7" : "")}
        type="button"
        size="icon"
      >
        <span className="sr-only">{t('decrease')}</span>
        <Minus className={cn(size === "sm" ? "size-4" : "")} />
      </Button>
      <p
        className={cn(
          "size-10 rounded flex border border-foreground justify-center items-center select-none",
          size === "sm" ? "text-sm" : ""
        )}
      >
        {value}
      </p>
      <Button
        onClick={() => {
          if (value < 10) setValue(value + 1);
        }}
        disabled={value === 10}
        className={cn(size === "sm" ? "size-7" : "")}
        size="icon"
        type="button"
      >
        <span className="sr-only">{t('increase')}</span>
        <Plus className={cn(size === "sm" ? "size-4" : "")} />
      </Button>
    </div>
  );
};

export default QuantityInput;
