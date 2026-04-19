import { ApiResponse } from ".";

export type Favorite = {
  id: number;
};

export interface GetFavoriteIdsResponse extends ApiResponse {
  product_ids: number[];
}
