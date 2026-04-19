import axiosInstance from "@/lib/axios";
import { ApiResponse } from "@/types";
import {
  keepPreviousData,
  queryOptions,
  useQuery,
} from "@tanstack/react-query";
import { useLocale } from "next-intl";

export interface GetCountriesResponse extends ApiResponse {
  countries: { id: number; name: string }[];
}

export const getCountriesOptions = (lang?: string) => {
  const langQuery = lang || "en";
  return queryOptions({
    queryKey: ["countries", langQuery],
    placeholderData: keepPreviousData,
    staleTime: Infinity,
    queryFn: async () => {
      const { data } = await axiosInstance.get<GetCountriesResponse>(
        "countries",
        { headers: { lang: langQuery } }
      );
      return data.countries;
    },
  });
};

export default function useGetCountries() {
  const locale = useLocale();
  return useQuery(getCountriesOptions(locale));
}
