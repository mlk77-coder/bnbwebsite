import { resolveMediaUrl } from '@/lib/resolve-media-url';
import type { ApiReelComment, ReelComment } from '@/types/reel-social';

export function normalizeReelLikes(data: {
  likes_count: number;
  is_liked?: boolean;
  liked?: boolean;
}): { likes_count: number; is_liked: boolean } {
  return {
    likes_count: data.likes_count ?? 0,
    is_liked: Boolean(data.is_liked ?? data.liked),
  };
}

export function mapApiReelComment(comment: ApiReelComment): ReelComment {
  return {
    id: comment.id,
    body: comment.comment ?? comment.body ?? '',
    userId: comment.user.id,
    userName: comment.user.name,
    userAvatar: comment.user.avatar
      ? resolveMediaUrl(comment.user.avatar)
      : null,
    createdAt: comment.created_at,
    isMine: Boolean(comment.is_mine),
  };
}

export function mapApiReelComments(comments: ApiReelComment[]): ReelComment[] {
  return (comments ?? []).map(mapApiReelComment);
}
