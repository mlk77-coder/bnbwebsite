import { fetcher } from '@/lib/fetcher';
import { ApiCategory } from '@/types/categories';

export const getCategory = async (
  subSubCategory: string,
  locale: string,
  request?: Request
) => {
  const response = await fetcher<{ success: boolean; data: ApiCategory }>(
    `categories/${subSubCategory}`,
    locale,
    undefined,
    false,
    request
  );

  if (!response.ok) return response;

  return {
    ...response,
    data: response.data.data,
  };
};
