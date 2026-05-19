import { mapApiReelComments } from '@/features/reels/lib/reel-social-mappers';
import { fetcher } from '@/lib/fetcher';
import {
  GetReelCommentsResponse,
  ReelCommentsData,
} from '@/types/reel-social';

export const getReelComments = async (
  reelId: number,
  locale: string,
  token: string = '',
  request?: Request
) => {
  const headers: HeadersInit = token
    ? { authorization: `Bearer ${token}` }
    : {};

  const response = await fetcher<GetReelCommentsResponse>(
    `reels/${reelId}/comments`,
    locale,
    { headers, cache: 'no-cache' },
    false,
    request
  );

  if (!response.ok) return response;

  const { data: comments, meta } = response.data.data;

  const result: ReelCommentsData = {
    comments: mapApiReelComments(comments ?? []),
    comments_count: meta?.total ?? comments?.length ?? 0,
  };

  return {
    ...response,
    data: result,
  };
};
