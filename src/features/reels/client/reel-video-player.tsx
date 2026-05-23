'use client';

import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC, useRef, useState } from 'react';

type PropsType = {
  videoUrl: string;
  thumbnailUrl: string;
  caption: string;
  className?: string;
};

const ReelVideoPlayer: FC<PropsType> = ({
  videoUrl,
  thumbnailUrl,
  caption,
  className,
}) => {
  const tA11y = useTranslations('accessibility');
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      className={cn(
        'relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-black shadow-lg',
        className
      )}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        poster={thumbnailUrl}
        className='size-full object-cover'
        controls
        playsInline
        preload='metadata'
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClick={togglePlayback}
      >
        {caption}
      </video>

      {!isPlaying ? (
        <button
          type='button'
          onClick={togglePlayback}
          className='absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity hover:bg-black/30'
          aria-label={tA11y('play-video')}
        >
          <div className='rounded-full bg-black/50 p-4 backdrop-blur-sm'>
            <Play className='size-10 fill-white text-white' aria-hidden />
          </div>
        </button>
      ) : null}
    </div>
  );
};

export default ReelVideoPlayer;
