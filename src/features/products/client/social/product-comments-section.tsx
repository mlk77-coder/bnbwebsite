'use client';

import { getProductComments } from '@/features/products/api/get-product-comments';
import AddCommentForm from '@/features/products/client/social/add-comment-form';
import CommentItem from '@/features/products/client/social/comment-item';
import { Separator } from '@/components/ui/separator';
import { ProductComment, ProductCommentsData } from '@/types/product-social';
import { useQuery } from '@tanstack/react-query';
import { MessageCircle } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { FC } from 'react';

type PropsType = {
  productId: number;
  token: string;
  isLoggedIn: boolean;
  initialComments: ProductComment[];
  commentsCount: number;
  currentUserId?: number | string;
  userName?: string;
  userAvatar?: string | null;
};

const ProductCommentsSection: FC<PropsType> = ({
  productId,
  token,
  isLoggedIn,
  initialComments,
  commentsCount,
  currentUserId,
  userName,
  userAvatar,
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const queryKey = ['product-comments', productId, token];

  const initialData: ProductCommentsData = {
    comments: initialComments,
    comments_count: commentsCount,
  };

  const { data = initialData, isPending } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getProductComments(productId, locale, token);
      if (response.ok) return response.data;
      return initialData;
    },
    initialData,
    staleTime: 30_000,
  });

  const { comments, comments_count: totalCount } = data;

  return (
    <section className='border-border w-full space-y-4 border-t pt-5'>
      <div className='flex items-center justify-between gap-3'>
        <div className='flex items-center gap-2.5'>
          <span className='bg-primary/10 text-primary flex size-10 items-center justify-center rounded-2xl'>
            <MessageCircle className='size-5' />
          </span>
          <div>
            <h2 className='text-foreground text-lg font-semibold'>
              {t('product-social.comments-title')}
            </h2>
            <p className='text-muted-foreground text-sm'>
              {t('product-social.comments-count', { count: totalCount })}
            </p>
          </div>
        </div>
      </div>

      <Separator />

      <div className='max-h-[min(420px,50vh)] space-y-1 overflow-y-auto pe-1'>
        {isPending && comments.length === 0 ? (
          <p className='text-muted-foreground py-6 text-center text-sm'>
            {t('product-social.loading-comments')}
          </p>
        ) : comments.length > 0 ? (
          comments.map(item => (
            <CommentItem
              key={item.id}
              comment={item}
              productId={productId}
              token={token}
              currentUserId={currentUserId}
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
