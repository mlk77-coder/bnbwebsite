import ClientLink from "@/components/client-link";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { SubCategory } from "@/types/categories";
import { Minus, Plus } from "lucide-react";
import { FC, useState } from "react";

type PropsType = {
  subCategory: SubCategory;
  mainCategorySlug: string;
  isLast: boolean;
};
const MobileSubCategory: FC<PropsType> = ({
  subCategory,
  mainCategorySlug,
  isLast,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible
      className="w-full"
      open={isOpen}
      onOpenChange={setIsOpen}
      key={subCategory.id}
    >
      <div
        className={cn(
          "w-full flex justify-between items-center",
          isOpen ? "" : "border-b pb-4",
          isLast ? "border-0 pb-0" : ""
        )}
      >
        <SheetClose asChild>
          <ClientLink
            activeClassName="text-orange"
            slug={subCategory.slug}
            className={cn(
              "inline-block w-full py-4 flex-1",
              isOpen ? "pb-2" : ""
            )}
            href={`/category/${mainCategorySlug}/${subCategory.slug}`}
          >
            {subCategory.name}
          </ClientLink>
        </SheetClose>
        {subCategory.sub_categories.length > 0 ? (
          <CollapsibleTrigger asChild>
            <Button className="size-6" variant="outline" size="icon">
              <span className="sr-only">Show related categories</span>
              {isOpen ? (
                <Minus className="size-5" />
              ) : (
                <Plus className="size-5" />
              )}
            </Button>
          </CollapsibleTrigger>
        ) : null}
      </div>
      <CollapsibleContent>
        <div className="pb-4">
          <div className="flex flex-col gap-2 justify-start items-start ps-3 border-s">
            {subCategory.sub_categories?.map((subSubCategory) => (
              <SheetClose asChild key={subSubCategory.id}>
                <ClientLink
                  activeClassName="text-orange"
                  slug={subSubCategory.slug}
                  className="hover:text-orange"
                  href={`/category/${mainCategorySlug}/${subCategory.slug}/${subSubCategory.slug}`}
                >
                  {subSubCategory.name}
                </ClientLink>
              </SheetClose>
            ))}
          </div>
        </div>
        <Separator />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default MobileSubCategory;
