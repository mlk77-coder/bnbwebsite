import { SubCategory } from "@/types/categories";

export const getSubCategoryWeight = (subCategory: SubCategory): number => {
  return subCategory.sub_categories.length || 1; // Assign weight of 1 if no sub-subcategories
};

export const distributeSubCategories = (
  subCategories: SubCategory[],
  columnCount: number
) => {
  const columns: SubCategory[][] = Array.from(
    { length: columnCount },
    () => []
  );
  const columnLoad: number[] = Array(columnCount).fill(0);

  const sortedSubCategories = subCategories.sort(
    (a, b) => getSubCategoryWeight(b) - getSubCategoryWeight(a)
  );

  sortedSubCategories.forEach((subCategory) => {
    const lightestColumnIndex = columnLoad.indexOf(Math.min(...columnLoad));
    columns[lightestColumnIndex].push(subCategory);
    columnLoad[lightestColumnIndex] += getSubCategoryWeight(subCategory);
  });

  return columns;
};

