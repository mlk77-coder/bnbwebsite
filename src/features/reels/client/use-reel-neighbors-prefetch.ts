'use client';

import {
  clearReelVideoPrefetchCache,
  prefetchReelNeighbors,
} from '@/features/reels/lib/reel-video-prefetch';
import type { ReelCard } from '@/types/reels';
import { useEffect } from 'react';

/** Prefetches adjacent reel videos whenever the active index changes. */
export function useReelNeighborsPrefetch(
  reels: ReelCard[],
  activeIndex: number,
  enabled: boolean
) {
  useEffect(() => {
    if (!enabled || !reels.length) return;
    prefetchReelNeighbors(reels, activeIndex);
  }, [enabled, reels, activeIndex]);

  useEffect(() => {
    if (enabled) return;
    return () => clearReelVideoPrefetchCache();
  }, [enabled]);
}
