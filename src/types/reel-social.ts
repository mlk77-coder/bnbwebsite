import { ApiPaginatedData, ApiResponse } from '.';

export type ReelLikesData = {
  likes_count: number;
  is_liked: boolean;
};

export type GetReelLikesResponse = ApiResponse & {
  data: {
    likes_count: number;
    is_liked?: boolean;
    liked?: boolean;
  };
};

export type ApiReelComment = {
  id: number;
  body?: string;
  comment?: string;
  user: {
    id: number;
    name: string;
    avatar: string | null;
  };
  created_at: string;
  is_mine?: boolean;
};

export type ReelComment = {
  id: number;
  body: string;
  userId: number;
  userName: string;
  userAvatar: string | null;
  createdAt: string;
  isMine: boolean;
};

export type GetReelCommentsResponse = ApiResponse & {
  data: ApiPaginatedData<ApiReelComment>;
};

export type ReelCommentsData = {
  comments: ReelComment[];
  comments_count: number;
};
