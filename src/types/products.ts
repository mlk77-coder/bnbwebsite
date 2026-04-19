import { ApiResponseWithPagination } from ".";

export type Product = {
  id: number;
  name: string;
  price: string;
  quantity: number;
  quantity_in_cart: number;
  image: string;
  has_discount: 0 | 1;
  price_after_sale: null | number;
  slug: string;
  alternative_image: string;
  created_at: string;
};
export type ProductCard = {
  id: number;
  name: string;
  price: string;
  created_at: string;
  quantity: number;
  image: string;
  has_discount: 0 | 1;
  price_after_sale: null | number;
  slug: string;
  alternative_image: string;
  product_color_attributes: {
    image: string;
    color_image: string;
    color: string;
  }[];
};

export type ProductAttributeValue = {
  id: number;
  value: string;
  image: string;
};

export type ProductAttribute = {
  attribute: string;
  values: ProductAttributeValue[];
};

export type PriceRange = {
  min_price: number;
  max_price: number;
};

export interface GetProductsResponse extends ApiResponseWithPagination {
  products: ProductCard[];
  range_price: PriceRange;
  attributes: ProductAttribute[];
}

export type VariantValue = {
  id: number;
  value: string;
  attribute_id: number;
  image: string | null;
  attribute_name: string;
};

export type productVariant = Product & {
  attribute_values: VariantValue[];
};

export type GetProductDetailsResponse = {
  product: ProductDetails;
  attributes: Record<string, VariantValue[]>;
};

export type ProductCategory = {
  slug: string;
  name: string;
  category: ProductCategory | null;
  size_chart_type: number | null;
};

export interface ProductDetails extends Product {
  gallery: {
    id: number;
    url: string;
  }[];
  description: string;
  code: string | null;
  product_variants_count: null | number;
  created_at: string;
  category_slug: string;
  category: ProductCategory;
  available_variants: productVariant[];
  details: Record<string, string>;
}
