'use client';

import { cn, formatLocaleNumber } from '@/lib/utils';
import type { ReelCard as ReelCardType } from '@/types/reels';
import { Eye, Heart, MessageCircle } from 'lucide-react';
import { useLocale } from 'next-intl';
import { FC } from 'react';

type PropsType = {
  reel: ReelCardType;
  className?: string;
  variant?: 'overlay' | 'inline';
};

const ReelStats: FC<PropsType> = ({
  reel,
  className,
  variant = 'inline',
}) => {
  const locale = useLocale();
  const isOverlay = variant === 'overlay';

  const itemClass = cn(
    'flex items-center gap-1.5 font-medium tabular-nums',
    isOverlay ? 'text-sm text-white' : 'text-muted-foreground text-sm'
  );

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-4 gap-y-2',
        className
      )}
    >
      <span className={itemClass}>
        <Eye className='size-4' aria-hidden />
        {formatLocaleNumber(reel.viewsCount, locale)}
      </span>
      <span
        className={cn(itemClass, reel.isLiked && !isOverlay && 'text-red-500')}
      >
        <Heart
          className={cn(
            'size-4',
            reel.isLiked &&
              (isOverlay ? 'fill-red-400 text-red-400' : 'fill-red-500 text-red-500')
          )}
          aria-hidden
        />
        {formatLocaleNumber(reel.likesCount, locale)}
      </span>
      <span className={itemClass}>
        <MessageCircle className='size-4' aria-hidden />
        {formatLocaleNumber(reel.commentsCount, locale)}
      </span>
    </div>
  );
};

export default ReelStats;
