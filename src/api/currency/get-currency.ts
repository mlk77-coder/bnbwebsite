import { fetcher } from "@/lib/fetcher";
import { ApiResponse } from "@/types";
import { headers } from "next/headers";
import { cache } from "react";

interface getCurrencyResponse extends ApiResponse {
  change_rate: number;
  shipment_fees: number;
  symbol: string;
  country: string;
  active_countries: number[];
}

export const getCurrency = async () => {
  const headersList = await headers();
  const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
    headers: headersList,
  });
  const response = await fetcher<getCurrencyResponse>(
    "currency",
    "en",
    undefined,
    false,request
  );
  return response;
};

export const cachedGetCurrency = cache(async () => {
  const data = await getCurrency();
  return data;
});
