"use client";

import useCartCountStore from "@/store/use-cart-count-store";
import { cn } from "@/lib/utils";
import { FC, useEffect, useState } from "react";

type PropsType = {
  initialCount: number;
};

const CartCountBadge: FC<PropsType> = ({ initialCount }) => {
  const productsCount = useCartCountStore((state) => state.productsCount);
  const setProductsCount = useCartCountStore((state) => state.setProductsCount);
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevCount, setPrevCount] = useState(initialCount);

  useEffect(() => {
    setProductsCount(initialCount);
  }, [initialCount, setProductsCount]);

  // Animation when count changes
  useEffect(() => {
    if (productsCount !== prevCount && productsCount > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      setPrevCount(productsCount);
      return () => clearTimeout(timer);
    }
  }, [productsCount, prevCount]);

  if (productsCount === 0) return null;

  return (
    <span
      key={productsCount}
      className={cn(
        "absolute -top-1 -right-1 min-w-[1.25rem] h-5 px-1",
        "flex items-center justify-center",
        "bg-primary text-white text-[10px] font-bold rounded-full",
        "border-2 border-white shadow-sm",
        "transition-all duration-300",
        isAnimating && "scale-125"
      )}
    >
      {productsCount > 99 ? "99+" : productsCount}
    </span>
  );
};

export default CartCountBadge;
