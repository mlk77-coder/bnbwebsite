"use client";

import { getRecentlyViewed } from "@/features/recent-items";
import { ProductCard as ProductCardType } from "@/types/products";
import { useCallback, useEffect, useState } from "react";

export function useRecentlyViewed(
  locale: string,
  token: string,
  isLoggedIn: boolean
) {
  const [products, setProducts] = useState<ProductCardType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = useCallback(
    async (pageNumber: number) => {
      setLoading(true);
      setError(null);
      try {
        const response = await getRecentlyViewed(
          locale,
          token,
          pageNumber,
          isLoggedIn
        );
        if (response.ok) {
          const newProducts = response.data.products;
          setProducts((prev) => [...prev, ...newProducts]);
          setHasMore(newProducts.length > 0);
          setPage((prev) => prev + 1);
        } else {
          throw new Error("Failed to fetch products");
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [locale, token]
  );

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchProducts(page);
    }
  }, [loading, hasMore, page, fetchProducts]);

  return { products, loading, error, hasMore, loadMore };
}
