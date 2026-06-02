'use server';

import { COLLECTION_PRODUCTS_PER_PAGE } from '@/features/product-collections/constants';
import { getProductCollection } from '@/features/product-collections/api/get-product-collection';
import type { ProductCollectionId } from '@/features/product-collections/types';
import getSession from '@/lib/get-session';
import type { Pagination } from '@/types';
import type { ProductCard } from '@/types/products';
import { headers } from 'next/headers';
import { getTranslations } from 'next-intl/server';

export type LoadMoreCollectionResult =
  | { ok: true; products: ProductCard[]; pagination: Pagination }
  | { ok: false; message: string };

const COLLECTION_EXTRA_PARAMS: Partial<
  Record<ProductCollectionId, Record<string, string>>
> = {
  'on-sale': { sort_by: 'discount' },
};

export async function loadMoreCollectionAction(
  locale: string,
  collection: ProductCollectionId,
  page: number,
  perPage: number = COLLECTION_PRODUCTS_PER_PAGE
): Promise<LoadMoreCollectionResult> {
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

  const response = await getProductCollection(
    collection,
    {
      page: String(page),
      limit: String(perPage),
      per_page: String(perPage),
      ...COLLECTION_EXTRA_PARAMS[collection],
    },
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
