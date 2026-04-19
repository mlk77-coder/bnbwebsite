"use client";

import { useState, useCallback, useEffect } from "react";
import { fetcher } from "@/lib/fetcher";
import {
  GetProductsResponse,
  ProductCard as ProductCardType,
} from "@/types/products";

export function useRelatedProducts(
  id: string,
  locale: string,
  initialProducts: ProductCardType[] = [],
  totalPages: number = 1
) {
  const [products, setProducts] = useState<ProductCardType[]>(initialProducts);
  const [page, setPage] = useState(initialProducts.length > 0 ? 2 : 1); // Start from page 2 if initialProducts is provided, otherwise start from 1
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(page <= totalPages);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetcher<GetProductsResponse>(
        `products/${id}/similar?page=${page}`,
        locale
      );
      if (response.ok) {
        const newProducts = response.data.products;
        setProducts((prev) => [...prev, ...newProducts]);
        setPage((prev) => prev + 1);
        setHasMore(page < totalPages);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching related products:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [id, locale, page, loading, hasMore, totalPages]);

  useEffect(() => {
    if (initialProducts.length === 0) {
      loadMore();
    }
  }, [initialProducts, loadMore]);

  return { products, loading, hasMore, loadMore };
}