import { mapApiReelDetails } from '@/features/reels/lib/reel-mappers';
import { fetcher } from '@/lib/fetcher';
import type { GetApiReelDetailsResponse } from '@/types/reels';

const authOptions = (token?: string): RequestInit | undefined =>
  token ? { headers: { authorization: `Bearer ${token}` } } : undefined;

export const getReelDetails = async (
  reelId: string,
  locale: string = 'en',
  request?: Request,
  token?: string
) => {
  const path = `reels/${reelId}`;
  const response = await fetcher<GetApiReelDetailsResponse>(
    path,
    locale,
    authOptions(token),
    false,
    request
  );

  if (!response.ok) return response;

  return {
    ...response,
    data: mapApiReelDetails(response.data.data),
  };
};
