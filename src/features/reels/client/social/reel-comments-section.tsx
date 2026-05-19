'use client';

import ReelAddCommentForm from '@/features/reels/client/social/reel-add-comment-form';
import ReelCommentItem from '@/features/reels/client/social/reel-comment-item';
import Loader from '@/components/ui/loader';
import { cn } from '@/lib/utils';
import { ReelCommentsData } from '@/types/reel-social';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

type PropsType = {
  reelId: number;
  token: string;
  isLoggedIn: boolean;
  commentsData: ReelCommentsData;
  isLoading?: boolean;
  userName?: string;
  userAvatar?: string | null;
  variant?: 'default' | 'overlay';
  className?: string;
};

const ReelCommentsSection: FC<PropsType> = ({
  reelId,
  token,
  isLoggedIn,
  commentsData,
  isLoading = false,
  userName,
  userAvatar,
  variant = 'default',
  className,
}) => {
  const t = useTranslations();
  const { comments } = commentsData;
  const isOverlay = variant === 'overlay';

  return (
    <section className={cn('w-full space-y-3', className)}>
      <div
        className={cn(
          'relative',
          isOverlay
            ? 'rounded-xl bg-black/30 p-1 backdrop-blur-sm'
            : 'rounded-2xl border border-border/60 bg-background/60 p-1'
        )}
      >
        <div
          className={cn(
            'comments-scroll space-y-0.5 overflow-y-auto ps-1 pe-2',
            isOverlay
              ? 'comments-scroll-overlay max-h-[min(240px,32vh)]'
              : 'max-h-[min(420px,50vh)]'
          )}
        >
          {isLoading ? (
            <div className='flex items-center justify-center py-10'>
              <Loader
                className={cn('size-6', isOverlay ? 'text-white' : 'text-primary')}
              />
            </div>
          ) : comments.length > 0 ? (
            comments.map(item => (
              <ReelCommentItem
                key={item.id}
                comment={item}
                reelId={reelId}
                token={token}
                canDelete={isLoggedIn}
                variant={variant}
              />
            ))
          ) : (
            <p
              className={cn(
                'rounded-xl px-4 py-8 text-center text-sm',
                isOverlay
                  ? 'text-white/70'
                  : 'text-muted-foreground'
              )}
            >
              {t('product-social.empty-comments')}
            </p>
          )}
        </div>
      </div>

      <ReelAddCommentForm
        reelId={reelId}
        token={token}
        isLoggedIn={isLoggedIn}
        userName={userName}
        userAvatar={userAvatar}
        variant={variant}
      />
    </section>
  );
};

export default ReelCommentsSection;
