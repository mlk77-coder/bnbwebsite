import { fetcher } from "@/lib/fetcher";
import { ApiResponseWithPagination } from "@/types";
import { ProductCard } from "@/types/products";
import { cache } from "react";

export interface GetFavoriteResponse extends ApiResponseWithPagination {
  products: ProductCard[];
}
export const getWishlist = async (
  locale: string,
  token: string,
  id: number = 1,
  request?: any
) => {
  const response = await fetcher<GetFavoriteResponse>(
    `favored-products?page=${id}`,
    locale,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    },
    false,
    request
  );
  return response;
};

export const cachedWishlistDetails = cache(
  async (locale: string, token: string, id: number = 1, request?: any) => {
    const data = await getWishlist(locale, token, id, request);
    return data;
  }
);
