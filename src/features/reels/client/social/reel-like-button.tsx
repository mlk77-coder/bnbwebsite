'use client';

import { getReelLikes } from '@/features/reels/api/get-reel-likes';
import useToggleReelLike from '@/features/reels/client/social/hooks/use-toggle-reel-like';
import Loader from '@/components/ui/loader';
import { cn, formatLocaleNumber } from '@/lib/utils';
import { ReelLikesData } from '@/types/reel-social';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';
import { FC, MouseEvent } from 'react';

type PropsType = {
  reelId: number;
  token: string;
  isLoggedIn: boolean;
  initialLikes: ReelLikesData;
  variant?: 'default' | 'overlay' | 'compact';
  className?: string;
  showLabel?: boolean;
};

const ReelLikeButton: FC<PropsType> = ({
  reelId,
  token,
  isLoggedIn,
  initialLikes,
  variant = 'default',
  className,
  showLabel = true,
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const queryKey = ['reel-likes', reelId, token];
  const isOverlay = variant === 'overlay';
  const isCompact = variant === 'compact';

  const { data: likes = initialLikes } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getReelLikes(reelId, locale, token);
      if (response.ok) return response.data;
      return initialLikes;
    },
    initialData: initialLikes,
    staleTime: 30_000,
  });

  const { toggleLike, isPending } = useToggleReelLike(
    reelId,
    token,
    initialLikes
  );

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      router.push(
        `/login?${new URLSearchParams({ callbackUrl: pathname || '/' }).toString()}`
      );
      return;
    }
    toggleLike();
  };

  if (isCompact || isOverlay) {
    return (
      <button
        type='button'
        onClick={handleClick}
        disabled={isPending}
        className={cn(
          'flex items-center gap-1.5 font-medium transition-colors outline-none disabled:opacity-60',
          isOverlay ? 'text-sm text-white' : 'text-muted-foreground text-sm',
          likes.is_liked && !isOverlay && 'text-red-500',
          className
        )}
        aria-pressed={likes.is_liked}
        aria-label={
          likes.is_liked ? t('product-social.unlike') : t('product-social.like')
        }
      >
        {isPending ? (
          <Loader className='size-4' />
        ) : (
          <Heart
            className={cn(
              'size-4 transition-colors',
              likes.is_liked &&
                (isOverlay
                  ? 'fill-red-400 text-red-400'
                  : 'fill-red-500 text-red-500')
            )}
            aria-hidden
          />
        )}
        <span className='tabular-nums'>
          {formatLocaleNumber(likes.likes_count, locale)}
        </span>
      </button>
    );
  }

  return (
    <motion.button
      type='button'
      onClick={handleClick}
      disabled={isPending}
      whileTap={{ scale: 0.88 }}
      className={cn(
        'group focus-visible:ring-primary/40 flex items-center gap-2 rounded-full transition-colors outline-none focus-visible:ring-2',
        className
      )}
      aria-pressed={likes.is_liked}
      aria-label={
        likes.is_liked ? t('product-social.unlike') : t('product-social.like')
      }
    >
      <span
        className={cn(
          'flex size-10 items-center justify-center rounded-full transition-colors',
          likes.is_liked ? 'bg-red-500/10' : 'bg-muted/80 group-hover:bg-muted'
        )}
      >
        {isPending ? (
          <Loader className='size-5' />
        ) : (
          <motion.span
            key={likes.is_liked ? 'liked' : 'unliked'}
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 18 }}
          >
            <Heart
              className={cn(
                'size-5 transition-colors',
                likes.is_liked ? 'fill-red-500 text-red-500' : 'text-foreground'
              )}
            />
          </motion.span>
        )}
      </span>
      <span className='text-sm font-semibold tabular-nums'>
        {formatLocaleNumber(likes.likes_count, locale)}
      </span>
      {showLabel ? (
        <span className='text-muted-foreground text-sm'>
          {likes.likes_count === 1
            ? t('product-social.like-singular')
            : t('product-social.like-plural')}
        </span>
      ) : null}
    </motion.button>
  );
};

export default ReelLikeButton;
