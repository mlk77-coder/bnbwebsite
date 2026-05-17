'use client';

import { cn, formatLocaleNumber } from '@/lib/utils';
import { ProductCard as ProductCardType } from '@/types/products';
import { Heart, MessageCircle } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { FC } from 'react';

type PropsType = {
  product: ProductCardType;
  className?: string;
};

/** Read-only social counts from listing API (`ApiProduct`). */
const ProductSocialStats: FC<PropsType> = ({ product, className }) => {
  const t = useTranslations();
  const locale = useLocale();
  const likesCount = product.likes_count ?? 0;
  const commentsCount = product.comments_count ?? 0;
  const isLiked = Boolean(product.is_liked);

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-3 gap-y-1 pt-1.5 text-xs',
        className
      )}
    >
      <span
        className={cn(
          'flex items-center gap-1 font-medium',
          isLiked ? 'text-red-500' : 'text-muted-foreground'
        )}
      >
        <Heart
          className={cn('size-3.5', isLiked && 'fill-red-500 text-red-500')}
          aria-hidden
        />
        <span className='tabular-nums'>
          {formatLocaleNumber(likesCount, locale)}
        </span>
        <span className='font-normal'>
          {isLiked
            ? t('product-social.you-liked')
            : likesCount === 1
              ? t('product-social.like-singular')
              : t('product-social.like-plural')}
        </span>
      </span>

      {commentsCount > 0 && (
        <span className='text-muted-foreground flex items-center gap-1'>
          <MessageCircle className='size-3.5' aria-hidden />
          <span className='tabular-nums'>
            {formatLocaleNumber(commentsCount, locale)}
          </span>
        </span>
      )}
    </div>
  );
};

export default ProductSocialStats;
