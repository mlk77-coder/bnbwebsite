"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Link } from "@/navigation";
import { ArrowDownWideNarrow } from "lucide-react";
import RemovePriceSortButton from "./remove-price-sort-button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

const ProductSortDropdown = () => {
  const t = useTranslations("filters.sort");
  const searchParams = useSearchParams();

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  };

  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>
        <Button variant="ghost" size="icon" className="bg-secondary">
          <ArrowDownWideNarrow className="size-4" />

          <span className="sr-only">{t("sort-by")}</span>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent
        className="w-56 p-0"
        align="end"
        sideOffset={0}
      >
        <RemovePriceSortButton />
        <Link
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "w-full justify-start rounded-none"
          )}
          href={`?${createQueryString("sort[price]", "asc")}`}
        >
          {t("asc")}
        </Link>
        <Link
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "w-full justify-start rounded-none"
          )}
          href={`?${createQueryString("sort[price]", "desc")}`}
        >
          {t("desc")}
        </Link>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ProductSortDropdown;
