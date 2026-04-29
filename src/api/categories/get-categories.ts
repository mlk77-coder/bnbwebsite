import { fetcher } from '@/lib/fetcher';
import { GetCategoriesResponse } from '@/types/categories';

const getCategories = async (locale: string = 'en', request?: Request) => {
  const response = await fetcher<GetCategoriesResponse>(
    `categories`,
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

export default getCategories;
