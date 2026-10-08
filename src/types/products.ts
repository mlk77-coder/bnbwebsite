import { ApiPaginatedData, ApiResponse, ApiResponseWithPagination } from '.';

export type ApiProductCategory = {
  id: number;
  name: string;
  image?: string | null;
};

export type ApiProductVariantAttribute = {
  id: number;
  attribute_id: number;
  attribute_name: string;
  attribute_type: string | null;
  value: string;
};

export type ApiProductVariant = {
  id: number;
  product_id: number;
  sku: string;
  price: number;
  sale_price: number | null;
  stock_quantity: number;
  is_active: boolean;
  images: string[];
  attributes: ApiProductVariantAttribute[];
};

export type ApiProduct = {
  id: number;
  name: string;
  name_en?: string;
  name_ar?: string;
  slug: string;
  description?: string;
  description_en?: string;
  description_ar?: string;
  price: number;
  sale_price: number | null;
  images: string[];
  rating: number;
  reviews_count: number;
  likes_count?: number;
  comments_count?: number;
  is_liked?: boolean;
  liked?: boolean;
  is_available: boolean;
  stock_quantity?: number;
  specifications?: Record<string, string> | null;
  category_id: number;
  category: ApiProductCategory | null;
  seller?: unknown;
  variants?: ApiProductVariant[];
};

export type GetApiProductsResponse = ApiResponse & {
  data: ApiPaginatedData<ApiProduct>;
};

export type ProductVariantAttribute = {
  id: number;
  attributeId: number;
  name: string;
  type: string | null;
  value: string;
};

/** Public variant shape — stock_quantity is never exposed (use is_in_stock). */
export type ProductVariant = {
  id: number;
  sku: string;
  price: number;
  sale_price: number | null;
  is_active: boolean;
  is_in_stock: boolean;
  images: string[];
  attributes: ProductVariantAttribute[];
};

export type ProductCard = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  price: number;
  sale_price: number | null;
  images: string[];
  image: string;
  rating: number;
  reviews_count: number;
  likes_count?: number;
  comments_count?: number;
  is_liked?: boolean;
  is_available: boolean;
  stock_quantity: number;
  category_id: number;
  category: ApiProductCategory | null;
};

/** Detail page contract — no raw stock_quantity. */
export interface ProductDetails extends Omit<ProductCard, 'stock_quantity'> {
  quantity_in_cart: number;
  created_at: string;
  variants: ProductVariant[];
  specifications?: Record<string, string> | null;
}

export type GetProductDetailsResponse = ProductDetails;

export interface GetProductsResponse extends ApiResponseWithPagination {
  products: ProductCard[];
}
