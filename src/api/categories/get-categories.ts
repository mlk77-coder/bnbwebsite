import { dummyCategoryTree } from '@/lib/dummy-catalog-data';
import { fetcher } from '@/lib/fetcher';
import { GetCategoriesResponse } from '@/types/categories';

const getCategories = async (locale: string = 'en', request: any) => {
  const response = await fetcher<GetCategoriesResponse>(
    `categories`,
    locale,
    {
      cache: "reload",
    },
    false,
    request
  );
  if (!response.ok) return dummyCategoryTree;
  return response.data.categories;
};

export default getCategories;
