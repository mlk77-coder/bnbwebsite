'use client';

import AddCommentForm from '@/features/products/client/social/add-comment-form';
import CommentItem from '@/features/products/client/social/comment-item';
import { ProductCommentsData } from '@/types/product-social';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

type PropsType = {
  productId: number;
  token: string;
  isLoggedIn: boolean;
  commentsData: ProductCommentsData;
  userName?: string;
  userAvatar?: string | null;
};

const ProductCommentsSection: FC<PropsType> = ({
  productId,
  token,
  isLoggedIn,
  commentsData,
  userName,
  userAvatar,
}) => {
  const t = useTranslations();
  const { comments } = commentsData;

  return (
    <section className='w-full space-y-4'>
      <div className='max-h-[min(420px,50vh)] space-y-1 overflow-y-auto pe-1'>
        {comments.length > 0 ? (
          comments.map(item => (
            <CommentItem
              key={item.id}
              comment={item}
              productId={productId}
              token={token}
              canDelete={isLoggedIn}
            />
          ))
        ) : (
          <p className='bg-muted/50 text-muted-foreground rounded-2xl px-4 py-8 text-center text-sm'>
            {t('product-social.empty-comments')}
          </p>
        )}
      </div>

      <AddCommentForm
        productId={productId}
        token={token}
        isLoggedIn={isLoggedIn}
        userName={userName}
        userAvatar={userAvatar}
      />
    </section>
  );
};

export default ProductCommentsSection;
