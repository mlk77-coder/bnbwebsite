import { mapReelsResponse } from '@/features/reels/lib/reel-mappers';
import { fetcher } from '@/lib/fetcher';
import type { GetApiReelsResponse } from '@/types/reels';

const buildQueryString = (params: Record<string, string> = {}) => {
  const query = new URLSearchParams(params).toString();
  return query ? `?${query}` : '';
};

const authOptions = (token?: string): RequestInit | undefined =>
  token ? { headers: { authorization: `Bearer ${token}` } } : undefined;

export const getReels = async (
  params: Record<string, string> = {},
  locale: string = 'en',
  request?: Request,
  token?: string
) => {
  const query = buildQueryString(params);
  const path = `reels${query}`;
  const response = await fetcher<GetApiReelsResponse>(
    path,
    locale,
    authOptions(token),
    false,
    request
  );

  if (!response.ok) return response;

  return {
    ...response,
    data: mapReelsResponse(
      response.data.data.data,
      response.data.data.meta,
      path
    ),
  };
};
