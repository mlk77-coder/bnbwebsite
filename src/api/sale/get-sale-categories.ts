import { fetcher } from '@/lib/fetcher';
import { GetCategoriesResponse } from '@/types/categories';

const getSaleCategories = async (locale: string = 'en', request: any) => {
  const response = await fetcher<GetCategoriesResponse>(
    `discounted-categories`,
    locale,
    {
      cache: 'reload',
    },
    false,
    request
  );
  if (!response.ok) return [];
  return response.data.data.data;
};

export default getSaleCategories;
