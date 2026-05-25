import { fetcher } from "@/lib/fetcher";
import { GetProfileResponse } from "@/types/profile";
import { cache } from "react";

export const getProfile = async (
  locale: string,
  token: string,
  request?: Request
) => {
  const response = await fetcher<GetProfileResponse>(
    "auth/profile",
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

export const cachedGetProfile = cache(
  async (locale: string, token: string, request?: Request) => {
    const data = await getProfile(locale, token, request);
    return data;
  }
);
