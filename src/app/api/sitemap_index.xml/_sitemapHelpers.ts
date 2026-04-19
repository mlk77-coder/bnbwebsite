import { fetcher } from "@/lib/fetcher";
import { ApiResponse } from "@/types";

const getProductsSlugs = fetcher<ApiResponse & { products: string[] }>(
  "/products-slugs"
);

type Category = {
  slug: string;
  children: Category[];
};

const getCategoriesSlugs = fetcher<ApiResponse & { categories: Category[] }>(
  "/categories-slugs"
);

export async function generateProductsSitemaps(baseUrl: string) {
  const { data: products, ok } = await getProductsSlugs;

  if (!ok) return [];

  const totalProducts = products.products.length;
  const productsPerSitemap = 5000;
  const numberOfSitemaps = Math.ceil(totalProducts / productsPerSitemap);

  return Array.from({ length: numberOfSitemaps }, (_, index) => ({
    id: index,
    url: `${baseUrl}/sitemap/products/sitemap/${index}.xml`,
  }));
}

export async function generateCategorySitemaps(baseUrl: string) {
  const { data: categoriesList, ok } = await getCategoriesSlugs;

  if (!ok || !categoriesList) return [];

  const urls: string[] = [];
  const categories = categoriesList.categories;

  // Helper function to process categories
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
  categories.forEach((category) => processCategory(null, category));

  // Divide URLs into chunks of 5000 links per Sitemap
  const chunkSize = 5000;
  const numberOfSitemaps = Math.ceil(urls.length / chunkSize);

  // Generate sitemap metadata
  return Array.from({ length: numberOfSitemaps }, (_, index) => ({
    id: index,
    url: `${baseUrl}/sitemap/categories/sitemap/${index}.xml`,
  }));
}

export async function buildSitemapIndex(sitemaps: string[]) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  for (const sitemapURL of sitemaps) {
    xml += "<sitemap>";
    xml += `<loc>${sitemapURL}</loc>`;
    xml += "</sitemap>";
  }

  xml += "</sitemapindex>";
  return xml;
}
