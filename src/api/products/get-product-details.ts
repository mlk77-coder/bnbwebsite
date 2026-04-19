import { fetcher } from "@/lib/fetcher";
import { GetProductDetailsResponse } from "@/types/products";
import { cache } from "react";

export const getProductDetails = async (
  slug: string,
  locale: string = "en",
  isLoggedIn: boolean = false,
  token: string = "",
  request?: any
) => {
  const url = `products/${slug}`;
  const fullUrl = isLoggedIn ? url : `${url}?s_id=${token}`;
  const auth = (
    isLoggedIn ? { headers: { authorization: `Bearer ${token}` } } : {}
  ) as RequestInit;
  // Making an API request to fetch product details by slug
  const response = await fetcher<GetProductDetailsResponse>(
    fullUrl,
    locale,
    auth,
    false,
    request
  );

  return response;
};

/**
 * Cached version of the getProductDetails function to optimize API calls.
 * This caches the product details for the given slug.
 *
 * @param {string} slug - The slug of the product to retrieve.
 * @returns {Promise<GetProductDetailsResponse | undefined>} The product details from cache or fetched if not cached.
 */
export const cachedProductDetails = cache(
  async (slug: string, locale: string = "en", request: any) => {
    // Fetches product details using the memoized getProductDetails function
    const data = await getProductDetails(slug, locale, false, "", request);
    return data;
  }
);
