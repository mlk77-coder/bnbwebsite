import { fetcher } from "@/lib/fetcher";
import { CategoryDetail } from "@/types/categories";

export const getCategory = async (
  subSubCategory: string,
  locale: string,
  request?: any
) => {
  const response = await fetcher<CategoryDetail>(
    `categories/${subSubCategory}`,
    locale,
    undefined,
    false,
    request
  );
  return response;
};
