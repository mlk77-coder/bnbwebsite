import { fetcher } from "@/lib/fetcher";
import { getEntry } from "@/lib/utils";
import { ApiResponse } from "@/types";
import type { MetadataRoute } from "next";

type Category = {
  slug: string;
  children: Category[];
};

const baseUrl = process.env.NEXT_PUBLIC_LOCAL_URL || "https://example.com";

const getSlugs = fetcher<ApiResponse & { categories: Category[] }>(
  "/categories-slugs"
);
export async function generateSitemaps() {
  // Fetch the total number of products
  const { data: categoriesList, ok } = await getSlugs;
  const urls: string[] = [];

  if (!ok || !categoriesList) return [];

  const processCategory = (parentSlug: string | null, category: Category) => {
    // Construct the current slug path
    const slugPath = parentSlug
      ? `${parentSlug}/${category.slug}`
      : category.slug;

    // Add the URL for this category
    const categoryUrl = `${baseUrl}/en/category/${slugPath}`;
    urls.push(categoryUrl);

    // Process children
    category.children.forEach((child) => processCategory(slugPath, child));
  };

  // Process all top-level categories
  categoriesList?.categories.forEach((category) =>
    processCategory(null, category)
  );

  // Divide URLs into chunks of 5 links per Sitemap
  const chunkSize = 5000;
  const numberOfSitemaps = Math.ceil(urls.length / chunkSize);

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
  // Fetch all product slugs
  const { data: categoriesList, ok } = await getSlugs;
  if (!ok || !categoriesList) return [];
  const urls: string[] = [];
  const processCategory = (parentSlug: string | null, category: Category) => {
    // Construct the current slug path
    const slugPath = parentSlug
      ? `${parentSlug}/${category.slug}`
      : category.slug;

    // Add the URL for this category
    const categoryUrl = `/category/${slugPath}`;
    urls.push(categoryUrl);

    // Process children
    category.children.forEach((child) => processCategory(slugPath, child));
  };

  // Process all top-level categories
  categoriesList?.categories.forEach((category) =>
    processCategory(null, category)
  );

  // Divide URLs into chunks of 5000 links per Sitemap
  const start = id * 5000;
  const end = start + 5000;

  const subset = urls.slice(start, end);
  // Map to sitemap entries
  return subset.map((product) => getEntry(`${product}`));
}
