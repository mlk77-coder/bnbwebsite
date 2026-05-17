import { ApiResponse } from '.';

export type ProductLikesData = {
  likes_count: number;
  is_liked: boolean;
};

export type GetProductLikesResponse = ApiResponse & {
  data: {
    likes_count: number;
    is_liked?: boolean;
    liked?: boolean;
  };
};

export type ApiProductComment = {
  id: number;
  comment: string;
  user: {
    id: number;
    name: string;
    avatar: string | null;
  };
  created_at: string;
};

export type ProductComment = {
  id: number;
  comment: string;
  userId: number;
  userName: string;
  userAvatar: string | null;
  createdAt: string;
};

export type GetProductCommentsResponse = ApiResponse & {
  data: ApiProductComment[];
  comments_count: number;
};

export type ProductCommentsData = {
  comments: ProductComment[];
  comments_count: number;
};
