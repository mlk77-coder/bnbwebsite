import { mapProductsResponse } from "@/lib/api-mappers";
import { fetcher } from "@/lib/fetcher";
import { GetApiProductsResponse } from "@/types/products";

const buildQueryString = (params: Record<string, string> = {}) => {
  const query = new URLSearchParams(params).toString();
  return query ? `?${query}` : "";
};

const authOptions = (token?: string): RequestInit | undefined =>
  token ? { headers: { authorization: `Bearer ${token}` } } : undefined;

export const getProducts = async (
  params: Record<string, string> = {},
  locale: string = "en",
  request?: Request,
  token?: string
) => {
  const query = buildQueryString(params);
  const path = `products${query}`;
  const response = await fetcher<GetApiProductsResponse>(
    path,
    locale,
    authOptions(token),
    false,
    request
  );

  if (!response.ok) return response;

  return {
    ...response,
    data: mapProductsResponse(
      response.data.data.data,
      response.data.data.meta,
      path
    ),
  };
};

const getProductList = async (
  categoryId: string,
  params: Record<string, string> = {},
  locale: string = "en",
  request?: Request,
  token?: string
) => {
  if (!categoryId) {
    return getProducts(params, locale, request, token);
  }

  const query = buildQueryString(params);
  const path = `categories/${categoryId}/products${query}`;
  const response = await fetcher<GetApiProductsResponse>(
    path,
    locale,
    authOptions(token),
    false,
    request
  );

  if (!response.ok) return response;

  return {
    ...response,
    data: mapProductsResponse(
      response.data.data.data,
      response.data.data.meta,
      path
    ),
  };
};

export default getProductList;
