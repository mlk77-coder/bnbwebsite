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
  body: string;
  user: {
    id: number;
    name: string;
    avatar: string | null;
  };
  created_at: string;
  is_mine?: boolean;
};

export type ProductComment = {
  id: number;
  body: string;
  userId: number;
  userName: string;
  userAvatar: string | null;
  createdAt: string;
  isMine: boolean;
};

export type GetProductCommentsResponse = ApiResponse & {
  data: ApiProductComment[];
  comments_count: number;
};

export type ProductCommentsData = {
  comments: ProductComment[];
  comments_count: number;
};
