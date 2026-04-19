import { queryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const GetFavoriteIdsOptions = (token: string) => {
  return queryOptions({
    queryKey: ["favorite-ids", token],
    staleTime: Infinity,
    queryFn: async () => {
      const { data } = await axios.get<number[]>("/api/favorite");
      return data;
    },
  });
};

const useGetFavoriteIds = (token: string) => {
  return useQuery(GetFavoriteIdsOptions(token));
};

export default useGetFavoriteIds;
