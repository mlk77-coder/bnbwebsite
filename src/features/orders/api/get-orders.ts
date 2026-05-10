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
  isLoggedIn: boolean = true,
  request?: Request
) => {
  const url = `orders/${id}`;
  const fullUrl = isLoggedIn ? url : `${url}?s_id=${encodeURIComponent(token)}`;
  const auth = (
    isLoggedIn
      ? {
          headers: { authorization: `Bearer ${token}` },
          cache: "no-cache" as RequestCache,
        }
      : {}
  ) satisfies RequestInit;
  return fetcher<OrderDetailApiResponse>(fullUrl, locale, auth, false, request);
};

export const cachedGetOrder = cache(
  async (
    locale: string,
    token: string,
    id: string,
    isLoggedIn: boolean = true,
    request?: Request
  ) => {
    return getOrder(locale, token, id, isLoggedIn, request);
  }
);
