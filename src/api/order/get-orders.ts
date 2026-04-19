import { fetcher } from "@/lib/fetcher";
import { GetOrderResponse, GetOrdersResponse } from "@/types/order";
import { cache } from "react";

export const getOrders = async (
  locale: string,
  token: string,
  id: number = 1,
  request?: any
) => {
  const response = await fetcher<GetOrdersResponse>(
    `orders?page=${id}`,
    locale,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    false,
    request
  );
  return response;
};

export const cachedGetOrders = cache(
  async (locale: string, token: string, request?: any) => {
    const data = await getOrders(locale, token, 1, request);
    return data;
  }
);

export const getOrder = async (
  locale: string,
  token: string,
  id: string,
  isLoggedIn: boolean = true,
  request?: any
) => {
  const url = `orders/${id}`;
  const fullUrl = isLoggedIn ? url : `${url}?s_id=${token}`;
  const auth = (
    isLoggedIn
      ? { headers: { authorization: `Bearer ${token}` }, cache: "no-cache" }
      : {}
  ) as RequestInit;
  const response = await fetcher<GetOrderResponse>(
    fullUrl,
    locale,
    auth,
    false,
    request
  );
  return response;
};

export const cachedGetOrder = cache(
  async (
    locale: string,
    token: string,
    id: string,
    isLoggedIn: boolean = true,
    request?: any
  ) => {
    const data = await getOrder(locale, token, id, isLoggedIn, request);
    return data;
  }
);
