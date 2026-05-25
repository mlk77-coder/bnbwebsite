import { ReelCommentsData } from '@/types/reel-social';

export function normalizeReelCommentsData(
  comments: ReelCommentsData['comments'],
  commentsCount: number
): ReelCommentsData {
  return {
    comments,
    comments_count: Math.max(commentsCount, comments.length),
  };
}
