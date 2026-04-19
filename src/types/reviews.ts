import { ApiResponseWithPagination } from ".";

export type Review = {
  id: number;
  name: string;
  rate: number;
  comment: string;
  product_id: number;
  created_at: string;
};

export interface GetReviewsResponse extends ApiResponseWithPagination {
  reviews: Review[];
  avg: number;
  reviews_rate_count: {
    rate: number;
    count: number;
  }[];
}
