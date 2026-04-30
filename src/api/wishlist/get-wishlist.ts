import { fetcher } from "@/lib/fetcher";
import { GetWishlistResponse } from "@/types/wishlist";
import { cache } from "react";

export const getWishlist = async (
  locale: string,
  token: string,
  request?: Request
) => {
  const response = await fetcher<GetWishlistResponse>(
    "wishlist",
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

export const cachedGetWishlist = cache(
  async (locale: string, token: string, request?: Request) => {
    const data = await getWishlist(locale, token, request);
    return data;
  }
);
