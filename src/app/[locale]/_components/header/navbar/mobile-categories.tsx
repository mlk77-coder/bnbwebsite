"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Category } from "@/types/categories";
import { FC, Fragment, useState } from "react";
import MobileSubCategory from "./mobile-sub-category";
import SubCategoryLinks from "./sub-category-links";
import { Link, usePathname } from "@/navigation";
import { useTranslations } from "next-intl";
import { SheetClose } from "@/components/ui/sheet";

type PropsType = {
  categories: Category[];
  sales: Category[];
};

const MobileCategories: FC<PropsType> = ({ categories, sales }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(-1);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const pathname = usePathname();
  const t = useTranslations();

  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId
  );

  const handleClick = (id: number, name: string) => {
    if (selectedCategoryId === id) {
      setSelectedCategoryName("");
      setSelectedCategoryId(-1);
    } else {
      setSelectedCategoryId(id);
      setSelectedCategoryName(name);
    }
  };
  return (
    <Fragment>
      <div
        className={cn(
          selectedCategoryId !== -1 ? "pb-3" : "pb-0",
          "!px-5 pt-5 sm:!px-8 flex flex-wrap justify-center items-center"
        )}
      >
        <Button
          onClick={() => handleClick(0, "sale")}
          className={cn(
            "text-base uppercase px-4 mb-5 h-fit py-0 text-foreground",
            pathname.includes("sale") ? "text-orange" : ""
          )}
          variant="link"
        >
          {t("sale")}
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => handleClick(category.id, category.name)}
            className={cn(
              "text-base px-4 mb-5 h-fit py-0 text-foreground",
              pathname.includes(category.slug) && !pathname.includes("sale/") ? "text-orange" : ""
            )}
            variant="link"
          >
            {category.name}
          </Button>
        ))}
      </div>
      {selectedCategoryId === 0 ? (
        <Fragment>
          <Separator />
          <div className="py-4 font-bold uppercase text-lg !px-5 sm:!px-8 flex-col flex flex-wrap justify-start items-start gap-4">
            <SheetClose asChild>
              <Link className="font-medium" href={`/sale`}>
                {t("all-sale")}
              </Link>
            </SheetClose>
          </div>
          {sales.map((sale) => (
            <div
              key={sale.id}
              className="py-4 font-bold uppercase text-lg !px-5 sm:!px-8 flex-col flex flex-wrap justify-start items-start gap-4"
            >
              <SheetClose asChild>
                <Link className="font-medium" href={`/sale/${sale.slug}`}>
                  {sale.name}
                </Link>
              </SheetClose>
            </div>
          ))}
        </Fragment>
      ) : null}
      {selectedCategoryId !== -1 ? (
        <Fragment>
          <Separator />
          <SubCategoryLinks
            name={selectedCategoryName}
            subCategory={selectedCategory}
          />
          <MobileSubCategory
            subCategory={selectedCategory}
            mainCategorySlug={selectedCategory?.slug || ""}
          />
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default MobileCategories;
