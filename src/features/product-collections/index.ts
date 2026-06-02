export { HERO_PRODUCTS_LIMIT, COLLECTION_PRODUCTS_PER_PAGE } from './constants';
export { getProductCollection } from './api/get-product-collection';
export { loadMoreCollectionAction } from './actions/load-more-collection';
export {
  PRODUCT_COLLECTION_SEE_MORE,
  type ProductCollectionId,
} from './types';
export { default as ProductCollectionPage } from './components/product-collection-page';
