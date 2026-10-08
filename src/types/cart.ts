export type CartProduct = {
  id: number;
  name: string;
  price: number;
  sale_price: number | null;
  image: string | null;
  is_available: boolean;
  stock_quantity: number;
};

export type CartVariantAttribute = {
  attribute_name: string;
  value: string;
};

/** Cart line variant — stock_quantity is never shown in the UI. */
export type CartVariant = {
  id: number;
  sku: string;
  price: number;
  sale_price?: number | null;
  attributes: CartVariantAttribute[];
};

export type CartItem = {
  id: number;
  product: CartProduct;
  quantity: number;
  subtotal: number;
  variant?: CartVariant | null;
};

export type CartSummary = {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
};

export type Cart = {
  items: CartItem[];
  summary: CartSummary;
};

export type AddToCartBody = {
  product_id: number;
  quantity: number;
  variant_id?: number;
};

export type UpdateCartItemBody = {
  quantity: number;
};

export interface GetCartResponse {
  success: boolean;
  data: Cart;
}
