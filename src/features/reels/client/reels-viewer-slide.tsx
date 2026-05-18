'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ReelFeaturedProduct from '@/features/reels/client/reel-featured-product';
import ReelStats from '@/features/reels/client/reel-stats';
import { cn } from '@/lib/utils';
import type { ReelCard as ReelCardType } from '@/types/reels';
import { UserRound, Volume2, VolumeX } from 'lucide-react';
import { FC, useEffect, useRef, useState } from 'react';

type PropsType = {
  reel: ReelCardType;
  isActive: boolean;
  isMobile: boolean;
};

export const ReelsViewerVideo: FC<PropsType> = ({
  reel,
  isActive,
  isMobile,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.currentTime = 0;
      setPaused(false);
      video.play().catch(() => setPaused(true));
    } else {
      video.pause();
      video.currentTime = 0;
      setPaused(false);
    }
  }, [isActive]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setPaused(false)).catch(() => {});
    } else {
      video.pause();
      setPaused(true);
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        src={reel.videoUrl}
        poster={reel.thumbnailUrl}
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
          aria-label='Play'
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
          setMuted(prev => !prev);
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
  onNavigate?: () => void;
};

export const ReelsViewerSlide: FC<SlideProps> = ({
  reel,
  isActive,
  isMobile,
  onNavigate,
}) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-black',
        isMobile
          ? 'size-full'
          : 'aspect-[9/16] h-full max-h-[min(calc(100dvh-6rem),900px)] w-auto rounded-2xl shadow-2xl ring-1 ring-white/10'
      )}
    >
      <ReelsViewerVideo reel={reel} isActive={isActive} isMobile={isMobile} />

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

            <ReelStats reel={reel} variant='overlay' />

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
