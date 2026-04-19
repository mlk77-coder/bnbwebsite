import { fetcher } from "@/lib/fetcher";
import { ApiResponseWithPagination } from "@/types";
import { ProductCard } from "@/types/products";
import { cache } from "react";

export interface GetRecentlyViewedResponse extends ApiResponseWithPagination {
  products: ProductCard[];
}
export const getRecentlyViewed = async (
  locale: string,
  token: string,
  id: number = 1,
  isLoggedIn: boolean
) => {
  const url = `recently-viewed-product?page=${id}`;
  const fullUrl = isLoggedIn ? url : `${url}&s_id=${token}`;

  const auth = isLoggedIn
    ? { headers: { authorization: `Bearer ${token}` } }
    : {};
  const response = await fetcher<GetRecentlyViewedResponse>(
    fullUrl,
    locale,
    auth
  );
  return response;
};

export const cachedGetRecentlyViewed = cache(
  async (locale: string, token: string, id: number = 1) => {
    const data = await getRecentlyViewed(locale, token, id, true);
    return data;
  }
);
