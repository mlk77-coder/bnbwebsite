import { fetcher } from '@/lib/fetcher';
import { mapApiProductDetails } from '@/lib/api-mappers';
import { ApiProduct } from '@/types/products';
import { cache } from 'react';

export const getProductDetails = async (
  slug: string,
  locale: string = 'en',
  isLoggedIn: boolean = false,
  token: string = '',
  request?: Request
) => {
  const url = `products/${slug}`;
  const fullUrl = isLoggedIn ? url : `${url}?s_id=${token}`;
  const auth = (
    isLoggedIn ? { headers: { authorization: `Bearer ${token}` } } : {}
  ) as RequestInit;
  // Product details are fetched on the server and mapped to the existing UI contract.
  const response = await fetcher<{ success: boolean; data: ApiProduct }>(
    fullUrl,
    locale,
    auth,
    false,
    request
  );

  if (!response.ok) return response;

  return {
    ...response,
    data: mapApiProductDetails(response.data.data),
  };
};

/**
 * Cached version of the getProductDetails function to optimize API calls.
 * This caches the product details for the given slug.
 *
 * @param {string} slug - The slug of the product to retrieve.
 * @returns {Promise<GetProductDetailsResponse | undefined>} The product details from cache or fetched if not cached.
 */
export const cachedProductDetails = cache(
  async (slug: string, locale: string = 'en', request: Request) => {
    // Fetches product details using the memoized getProductDetails function
    const data = await getProductDetails(slug, locale, false, '', request);
    return data;
  }
);
