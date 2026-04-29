import type { ApiMetaPagination, Pagination } from '@/types';
import type { ApiCategory } from '@/types/categories';
import type {
  ApiProduct,
  GetProductDetailsResponse,
  GetProductsResponse,
  ProductCard,
} from '@/types/products';
import type { ApiReview, GetReviewsResponse } from '@/types/reviews';

// Converts the API `meta` pagination shape into the legacy pagination contract used by product lists.
export function mapApiPagination(
  meta: ApiMetaPagination,
  path: string
): Pagination {
  const lastPage = Math.max(meta.last_page, 1);
  const currentPage = Math.min(Math.max(meta.current_page, 1), lastPage);
  const withPage = (page: number) =>
    `${path}${path.includes('?') ? '&' : '?'}page=${page}`;

  return {
    current_page: currentPage,
    next_page_url: currentPage < lastPage ? withPage(currentPage + 1) : null,
    prev_page_url: currentPage > 1 ? withPage(currentPage - 1) : null,
    first_page_url: withPage(1),
    last_page_url: withPage(lastPage),
    per_page: meta.per_page,
    total: meta.total,
  };
}

// Converts the new product API shape into the existing ProductCard contract.
export function mapApiProduct(product: ApiProduct): ProductCard {
  const primaryImage = product.images[0] || '/no-product.svg';

  return {
    id: product.id,
    name: product.name,
    slug: String(product.id),
    description: product.description,
    price: product.price,
    sale_price: product.sale_price,
    images: product.images,
    image: primaryImage,
    rating: product.rating,
    reviews_count: product.reviews_count,
    is_liked: product.is_liked,
    is_available: product.is_available,
    stock_quantity: product.stock_quantity ?? 0,
    category_id: product.category_id,
    category: product.category,
  };
}

// Adapts `/products/{id}` to the product detail contract used by the page UI.
export function mapApiProductDetails(
  product: ApiProduct
): GetProductDetailsResponse {
  const productCard = mapApiProduct(product);

  return {
    ...productCard,
    description: product.description || '',
    quantity_in_cart: 0,
    created_at: new Date().toISOString(),
  };
}

function getReviewsRateCount(reviews: ApiReview[]) {
  return [1, 2, 3, 4, 5].map(rate => ({
    rate,
    count: reviews.filter(review => review.rating === rate).length,
  }));
}

// Normalizes `/products/{id}/reviews` for the existing review summary and pagination UI.
export function mapReviewsResponse(
  reviews: ApiReview[],
  meta: ApiMetaPagination,
  path: string
): GetReviewsResponse {
  const avg =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  return {
    success: true,
    message: 'Reviews loaded',
    reviews: reviews.map(review => ({
      id: review.id,
      name: review.user.name,
      avatar: review.user.avatar,
      rate: review.rating,
      comment: review.comment,
      product_id: 0,
      created_at: review.created_at,
    })),
    avg,
    reviews_rate_count: getReviewsRateCount(reviews),
    pagination: mapApiPagination(meta, path),
  };
}

// Produces the full product list response consumed by filters and infinite loading.
export function mapProductsResponse(
  products: ApiProduct[],
  meta: ApiMetaPagination,
  path: string
): GetProductsResponse {
  const mappedProducts = products.map(mapApiProduct);

  return {
    success: true,
    message: 'Products loaded',
    products: mappedProducts,
    pagination: mapApiPagination(meta, path),
  };
}
