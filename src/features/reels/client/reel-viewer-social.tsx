'use client';

import ReelSocialPanel from '@/features/reels/components/reel-social-panel';
import { useAuthToken } from '@/hooks/use-auth-token';
import type { ReelCard as ReelCardType } from '@/types/reels';
import { useLocale } from 'next-intl';
import { FC } from 'react';

type PropsType = {
  reel: ReelCardType;
  isActive: boolean;
  commentsOpen: boolean;
  onCommentsOpenChange: (open: boolean) => void;
};

const ReelViewerSocial: FC<PropsType> = ({
  reel,
  isActive,
  commentsOpen,
  onCommentsOpenChange,
}) => {
  const locale = useLocale();
  const { token, isLoggedIn, userName, userAvatar } = useAuthToken();

  if (!isActive) return null;

  return (
    <ReelSocialPanel
      reelId={reel.id}
      token={token}
      locale={locale}
      isLoggedIn={isLoggedIn}
      initialLikes={{
        likes_count: reel.likesCount,
        is_liked: reel.isLiked,
      }}
      initialComments={[]}
      commentsCount={reel.commentsCount}
      viewsCount={reel.viewsCount}
      userName={userName}
      userAvatar={userAvatar}
      variant='viewer'
      commentsOpen={commentsOpen}
      onCommentsOpenChange={onCommentsOpenChange}
    />
  );
};

export default ReelViewerSocial;
