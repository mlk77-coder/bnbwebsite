import CustomBreadcrumb from '@/components/custom-breadcrumb';
import { ApiProductCategory } from '@/types/products';
import { FC } from 'react';

type PropsType = {
  category: ApiProductCategory | null;
};
const ProductBreadcrumb: FC<PropsType> = ({ category }) => {
  const categoryNamesArray = category
    ? [{ name: category.name, slug: `/category/${category.id}` }]
    : [];

  return (
    <CustomBreadcrumb
      hasActiveLink={false}
      activeLink=''
      links={categoryNamesArray}
    />
  );
};

export default ProductBreadcrumb;
