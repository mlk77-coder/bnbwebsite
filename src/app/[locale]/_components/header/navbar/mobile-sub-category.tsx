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
  if (!subCategory) return null;

  return (
    <div className='flex flex-col flex-wrap items-start justify-start gap-4 px-5! py-4 sm:px-8!'>
      {subCategory.subcategories?.map((subSubCategory, index) => (
        <MobileSubSubCategory
          isLast={subCategory.subcategories.length - 1 === index}
          key={subSubCategory.id}
          mainCategorySlug={mainCategorySlug}
          subCategory={subSubCategory}
        />
      )) || null}
    </div>
  );
};

export default MobileSubCategory;
