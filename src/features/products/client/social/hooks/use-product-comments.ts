'use client';

import { getProductComments } from '@/features/products/api/get-product-comments';
import { normalizeCommentsData } from '@/features/products/lib/normalize-comments-data';
import { ProductCommentsData } from '@/types/product-social';
import { useQuery } from '@tanstack/react-query';

export const useProductComments = (
  productId: number,
  token: string,
  locale: string,
  initialComments: ProductCommentsData['comments'],
  initialCount: number
) => {
  const initialData = normalizeCommentsData(initialComments, initialCount);

  return useQuery({
    queryKey: ['product-comments', productId, token],
    queryFn: async () => {
      const response = await getProductComments(productId, locale, token);
      if (response.ok) return response.data;
      return initialData;
    },
    initialData,
    staleTime: 30_000,
  });
};
