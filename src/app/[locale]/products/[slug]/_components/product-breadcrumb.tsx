import CustomBreadcrumb from "@/components/custom-breadcrumb";
import { ProductCategory } from "@/types/products";
import { FC } from "react";

function getCategoryNamesArray(category: ProductCategory | null) {
  const categoryNames: { name: string; slug: string }[] = [];

  let currentCategory = category;
  let accumulatedSlug = ""; // This will accumulate the slug paths

  // We traverse the category chain and insert the categories in the reverse order
  const categories: ProductCategory[] = [];
  while (currentCategory) {
    categories.unshift(currentCategory); // Push categories to the front
    currentCategory = currentCategory.category;
  }

  // Now we build the slugs from root to the deepest category
  categories.forEach((cat) => {
    accumulatedSlug += `/${cat.slug}`;
    categoryNames.push({
      name: cat.name,
      slug: `/category${accumulatedSlug}`,
    });
  });

  return categoryNames;
}

type PropsType = {
  category: ProductCategory;
};
const ProductBreadcrumb: FC<PropsType> = ({ category }) => {
  const categoryNamesArray = getCategoryNamesArray(category);
  return (
    <CustomBreadcrumb
      hasActiveLink={false}
      activeLink=""
      links={categoryNamesArray}
    />
  );
};

export default ProductBreadcrumb;
