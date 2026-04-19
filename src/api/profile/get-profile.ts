import { fetcher } from "@/lib/fetcher";
import { ApiResponse } from "@/types";
import { GetProfileResponse } from "@/types/profile";
import { cache } from "react";

export const getProfile = async (
  locale: string,
  token: string,
  request: any
) => {
  const response = await fetcher<GetProfileResponse>(
    "profile",
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
  async (locale: string, token: string, request: any) => {
    const data = await getProfile(locale, token, request);
    return data;
  }
);
