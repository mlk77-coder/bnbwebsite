/** Tracks URLs already queued so we don't duplicate prefetch work. */
const prefetchedUrls = new Set<string>();

/** Hidden elements kept alive briefly so the browser retains buffered bytes. */
const warmVideoElements = new Map<string, HTMLVideoElement>();

export type ReelPreloadLevel = 'none' | 'metadata' | 'auto';

/** How aggressively to load video bytes based on distance from the active slide. */
export function getReelPreloadLevel(
  index: number,
  activeIndex: number
): ReelPreloadLevel {
  const distance = Math.abs(index - activeIndex);
  if (distance === 0) return 'auto';
  if (distance === 1) return 'auto';
  if (distance === 2) return 'metadata';
  return 'none';
}

export function shouldMountReelVideoSrc(
  index: number,
  activeIndex: number
): boolean {
  return Math.abs(index - activeIndex) <= 2;
}

/**
 * Warms the browser cache for a reel MP4 using a muted off-screen video element.
 * Similar in spirit to Instagram's "fetch first few seconds before the user lands".
 */
export function prefetchReelVideo(url: string): void {
  if (!url || typeof window === 'undefined' || prefetchedUrls.has(url)) return;

  prefetchedUrls.add(url);

  const existing = warmVideoElements.get(url);
  if (existing) {
    existing.load();
    return;
  }

  const video = document.createElement('video');
  video.preload = 'auto';
  video.muted = true;
  video.playsInline = true;
  video.setAttribute('aria-hidden', 'true');
  video.style.cssText =
    'position:absolute;width:0;height:0;opacity:0;pointer-events:none';
  video.src = url;
  document.body.appendChild(video);
  video.load();

  warmVideoElements.set(url, video);

  const cleanup = () => {
    video.remove();
    warmVideoElements.delete(url);
  };

  video.addEventListener('canplaythrough', cleanup, { once: true });
  window.setTimeout(cleanup, 60_000);
}

/** Prefetch the active reel's neighbors (and one ahead). */
export function prefetchReelNeighbors(
  reels: { videoUrl: string }[],
  activeIndex: number
): void {
  const indices = [activeIndex, activeIndex + 1, activeIndex - 1, activeIndex + 2];

  for (const index of indices) {
    const reel = reels[index];
    if (reel?.videoUrl) prefetchReelVideo(reel.videoUrl);
  }
}

export function clearReelVideoPrefetchCache(): void {
  prefetchedUrls.clear();
  warmVideoElements.forEach(video => video.remove());
  warmVideoElements.clear();
}
