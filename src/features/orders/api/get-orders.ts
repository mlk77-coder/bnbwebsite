import { fetcher } from "@/lib/fetcher";
import type {
  OrderDetailApiResponse,
  OrdersListApiResponse,
} from "@/types/order";
import { cache } from "react";

export const getOrders = async (
  locale: string,
  token: string,
  page: number = 1,
  request?: Request
) => {
  return fetcher<OrdersListApiResponse>(
    `orders?page=${page}`,
    locale,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    false,
    request
  );
};

export const cachedGetOrders = cache(
  async (locale: string, token: string, request?: Request) => {
    return getOrders(locale, token, 1, request);
  }
);

export const getOrder = async (
  locale: string,
  token: string,
  id: string,
  request?: Request
) => {
  return fetcher<OrderDetailApiResponse>(
    `orders/${id}`,
    locale,
    {
      headers: { authorization: `Bearer ${token}` },
      cache: "no-cache",
    },
    false,
    request
  );
};

export const cachedGetOrder = cache(
  async (locale: string, token: string, id: string, request?: Request) => {
    return getOrder(locale, token, id, request);
  }
);
