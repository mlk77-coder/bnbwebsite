import axiosInstance from "@/lib/axios";
import type {
  CancelOrderBody,
  CreateOrderApiResponse,
  CreateOrderBody,
} from "@/types/order";

export type CreateOrderHeaders = {
  token?: string;
  locale: string;
};

export async function createOrderApi(
  body: CreateOrderBody,
  { token, locale }: CreateOrderHeaders
) {
  const headers: Record<string, string> = { lang: locale };
  if (token) headers.Authorization = `Bearer ${token}`;

  const { data } = await axiosInstance.post<CreateOrderApiResponse>(
    `orders`,
    body,
    { headers }
  );
  return data;
}

export function parseCreatedOrderId(
  payload: CreateOrderApiResponse | undefined | null
): number | undefined {
  if (!payload?.data) return undefined;
  if (typeof payload.data === "number") return payload.data;
  if (typeof payload.data === "object" && payload.data?.id != null)
    return Number(payload.data.id);
  return undefined;
}

export async function cancelOrderApi(
  orderId: number,
  body: CancelOrderBody,
  token: string,
  locale: string
) {
  const { data } = await axiosInstance.post<{
    success: boolean;
    message?: string;
  }>(`orders/${orderId}/cancel`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      lang: locale,
    },
  });
  return data;
}
