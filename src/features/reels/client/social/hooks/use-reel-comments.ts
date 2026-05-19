'use client';

import { getReelComments } from '@/features/reels/api/get-reel-comments';
import { normalizeReelCommentsData } from '@/features/reels/lib/normalize-reel-comments-data';
import { ReelCommentsData } from '@/types/reel-social';
import { useQuery } from '@tanstack/react-query';

export const useReelComments = (
  reelId: number,
  token: string,
  locale: string,
  initialComments: ReelCommentsData['comments'],
  initialCount: number,
  enabled = true
) => {
  const placeholderData = normalizeReelCommentsData(
    initialComments,
    initialCount
  );
  const hasPrefetchedComments = initialComments.length > 0;

  return useQuery({
    queryKey: ['reel-comments', reelId, token],
    queryFn: async () => {
      const response = await getReelComments(reelId, locale, token);
      if (response.ok) return response.data;
      return placeholderData;
    },
    ...(hasPrefetchedComments
      ? { initialData: placeholderData, staleTime: 30_000 }
      : { placeholderData, staleTime: 0 }),
    enabled,
    refetchOnMount: true,
  });
};
