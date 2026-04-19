"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PriceRange, ProductAttribute } from "@/types/products";
import { SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC } from "react";
import ProductsFilterAccordion from "./products-filter-accordion";

type PropsType = {
  priceRange: PriceRange;
  attributes: ProductAttribute[];
};

const ProductsFiltersSheet: FC<PropsType> = ({ attributes, priceRange }) => {
  const t = useTranslations();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="bg-secondary">
          <SlidersHorizontal className="size-4" />
          <span className="sr-only">{t("filters.title")}</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="max-sm:w-10/12 sm:max-w-screen-sm overflow-y-auto space-y-4">
        <SheetHeader>
          <SheetTitle className="text-start capitalize text-xl font-medium">
            {t("filters.title")}
          </SheetTitle>
          <SheetDescription className="sr-only">
            choose a filter and wait
          </SheetDescription>
        </SheetHeader>
        <Separator />
        <ProductsFilterAccordion
          attributes={attributes}
          priceRange={priceRange}
        />
        <SheetFooter>
          <SheetClose asChild>
            <Button
              variant="outline"
              onClick={() => {
                window.location.replace(window.location.pathname);
              }}
            >
              {t("filters.clear-all")}
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button>{t("filters.apply")}</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ProductsFiltersSheet;
