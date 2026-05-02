import { fetcher } from "@/lib/fetcher";
import { GetAddressesResponse } from "@/types/address";
import { cache } from "react";

export const getAddresses = async (
  locale: string,
  token: string,
  request?: any
) => {
  const response = await fetcher<GetAddressesResponse>(
    `addresses`,
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

export const cachedGetAddresses = cache(
  async (locale: string, token: string, request?: any) => {
    const data = await getAddresses(locale, token, request);
    return data;
  }
);
