import { fetcher } from "@/lib/fetcher";
import { GetFavoriteIdsResponse } from "@/types/favorite";

const getFavoriteIds = async (token: string = "", request: any) => {
  const response = await fetcher<GetFavoriteIdsResponse>(
    "favored/product-id",
    "en",
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
0;

export default getFavoriteIds;
