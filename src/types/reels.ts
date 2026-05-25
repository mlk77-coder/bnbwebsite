import type { ApiPaginatedData, Pagination } from '@/types';

export type ApiReelProduct = {
  id: number;
  name: string;
  price: string;
  original_price: string;
  sale_price?: string;
  image: string;
};

export type ApiReelSeller = {
  id: number;
  name: string;
  avatar: string | null;
};

export type ApiReel = {
  id: number;
  video_url: string;
  thumbnail_url: string;
  title?: string;
  description?: string;
  caption: string;
  duration: number;
  views_count: number;
  likes_count: number;
  comments_count: number;
  is_liked: boolean;
  is_saved?: boolean;
  product_id: number | null;
  product: ApiReelProduct | null;
  seller: ApiReelSeller | null;
  created_at: string;
};

export type ReelProduct = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  salePrice: number | null;
  image: string;
};

export type ReelSeller = {
  id: number;
  name: string;
  avatar: string | null;
};

export type ReelCard = {
  id: number;
  videoUrl: string;
  thumbnailUrl: string;
  caption: string;
  duration: number;
  viewsCount: number;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  product: ReelProduct | null;
  seller: ReelSeller | null;
  createdAt: string;
};

export type ReelDetails = ReelCard;

export type GetReelsResponse = {
  success: true;
  message: string;
  reels: ReelCard[];
  pagination: Pagination;
};

export type GetApiReelsResponse = {
  success: boolean;
  data: ApiPaginatedData<ApiReel>;
};

export type GetApiReelDetailsResponse = {
  success: boolean;
  data: ApiReel;
};
