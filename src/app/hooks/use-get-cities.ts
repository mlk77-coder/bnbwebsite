import axiosInstance from "@/lib/axios";
import { ApiResponse } from "@/types";
import {
  keepPreviousData,
  queryOptions,
  useQuery,
} from "@tanstack/react-query";
import { useLocale } from "next-intl";

export interface GetCitiesResponse extends ApiResponse {
  cities: { id: number; name: string }[];
}

export const getCitiesOptions = (id?: number, lang?: string) => {
  const langQuery = lang || "en";
  return queryOptions({
    queryKey: ["cities", langQuery, id],
    placeholderData: keepPreviousData,
    staleTime: Infinity,
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosInstance.get<GetCitiesResponse>(
        `cities/${id}`,
        { headers: { lang: langQuery } }
      );
      return data.cities;
    },
  });
};

export default function useGetCities(id?: number) {
  const locale = useLocale();
  return useQuery(getCitiesOptions(id, locale));
}
