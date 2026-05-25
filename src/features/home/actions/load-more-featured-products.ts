'use server';

import { FEATURED_PRODUCTS_PER_PAGE } from '@/features/home/constants';
import { getProducts } from '@/features/products';
import getSession from '@/lib/get-session';
import type { Pagination } from '@/types';
import type { ProductCard } from '@/types/products';
import { headers } from 'next/headers';
import { getTranslations } from 'next-intl/server';

export type LoadMoreFeaturedProductsResult =
  | { ok: true; products: ProductCard[]; pagination: Pagination }
  | { ok: false; message: string };

export async function loadMoreFeaturedProductsAction(
  locale: string,
  page: number,
  perPage: number = FEATURED_PRODUCTS_PER_PAGE
): Promise<LoadMoreFeaturedProductsResult> {
  const t = await getTranslations({ locale, namespace: 'home' });

  if (page < 1 || !Number.isFinite(page)) {
    return { ok: false, message: t('load-products-invalid-page') };
  }

  const session = await getSession();
  const token = session?.user?.access_token ?? '';
  const headersList = await headers();
  const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
    headers: headersList,
  });

  const response = await getProducts(
    { per_page: String(perPage), page: String(page) },
    locale,
    request,
    token
  );

  if (!response.ok) {
    const msg =
      typeof response.error === 'string'
        ? response.error
        : response.error?.message ?? t('load-products-failed');
    return { ok: false, message: msg };
  }

  return {
    ok: true,
    products: response.data.products,
    pagination: response.data.pagination,
  };
}
