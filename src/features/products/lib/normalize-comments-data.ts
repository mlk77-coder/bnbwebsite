import { ProductCommentsData } from '@/types/product-social';

export function normalizeCommentsData(
  comments: ProductCommentsData['comments'],
  commentsCount: number
): ProductCommentsData {
  return {
    comments,
    comments_count: Math.max(commentsCount, comments.length),
  };
}
