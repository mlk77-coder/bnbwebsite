'use client';

import ReelCommentsSection from '@/features/reels/client/social/reel-comments-section';
import ReelLikeButton from '@/features/reels/client/social/reel-like-button';
import { useReelComments } from '@/features/reels/client/social/hooks/use-reel-comments';
import { normalizeReelCommentsData } from '@/features/reels/lib/normalize-reel-comments-data';
import { Separator } from '@/components/ui/separator';
import { cn, formatLocaleNumber } from '@/lib/utils';
import { ReelComment, ReelLikesData } from '@/types/reel-social';
import { Eye, MessageCircle } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { FC, useState } from 'react';

type PropsType = {
  reelId: number;
  token: string;
  locale: string;
  isLoggedIn: boolean;
  initialLikes: ReelLikesData;
  initialComments: ReelComment[];
  commentsCount: number;
  viewsCount?: number;
  userName?: string;
  userAvatar?: string | null;
  variant?: 'page' | 'viewer';
  className?: string;
  commentsOpen?: boolean;
  onCommentsOpenChange?: (open: boolean) => void;
};

const ReelSocialPanel: FC<PropsType> = ({
  reelId,
  token,
  locale,
  isLoggedIn,
  initialLikes,
  initialComments,
  commentsCount,
  viewsCount = 0,
  userName,
  userAvatar,
  variant = 'page',
  className,
  commentsOpen: controlledCommentsOpen,
  onCommentsOpenChange,
}) => {
  const t = useTranslations();
  const activeLocale = useLocale();
  const [internalCommentsOpen, setInternalCommentsOpen] = useState(
    variant === 'page'
  );
  const commentsOpen = controlledCommentsOpen ?? internalCommentsOpen;
  const setCommentsOpen = (open: boolean) => {
    onCommentsOpenChange?.(open);
    if (controlledCommentsOpen === undefined) {
      setInternalCommentsOpen(open);
    }
  };
  const isViewer = variant === 'viewer';
  const isOverlay = isViewer;

  const initialCommentsData = normalizeReelCommentsData(
    initialComments,
    commentsCount
  );

  const { data: commentsData = initialCommentsData, isFetching } =
    useReelComments(
    reelId,
    token,
    locale || activeLocale,
    initialComments,
    commentsCount,
    commentsOpen || variant === 'page'
  );

  const displayCommentsCount = commentsData.comments_count;

  return (
    <div
      className={cn(
        isViewer ? 'space-y-3' : 'border-border bg-secondary/20 w-full space-y-5 rounded-2xl border p-4 sm:p-5',
        className
      )}
    >
      <div className='flex flex-wrap items-center gap-4 sm:gap-6'>
        {viewsCount > 0 ? (
          <span
            className={cn(
              'flex items-center gap-1.5 text-sm font-medium tabular-nums',
              isOverlay ? 'text-white' : 'text-muted-foreground'
            )}
          >
            <Eye className='size-4' aria-hidden />
            {formatLocaleNumber(viewsCount, activeLocale)}
          </span>
        ) : null}

        <ReelLikeButton
          reelId={reelId}
          token={token}
          isLoggedIn={isLoggedIn}
          initialLikes={initialLikes}
          variant={isOverlay ? 'overlay' : 'default'}
          showLabel={!isViewer}
        />

        <button
          type='button'
          onClick={e => {
            e.stopPropagation();
            setCommentsOpen(!commentsOpen);
          }}
          className={cn(
            'flex items-center gap-2 transition-colors',
            isOverlay ? 'text-sm text-white' : 'text-muted-foreground'
          )}
        >
          <span
            className={cn(
              'flex size-10 items-center justify-center rounded-full',
              isOverlay ? 'bg-white/10' : 'bg-muted'
            )}
          >
            <MessageCircle
              className={cn('size-5', isOverlay ? 'text-white' : 'text-foreground')}
              aria-hidden
            />
          </span>
          <span className='text-sm font-semibold tabular-nums'>
            {formatLocaleNumber(displayCommentsCount, activeLocale)}
          </span>
          {!isViewer ? (
            <span className='text-sm'>
              {displayCommentsCount === 1
                ? t('product-social.comment-singular')
                : t('product-social.comment-plural')}
            </span>
          ) : null}
        </button>
      </div>

      {commentsOpen ? (
        <>
          {!isViewer ? <Separator /> : null}
          <ReelCommentsSection
            reelId={reelId}
            token={token}
            isLoggedIn={isLoggedIn}
            commentsData={commentsData}
            isLoading={isFetching && commentsData.comments.length === 0}
            userName={userName}
            userAvatar={userAvatar}
            variant={isOverlay ? 'overlay' : 'default'}
          />
        </>
      ) : null}
    </div>
  );
};

export default ReelSocialPanel;
