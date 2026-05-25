import { fetcher } from '@/lib/fetcher';
import { mapApiProductDetails } from '@/lib/api-mappers';
import { ApiProduct } from '@/types/products';
import { cache } from 'react';

export const getProductDetails = async (
  slug: string,
  locale: string = 'en',
  isLoggedIn: boolean = false,
  token: string = '',
  request?: Request
) => {
  const url = `products/${slug}`;
  const fullUrl = isLoggedIn ? url : `${url}?s_id=${token}`;
  const auth = (
    isLoggedIn ? { headers: { authorization: `Bearer ${token}` } } : {}
  ) as RequestInit;
  const response = await fetcher<{ success: boolean; data: ApiProduct }>(
    fullUrl,
    locale,
    auth,
    false,
    request
  );

  if (!response.ok) return response;

  return {
    ...response,
    data: mapApiProductDetails(response.data.data),
  };
};

export const cachedProductDetails = cache(
  async (slug: string, locale: string = 'en', request: Request) => {
    const data = await getProductDetails(slug, locale, false, '', request);
    return data;
  }
);
