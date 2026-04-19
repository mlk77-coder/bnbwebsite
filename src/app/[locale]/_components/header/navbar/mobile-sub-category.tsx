import { Category } from "@/types/categories";
import { FC } from "react";
import MobileSubSubCategory from "./mobile-sub-sub-category";

type PropsType = {
  subCategory: Category | undefined;
  mainCategorySlug: string;
};
const MobileSubCategory: FC<PropsType> = ({
  subCategory,
  mainCategorySlug,
}) => {
  if (!subCategory) return null;

  return (
    <div className="py-4 !px-5 sm:!px-8 flex-col flex flex-wrap justify-start items-start gap-4">
      {subCategory.sub_categories?.map((subSubCategory, index) => (
        <MobileSubSubCategory
          isLast={subCategory.sub_categories.length - 1 === index}
          key={subSubCategory.id}
          mainCategorySlug={mainCategorySlug}
          subCategory={subSubCategory}
        />
      )) || null}
    </div>
  );
};

export default MobileSubCategory;
