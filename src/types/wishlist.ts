import { ApiResponse } from ".";

export type ApiWishlistProduct = {
  id: number;
  name: string;
  price: number;
  sale_price: number | null;
  image: string;
  rating: number;
  is_available: boolean;
};

export type WishlistItem = {
  id: number;
  product: ApiWishlistProduct;
  added_at: string;
};

export type GetWishlistResponse = ApiResponse & {
  data: WishlistItem[];
};

export type AddWishlistResponse = ApiResponse & {
  data: {
    id: number;
    product_id: number;
  };
};
