import {
  mapApiReelComments,
  normalizeReelLikes,
} from '@/features/reels/lib/reel-social-mappers';
import { fetcher } from '@/lib/fetcher';
import {
  GetReelLikesResponse,
  ReelLikesData,
} from '@/types/reel-social';

export const getReelLikes = async (
  reelId: number,
  locale: string,
  token: string = '',
  request?: Request
) => {
  const headers: HeadersInit = token
    ? { authorization: `Bearer ${token}` }
    : {};

  const response = await fetcher<GetReelLikesResponse>(
    `reels/${reelId}/likes`,
    locale,
    { headers, cache: 'no-cache' },
    false,
    request
  );

  if (!response.ok) return response;

  return {
    ...response,
    data: normalizeReelLikes(response.data.data) satisfies ReelLikesData,
  };
};
