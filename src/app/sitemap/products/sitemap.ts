import { fetcher } from "@/lib/fetcher";
import { getEntry } from "@/lib/utils";
import { ApiResponse } from "@/types";
import type { MetadataRoute } from "next";

const getSlugs = fetcher<ApiResponse & { products: string[] }>(
  "/products-slugs"
);

export async function generateSitemaps() {
  // Fetch the total number of products
  const { data: products, ok } = await getSlugs;

  if (!ok) return [];

  const totalProducts = products.products.length;

  // Calculate the number of sitemaps needed (10 products per sitemap)
  const productsPerSitemap = 5000;
  const numberOfSitemaps = Math.ceil(totalProducts / productsPerSitemap);

  // Generate an array of sitemap objects
  const sitemaps = Array.from({ length: numberOfSitemaps }, (_, index) => ({
    id: index,
  }));
  return sitemaps;
}

export default async function sitemap({
    id,
  }: {
    id: number;
  }): Promise<MetadataRoute.Sitemap> {
    const start = id * 5000;
    const end = start + 5000;
    // Fetch all product slugs
    const { data: products, ok } = await getSlugs;
    if (!ok || !products) return [];
  
    // Get the subset of products for this sitemap
    const subset = products.products.slice(start, end);
  
    // Map to sitemap entries
    return subset.map((product) => getEntry(`/products/${product}`));
  }
  