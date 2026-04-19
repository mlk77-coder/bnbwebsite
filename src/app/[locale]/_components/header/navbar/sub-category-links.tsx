import { SheetClose } from "@/components/ui/sheet";
import { Link } from "@/navigation";
import { SubCategory } from "@/types/categories";
import { useTranslations } from "next-intl";
import { FC } from "react";

type PropsType = {
  subCategory: SubCategory | undefined;
  name: string;
};
const SubCategoryLinks: FC<PropsType> = ({ subCategory, name }) => {
  const t = useTranslations();
  if (!subCategory) return null;
  return (
    <div className="py-4 font-bold text-lg !px-5 sm:!px-8 flex-col flex flex-wrap justify-start items-start gap-4">
      <SheetClose asChild>
        <Link className="font-medium" href={`/category/${subCategory.slug || ""}`}>
          {t("all-category", { category: name })}
        </Link>
      </SheetClose>
      <SheetClose asChild>
        <Link className="text-orange font-medium" href={`/new-arrivals/${subCategory.slug}`}>
          {t("new-arrivals")}
        </Link>
      </SheetClose>
    </div>
  );
};

export default SubCategoryLinks;
