'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ReelFeaturedProduct from '@/features/reels/client/reel-featured-product';
import ReelStats from '@/features/reels/client/reel-stats';
import { formatReelDuration } from '@/features/reels/lib/reel-mappers';
import { prefetchReelVideo } from '@/features/reels/lib/reel-video-prefetch';
import { cn } from '@/lib/utils';
import { Link } from '@/navigation';
import type { ReelCard as ReelCardType } from '@/types/reels';
import { Maximize2, Play, UserRound } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';

type PropsType = {
  reel: ReelCardType;
  className?: string;
  priority?: boolean;
  onOpen?: (reelId: number) => void;
};

const ReelCard: FC<PropsType> = ({
  reel,
  className,
  priority = false,
  onOpen,
}) => {
  const t = useTranslations('reels');

  const handleOpen = () => onOpen?.(reel.id);
  const handlePrefetch = () => prefetchReelVideo(reel.videoUrl);

  return (
    <article className={cn('group relative', className)}>
      <Link
        href={`/reels/${reel.id}`}
        className='absolute start-2.5 top-2.5 z-30 inline-flex items-center gap-1 rounded-full border border-white/25 bg-black/55 px-2 py-1 text-[10px] font-semibold text-white shadow-lg backdrop-blur-md transition-all hover:scale-[1.03] hover:border-white/40 hover:bg-black/75 active:scale-95 sm:gap-1.5 sm:px-2.5 sm:py-1.5'
        aria-label={t('view-details')}
      >
        <Maximize2 className='size-3 shrink-0 sm:size-3.5' aria-hidden />
        <span className='leading-none'>{t('card-details')}</span>
      </Link>

      <div className='relative aspect-[9/16] overflow-hidden rounded-2xl bg-black shadow-md transition-shadow duration-300 group-hover:shadow-xl'>
        <Image
          src={reel.thumbnailUrl || '/no-product.svg'}
          alt={reel.caption || t('reel-fallback-title')}
          fill
          priority={priority}
          sizes='(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 220px'
          className='object-cover transition-transform duration-500 ease-out group-hover:scale-105'
        />

        <div className='pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/10' />

        <span className='pointer-events-none absolute end-2.5 top-2.5 z-20 rounded-md bg-black/60 px-1.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm tabular-nums'>
          {formatReelDuration(reel.duration)}
        </span>

        <button
          type='button'
          onClick={handleOpen}
          onMouseEnter={handlePrefetch}
          onFocus={handlePrefetch}
          className='absolute inset-0 z-10 flex cursor-pointer items-center justify-center border-0 bg-transparent p-0 outline-none focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2'
          aria-label={t('open-reel')}
        >
          <div className='rounded-full bg-white/20 p-3 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100'>
            <Play className='size-7 fill-white text-white' aria-hidden />
          </div>
        </button>

        <div className='pointer-events-none absolute inset-x-0 bottom-0 z-20 space-y-2 p-2.5 sm:space-y-2.5 sm:p-3'>
          {reel.seller ? (
            <div className='flex items-center gap-2'>
              <Avatar className='size-7 border border-white/30'>
                {reel.seller.avatar ? (
                  <AvatarImage
                    src={reel.seller.avatar}
                    alt={reel.seller.name}
                  />
                ) : null}
                <AvatarFallback className='bg-white/20 text-[10px] text-white'>
                  <UserRound className='size-3.5' />
                </AvatarFallback>
              </Avatar>
              <span className='line-clamp-1 text-xs font-medium text-white'>
                {reel.seller.name}
              </span>
            </div>
          ) : null}

          {reel.caption ? (
            <p className='line-clamp-1 text-xs leading-snug text-white/90 sm:line-clamp-2'>
              {reel.caption}
            </p>
          ) : null}

          <div className='pointer-events-auto'>
            <ReelStats reel={reel} variant='overlay' interactive />
          </div>

          {reel.product ? (
            <div className='pointer-events-auto'>
              <ReelFeaturedProduct product={reel.product} variant='overlay' />
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default ReelCard;
