import type { ApiPaginatedData } from "@/types";

/** Row from GET `/orders` */
export type OrderSummary = {
  id: number;
  order_number: string;
  status: string;
  total: number;
  items_count: number;
  created_at: string;
  estimated_delivery: string;
};

export type OrderListItemProduct = {
  id: number;
  name: string;
  image: string | null;
};

export type OrderDetailItem = {
  id: number;
  product: OrderListItemProduct;
  quantity: number;
  price: string;
  subtotal: string;
};

export type OrderDetailAddress = {
  id: number;
  user_id: number;
  type: string;
  city: string;
  area: string;
  street_address: string;
  building_number: string;
  flat_number: string | null;
  landmark: string | null;
  postal_code: string | null;
  state: string | null;
  country: string;
  address_line: string | null;
  is_default: boolean;
  latitude: number | null;
  longitude: number | null;
  address_name: string;
  details: string | null;
  phone: string;
  created_at: string;
  updated_at: string;
};

export type OrderDetail = {
  id: number;
  order_number: string;
  status: string;
  subtotal: string;
  tax: string;
  shipping: string;
  total: string;
  notes: string | null;
  items: OrderDetailItem[];
  address: OrderDetailAddress;
  payment_method: string;
  payment_status: string;
  created_at: string;
  estimated_delivery: string;
  delivered_at: string | null;
};

export type OrdersListApiResponse = {
  success: boolean;
  message?: string;
  data: ApiPaginatedData<OrderSummary>;
};

export type OrderDetailApiResponse = {
  success: boolean;
  message?: string;
  data: OrderDetail;
};

export type CreateOrderBody = {
  address_id: number;
  payment_method_id: number;
  notes?: string;
};

export type CreateOrderApiResponse = {
  success: boolean;
  message?: string;
  data?: { id: number } | number;
};

export type CancelOrderBody = {
  reason: string;
};

export const DEFAULT_PAYMENT_METHOD_CASH_ON_DELIVERY_ID = 1;
