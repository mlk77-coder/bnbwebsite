import {
  mapApiProductList,
  mapProductsResponse,
} from '@/lib/api-mappers';
import { fetcher } from '@/lib/fetcher';
import type { ApiResponse } from '@/types';
import type {
  ApiProduct,
  GetApiProductsResponse,
  GetProductsResponse,
} from '@/types/products';
import {
  PRODUCT_COLLECTION_PATHS,
  type ProductCollectionId,
} from '@/features/product-collections/types';

type SimpleProductListResponse = ApiResponse & {
  data: ApiProduct[];
};

const buildQueryString = (params: Record<string, string> = {}) => {
  const query = new URLSearchParams(params).toString();
  return query ? `?${query}` : '';
};

const authOptions = (token?: string): RequestInit | undefined =>
  token ? { headers: { authorization: `Bearer ${token}` } } : undefined;

function isPaginatedPayload(
  data: unknown
): data is GetApiProductsResponse['data'] {
  return (
    typeof data === 'object' &&
    data !== null &&
    'data' in data &&
    'meta' in data &&
    Array.isArray((data as GetApiProductsResponse['data']).data)
  );
}

function mapSimpleListResponse(
  products: ApiProduct[],
  path: string,
  perPage: number
): GetProductsResponse {
  const mapped = mapApiProductList(products);

  return {
    success: true,
    message: 'Products loaded',
    products: mapped,
    pagination: {
      current_page: 1,
      next_page_url: null,
      prev_page_url: null,
      first_page_url: path,
      last_page_url: path,
      per_page: perPage,
      total: mapped.length,
    },
  };
}

export async function getProductCollection(
  collection: ProductCollectionId,
  params: Record<string, string> = {},
  locale: string = 'en',
  request?: Request,
  token?: string
) {
  const query = buildQueryString(params);
  const basePath = PRODUCT_COLLECTION_PATHS[collection];
  const path = `${basePath}${query}`;
  const response = await fetcher<
    SimpleProductListResponse | GetApiProductsResponse
  >(path, locale, authOptions(token), false, request);

  if (!response.ok) return response;

  const payload = response.data.data;

  if (isPaginatedPayload(payload)) {
    return {
      ...response,
      data: mapProductsResponse(payload.data, payload.meta, path),
    };
  }

  const products = Array.isArray(payload) ? payload : [];
  const perPage = Number(params.limit ?? params.per_page) || products.length;

  return {
    ...response,
    data: mapSimpleListResponse(products, path, perPage || products.length),
  };
}
