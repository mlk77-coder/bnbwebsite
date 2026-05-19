'use client';

import { getProductLikes } from '@/features/products/api/get-product-likes';
import useToggleProductLike from '@/features/products/client/social/hooks/use-toggle-product-like';
import Loader from '@/components/ui/loader';
import { CustomSession } from '@/lib/auth-options';
import { cn, formatLocaleNumber } from '@/lib/utils';
import { ProductCard as ProductCardType } from '@/types/products';
import { ProductLikesData } from '@/types/product-social';
import { useQuery } from '@tanstack/react-query';
import { Heart, MessageCircle } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';
import { useSession } from 'next-auth/react';
import { FC, MouseEvent } from 'react';

type PropsType = {
  product: ProductCardType;
  className?: string;
};

const ProductSocialStats: FC<PropsType> = ({ product, className }) => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { data: rawSession } = useSession();
  const session = rawSession as CustomSession | null;
  const isLoggedIn = Boolean(session?.user);
  const token = session?.user?.access_token ?? '';

  const initialLikes: ProductLikesData = {
    likes_count: product.likes_count ?? 0,
    is_liked: Boolean(product.is_liked),
  };

  const queryKey = ['product-likes', product.id, token];

  const { data: likes = initialLikes } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getProductLikes(product.id, locale, token);
      if (response.ok) return response.data;
      return initialLikes;
    },
    initialData: initialLikes,
    staleTime: 30_000,
  });

  const { toggleLike, isPending } = useToggleProductLike(
    product.id,
    token,
    initialLikes
  );

  const commentsCount = product.comments_count ?? 0;

  const handleLikeClick = (e: MouseEvent<HTMLButtonElement>) => {
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

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-3 gap-y-1 pt-1.5 text-xs',
        className
      )}
    >
      <button
        type='button'
        onClick={handleLikeClick}
        disabled={isPending}
        className={cn(
          'focus-visible:ring-primary/40 flex items-center gap-1 rounded-md font-medium transition-colors outline-none focus-visible:ring-2 disabled:opacity-60',
          likes.is_liked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
        )}
        aria-pressed={likes.is_liked}
        aria-label={
          likes.is_liked ? t('product-social.unlike') : t('product-social.like')
        }
      >
        {isPending ? (
          <Loader className='size-3.5' />
        ) : (
          <Heart
            className={cn(
              'size-3.5 transition-colors',
              likes.is_liked && 'fill-red-500 text-red-500'
            )}
            aria-hidden
          />
        )}
        <span className='tabular-nums'>
          {formatLocaleNumber(likes.likes_count, locale)}
        </span>
        <span className='font-normal'>
          {likes.is_liked
            ? t('product-social.you-liked')
            : likes.likes_count === 1
              ? t('product-social.like-singular')
              : t('product-social.like-plural')}
        </span>
      </button>

      {commentsCount > 0 ? (
        <span className='text-muted-foreground flex items-center gap-1'>
          <MessageCircle className='size-3.5' aria-hidden />
          <span className='tabular-nums'>
            {formatLocaleNumber(commentsCount, locale)}
          </span>
        </span>
      ) : null}
    </div>
  );
};

export default ProductSocialStats;
