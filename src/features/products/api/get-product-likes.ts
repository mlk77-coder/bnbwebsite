import { fetcher } from '@/lib/fetcher';
import { normalizeProductLikes } from '@/lib/api-mappers';
import {
  GetProductLikesResponse,
  ProductLikesData,
} from '@/types/product-social';
import { cache } from 'react';

export const getProductLikes = async (
  productId: number,
  locale: string,
  token: string = '',
  request?: Request
) => {
  const headers: HeadersInit = token
    ? { authorization: `Bearer ${token}` }
    : {};

  const response = await fetcher<GetProductLikesResponse>(
    `products/${productId}/likes`,
    locale,
    { headers, cache: 'no-cache' },
    false,
    request
  );

  if (!response.ok) return response;

  const likes = normalizeProductLikes(response.data.data);
  return {
    ...response,
    data: likes satisfies ProductLikesData,
  };
};

export const cachedGetProductLikes = cache(getProductLikes);
