'use server';

import { FEATURED_PRODUCTS_PER_PAGE } from '@/features/home/constants';
import { getProducts } from '@/features/products';
import type { Pagination } from '@/types';
import type { ProductCard } from '@/types/products';
import { headers } from 'next/headers';

export type LoadMoreFeaturedProductsResult =
  | { ok: true; products: ProductCard[]; pagination: Pagination }
  | { ok: false; message: string };

export async function loadMoreFeaturedProductsAction(
  locale: string,
  page: number,
  perPage: number = FEATURED_PRODUCTS_PER_PAGE
): Promise<LoadMoreFeaturedProductsResult> {
  if (page < 1 || !Number.isFinite(page)) {
    return { ok: false, message: 'Invalid page' };
  }

  const headersList = await headers();
  const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
    headers: headersList,
  });

  const response = await getProducts(
    { per_page: String(perPage), page: String(page) },
    locale,
    request
  );

  if (!response.ok) {
    const msg =
      typeof response.error === 'string'
        ? response.error
        : response.error?.message ?? 'Failed to load products';
    return { ok: false, message: msg };
  }

  return {
    ok: true,
    products: response.data.products,
    pagination: response.data.pagination,
  };
}
