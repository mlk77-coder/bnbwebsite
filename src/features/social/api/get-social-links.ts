import { fetcher } from "@/lib/fetcher";
import { ApiResponse } from "@/types";
import { cache } from "react";

export type SocialLink = {
  id: number;
  type: "link" | "email" | "phone";
  value: string;
  image: string;
};

interface getLinksResponse extends ApiResponse {
  information: SocialLink[];
}

export const getSocialLinks = async () => {
  const response = await fetcher<getLinksResponse>("information");
  return response;
};

export const cachedGetSocialLinks = cache(async () => {
  const data = await getSocialLinks();
  return data;
});
