import { ApiPaginatedData, ApiResponse, ApiResponseWithPagination } from '.';

export type Review = {
  id: number;
  name: string;
  avatar?: string | null;
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

export type ApiReview = {
  id: number;
  user: {
    id: number;
    name: string;
    avatar: string | null;
  };
  rating: number;
  comment: string;
  created_at: string;
};

export type GetApiReviewsResponse = ApiResponse & {
  data: ApiPaginatedData<ApiReview>;
};
