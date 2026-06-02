export type ProductCollectionId =
  | 'featured'
  | 'latest'
  | 'on-sale'
  | 'most-viewed';

export const PRODUCT_COLLECTION_PATHS: Record<ProductCollectionId, string> = {
  featured: 'products/featured',
  latest: 'products/latest',
  'on-sale': 'products/on-sale',
  'most-viewed': 'products/most-viewed',
};

export const PRODUCT_COLLECTION_SEE_MORE: Record<ProductCollectionId, string> = {
  featured: '/trendy',
  latest: '/new-arrivals',
  'on-sale': '/sale',
  'most-viewed': '/most-viewed',
};
