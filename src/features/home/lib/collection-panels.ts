import type { ProductCard } from '@/types/products';

export const PANEL_PRODUCTS = 3;
export const MAX_PANELS = 3;

export type CollectionPanelVariant =
  | 'sale'
  | 'latest'
  | 'trendy'
  | 'most-viewed'
  | 'lowest-price'
  | 'most-loved';

export type CollectionPanelData = {
  variant: CollectionPanelVariant;
  products: ProductCard[];
  href?: string;
};

export const getSalePrice = (product: ProductCard): number | null =>
  product.sale_price != null && product.sale_price < product.price
    ? product.sale_price
    : null;

export const getFinalPrice = (product: ProductCard): number =>
  getSalePrice(product) ?? product.price;

export const getDiscountPercent = (product: ProductCard): number => {
  const salePrice = getSalePrice(product);
  return salePrice == null
    ? 0
    : Math.round((1 - salePrice / product.price) * 100);
};

const uniqueById = (products: ProductCard[]): ProductCard[] => [
  ...new Map(products.map(product => [product.id, product])).values(),
];

export const sortByLowestPrice = (products: ProductCard[]): ProductCard[] =>
  uniqueById(products).sort((a, b) => getFinalPrice(a) - getFinalPrice(b));

export const sortByMostLiked = (products: ProductCard[]): ProductCard[] =>
  uniqueById(products)
    .filter(product => (product.likes_count ?? 0) > 0)
    .sort((a, b) => (b.likes_count ?? 0) - (a.likes_count ?? 0));

/**
 * Keeps sources in priority order, drops any that cannot fill a full row,
 * and never shows the same product in two panels.
 */
export function buildCollectionPanels(
  sources: CollectionPanelData[]
): CollectionPanelData[] {
  const shownIds = new Set<number>();
  const panels: CollectionPanelData[] = [];

  for (const source of sources) {
    if (panels.length === MAX_PANELS) break;

    const products = source.products
      .filter(product => !shownIds.has(product.id))
      .slice(0, PANEL_PRODUCTS);
    if (products.length < PANEL_PRODUCTS) continue;

    products.forEach(product => shownIds.add(product.id));
    panels.push({ ...source, products });
  }

  return panels;
}
