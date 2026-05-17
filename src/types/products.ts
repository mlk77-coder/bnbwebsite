import { ApiPaginatedData, ApiResponse, ApiResponseWithPagination } from '.';

export type ApiProductCategory = {
  id: number;
  name: string;
  image?: string | null;
};

export type ApiProduct = {
  id: number;
  name: string;
  slug: string;
  description?: string;
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
};

export type GetApiProductsResponse = ApiResponse & {
  data: ApiPaginatedData<ApiProduct>;
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

export interface ProductDetails extends ProductCard {
  quantity_in_cart: number;
  created_at: string;
}

export type GetProductDetailsResponse = ProductDetails;

export interface GetProductsResponse extends ApiResponseWithPagination {
  products: ProductCard[];
}
