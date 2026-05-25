import { Category } from '@/types/categories';
import { FC } from 'react';
import MobileSubSubCategory from './mobile-sub-sub-category';

type PropsType = {
  subCategory: Category | undefined;
  mainCategorySlug: string;
};

const MobileSubCategory: FC<PropsType> = ({
  subCategory,
  mainCategorySlug,
}) => {
  if (!subCategory?.subcategories?.length) return null;

  return (
    <div className="flex flex-col gap-0.5 border-t border-gray-200/60 pt-2">
      {subCategory.subcategories.map((subSubCategory, index) => (
        <MobileSubSubCategory
          isLast={subCategory.subcategories.length - 1 === index}
          key={subSubCategory.id}
          mainCategorySlug={mainCategorySlug}
          subCategory={subSubCategory}
        />
      ))}
    </div>
  );
};

export default MobileSubCategory;
