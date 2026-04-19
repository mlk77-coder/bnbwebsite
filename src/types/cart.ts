export type CartProduct = {
  id: number;
  quantity: number;
  name: string;
  weight: string;
  price: string;
  slug: string;
  product_quantity: number;
  category_id: number;
  category_name: string;
  image: string;
  has_discount: 0 | 1;
  price_after_sale: null | number;
  note: null | string;
  variant_id: number | null;
  attribute_values?: Record<string, string>;
  created_at: string;
};

export type Cart = {
  id: number;
  invoice_value: number;
  total: number;
  created_at: string;
  products: CartProduct[];
};

export interface GetCartResponse {
  cart: Cart;
}
