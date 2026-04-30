import { queryOptions, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { GetWishlistResponse } from "@/types/wishlist";

export type WishlistLookup = {
  productIds: number[];
  wishlistItemIdByProductId: Record<number, number>;
};

export const GetFavoriteIdsOptions = (token: string) => {
  return queryOptions({
    queryKey: ["favorite-ids", token],
    staleTime: Infinity,
    queryFn: async () => {
      if (!token) {
        return {
          productIds: [],
          wishlistItemIdByProductId: {},
        } satisfies WishlistLookup;
      }

      const { data } = await axiosInstance.get<GetWishlistResponse>("wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data.data.reduce<WishlistLookup>(
        (acc, item) => {
          acc.productIds.push(item.product.id);
          acc.wishlistItemIdByProductId[item.product.id] = item.id;
          return acc;
        },
        {
          productIds: [],
          wishlistItemIdByProductId: {},
        }
      );
    },
    enabled: Boolean(token),
  });
};

const useGetFavoriteIds = (token: string) => {
  return useQuery(GetFavoriteIdsOptions(token));
};

export default useGetFavoriteIds;
