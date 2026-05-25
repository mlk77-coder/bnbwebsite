import { fetcher } from '@/lib/fetcher';
import { mapApiProductComments } from '@/lib/api-mappers';
import {
  GetProductCommentsResponse,
  ProductCommentsData,
} from '@/types/product-social';
import { cache } from 'react';

export const getProductComments = async (
  productId: number,
  locale: string,
  token: string = '',
  request?: Request
) => {
  const headers: HeadersInit = token
    ? { authorization: `Bearer ${token}` }
    : {};

  const response = await fetcher<GetProductCommentsResponse>(
    `products/${productId}/comments`,
    locale,
    { headers, cache: 'no-cache' },
    false,
    request
  );

  if (!response.ok) return response;

  const { data: comments, comments_count } = response.data;

  const result: ProductCommentsData = {
    comments: mapApiProductComments(comments ?? []),
    comments_count: comments_count ?? comments?.length ?? 0,
  };

  return {
    ...response,
    data: result,
  };
};

export const cachedGetProductComments = cache(getProductComments);
