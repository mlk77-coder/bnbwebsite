'use client';

import ProductCommentsSection from '@/features/products/client/social/product-comments-section';
import ProductLikeButton from '@/features/products/client/social/product-like-button';
import { Separator } from '@/components/ui/separator';
import { ProductComment, ProductLikesData } from '@/types/product-social';
import { MessageCircle } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { FC } from 'react';

type PropsType = {
  productId: number;
  token: string;
  isLoggedIn: boolean;
  initialLikes: ProductLikesData;
  initialComments: ProductComment[];
  commentsCount: number;
  currentUserId?: number | string;
  userName?: string;
  userAvatar?: string | null;
};

const ProductSocialPanel: FC<PropsType> = ({
  productId,
  token,
  isLoggedIn,
  initialLikes,
  initialComments,
  commentsCount,
  currentUserId,
  userName,
  userAvatar,
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const displayCommentsCount = commentsCount;

  return (
    <div className='border-border bg-secondary/20 w-full space-y-5 rounded-2xl border p-4 sm:p-5'>
      <div className='flex flex-wrap items-center gap-4 sm:gap-6'>
        <ProductLikeButton
          productId={productId}
          token={token}
          isLoggedIn={isLoggedIn}
          initialLikes={initialLikes}
        />
        <div className='text-muted-foreground flex items-center gap-2'>
          <span className='bg-muted flex size-10 items-center justify-center rounded-full'>
            <MessageCircle className='text-foreground size-5' />
          </span>
          <span className='text-sm font-semibold tabular-nums'>
            {displayCommentsCount.toLocaleString(locale)}
          </span>
          <span className='text-sm'>
            {displayCommentsCount === 1
              ? t('product-social.comment-singular')
              : t('product-social.comment-plural')}
          </span>
        </div>
      </div>

      <Separator />

      <ProductCommentsSection
        productId={productId}
        token={token}
        isLoggedIn={isLoggedIn}
        initialComments={initialComments}
        commentsCount={displayCommentsCount}
        currentUserId={currentUserId}
        userName={userName}
        userAvatar={userAvatar}
      />
    </div>
  );
};

export default ProductSocialPanel;
