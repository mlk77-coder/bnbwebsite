import { ApiResponse, ApiResponseWithPagination } from ".";

export type Order = {
  created_at: number;
  id: number;
  image: string;
  invoice_value: number;
  name: string;
  order_id: string;
  order_products_count: number;
  shipment_fees: number;
  total: number;
  status: string,
  status_value: number,
};

export type OrderDetails = {
  id: number;
  order_id: string;
  coupon_value: string | null;
  name: string;
  invoice_value: number;
  shipment_fees: number;
  total: number;
  created_at: string;
  address_name: string;
  lat: string;
  long: string;
  phone: string;
  status: string,
  status_value: number,
  email: string;
  order_products: {
    id: number;
    name: string;
    description: string;
    price: string;
    quantity: number;
    image: string;
    attributes: Record<string, string> | null;
    created_at: string;
  }[];
};

export interface GetOrdersResponse extends ApiResponseWithPagination {
  orders: Order[];
}

export interface GetOrderResponse extends ApiResponse {
  order_products: OrderDetails;
}
