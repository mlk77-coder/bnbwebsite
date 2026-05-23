'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ReelFeaturedProduct from '@/features/reels/client/reel-featured-product';
import ReelViewerSocial from '@/features/reels/client/reel-viewer-social';
import {
  getReelPreloadLevel,
  shouldMountReelVideoSrc,
} from '@/features/reels/lib/reel-video-prefetch';
import { cn } from '@/lib/utils';
import type { ReelCard as ReelCardType } from '@/types/reels';
import { UserRound, Volume2, VolumeX } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC, useEffect, useRef, useState } from 'react';

type PropsType = {
  reel: ReelCardType;
  isActive: boolean;
  isMobile: boolean;
  slideIndex: number;
  activeIndex: number;
  onVideoInteract?: () => void;
};

export const ReelsViewerVideo: FC<PropsType> = ({
  reel,
  isActive,
  isMobile,
  slideIndex,
  activeIndex,
  onVideoInteract,
}) => {
  const tA11y = useTranslations('accessibility');
  const videoRef = useRef<HTMLVideoElement>(null);
  /** Stays true until the browser blocks unmuted autoplay once. */
  const preferSoundRef = useRef(true);
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(false);
  const loadVideo = shouldMountReelVideoSrc(slideIndex, activeIndex);
  const preload = getReelPreloadLevel(slideIndex, activeIndex);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.currentTime = 0;
      setPaused(false);

      const startWithSound = preferSoundRef.current;
      video.muted = !startWithSound;
      setMuted(!startWithSound);

      video.play().catch(() => {
        if (startWithSound) {
          preferSoundRef.current = false;
          video.muted = true;
          setMuted(true);
          video.play().catch(() => setPaused(true));
        } else {
          setPaused(true);
        }
      });
    } else {
      video.pause();
      video.currentTime = 0;
      setPaused(false);
    }
  }, [isActive]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    onVideoInteract?.();

    if (video.muted) {
      preferSoundRef.current = true;
      video.muted = false;
      setMuted(false);
    }

    if (video.paused) {
      video.play().then(() => setPaused(false)).catch(() => {});
    } else {
      video.pause();
      setPaused(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    preferSoundRef.current = !nextMuted;
    video.muted = nextMuted;
    setMuted(nextMuted);
  };

  return (
    <>
      <video
        ref={videoRef}
        src={loadVideo ? reel.videoUrl : undefined}
        poster={reel.thumbnailUrl}
        preload={preload}
        className={cn(
          'size-full',
          isMobile ? 'object-cover' : 'object-contain'
        )}
        playsInline
        loop
        muted={muted}
        onClick={togglePlayback}
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
      />

      {paused && isActive ? (
        <button
          type='button'
          onClick={togglePlayback}
          className='absolute inset-0 z-10 flex items-center justify-center'
          aria-label={tA11y('play')}
        >
          <span className='rounded-full bg-black/40 p-5 backdrop-blur-sm'>
            <svg viewBox='0 0 24 24' className='size-10 fill-white text-white'>
              <path d='M8 5v14l11-7z' />
            </svg>
          </span>
        </button>
      ) : null}

      <button
        type='button'
        onClick={e => {
          e.stopPropagation();
          toggleMute();
        }}
        className={cn(
          'absolute z-20 rounded-full bg-black/40 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/60',
          isMobile ? 'end-4 top-20' : 'end-3 top-3'
        )}
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? (
          <VolumeX className='size-4' aria-hidden />
        ) : (
          <Volume2 className='size-4' aria-hidden />
        )}
      </button>
    </>
  );
};

type SlideProps = {
  reel: ReelCardType;
  isActive: boolean;
  isMobile: boolean;
  slideIndex: number;
  activeIndex: number;
  onNavigate?: () => void;
};

export const ReelsViewerSlide: FC<SlideProps> = ({
  reel,
  isActive,
  isMobile,
  slideIndex,
  activeIndex,
  onNavigate,
}) => {
  const [commentsOpen, setCommentsOpen] = useState(false);

  useEffect(() => {
    if (!isActive) setCommentsOpen(false);
  }, [isActive]);

  const handleVideoInteract = () => {
    if (commentsOpen) setCommentsOpen(false);
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-black',
        isMobile
          ? 'size-full'
          : 'aspect-[9/16] h-full max-h-[min(calc(100dvh-6rem),900px)] w-auto rounded-2xl shadow-2xl ring-1 ring-white/10'
      )}
    >
      <ReelsViewerVideo
        reel={reel}
        isActive={isActive}
        isMobile={isMobile}
        slideIndex={slideIndex}
        activeIndex={activeIndex}
        onVideoInteract={handleVideoInteract}
      />

      <div className='pointer-events-none absolute inset-0 flex flex-col justify-end'>
        <div className='bg-linear-to-t from-black/95 via-black/60 to-transparent px-4 pt-24 pb-6 md:px-5 md:pb-5'>
          <div className='pointer-events-auto space-y-3'>
            {reel.seller ? (
              <div className='flex items-center gap-2.5'>
                <Avatar className='size-9 border border-white/25'>
                  {reel.seller.avatar ? (
                    <AvatarImage
                      src={reel.seller.avatar}
                      alt={reel.seller.name}
                    />
                  ) : null}
                  <AvatarFallback className='bg-white/15 text-white'>
                    <UserRound className='size-4' />
                  </AvatarFallback>
                </Avatar>
                <span className='text-sm font-semibold text-white'>
                  {reel.seller.name}
                </span>
              </div>
            ) : null}

            {reel.caption ? (
              <p
                className={cn(
                  'leading-relaxed text-white/90',
                  isMobile ? 'line-clamp-3 text-sm' : 'line-clamp-2 text-sm'
                )}
              >
                {reel.caption}
              </p>
            ) : null}

            <ReelViewerSocial
              reel={reel}
              isActive={isActive}
              commentsOpen={commentsOpen}
              onCommentsOpenChange={setCommentsOpen}
            />

            {reel.product ? (
              <ReelFeaturedProduct
                product={reel.product}
                variant='viewer'
                className={isMobile ? 'p-2.5' : undefined}
                onNavigate={onNavigate}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
