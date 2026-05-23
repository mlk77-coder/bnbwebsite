'use client';

import { cn, formatLocaleNumber } from '@/lib/utils';
import { ProductCard as ProductCardType } from '@/types/products';
import { Heart } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { FC } from 'react';

type PropsType = {
  product: ProductCardType;
  className?: string;
};

/** Likes count + liked state from listing API (`likes_count`, `is_liked`). */
const ProductLikeBadge: FC<PropsType> = ({ product, className }) => {
  const locale = useLocale();
  const t = useTranslations('product-social');
  const likesCount = product.likes_count ?? 0;
  const isLiked = Boolean(product.is_liked);
  const likeWord = likesCount === 1 ? t('like-singular') : t('like-plural');
  const count = formatLocaleNumber(likesCount, locale);
  const ariaLabel = isLiked
    ? `${count} ${likeWord}, ${t('you-liked')}`
    : `${count} ${likeWord}`;

  return (
    <div
      className={cn(
        'pointer-events-none absolute start-2.5 bottom-2.5 z-10 flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-sm',
        isLiked ? 'bg-red-500/85' : 'bg-black/55',
        className
      )}
      aria-label={ariaLabel}
    >
      <Heart
        className={cn('size-3.5 shrink-0', isLiked && 'fill-white text-white')}
        aria-hidden
      />
      <span className='tabular-nums'>
        {formatLocaleNumber(likesCount, locale)}
      </span>
    </div>
  );
};

export default ProductLikeBadge;
