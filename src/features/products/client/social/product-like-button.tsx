'use client';

import { getProductLikes } from '@/features/products/api/get-product-likes';
import useToggleProductLike from '@/features/products/client/social/hooks/use-toggle-product-like';
import Loader from '@/components/ui/loader';
import { cn } from '@/lib/utils';
import { ProductLikesData } from '@/types/product-social';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';
import { FC } from 'react';

type PropsType = {
  productId: number;
  token: string;
  isLoggedIn: boolean;
  initialLikes: ProductLikesData;
};

const ProductLikeButton: FC<PropsType> = ({
  productId,
  token,
  isLoggedIn,
  initialLikes,
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const queryKey = ['product-likes', productId, token];

  const { data: likes = initialLikes } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getProductLikes(productId, locale, token);
      if (response.ok) return response.data;
      return initialLikes;
    },
    initialData: initialLikes,
    staleTime: 30_000,
  });

  const { toggleLike, isPending } = useToggleProductLike(
    productId,
    token,
    initialLikes
  );

  const handleClick = () => {
    if (!isLoggedIn) {
      const callbackUrl = encodeURIComponent(pathname || '/');
      router.push(`/login?callbackUrl=${callbackUrl}`);
      return;
    }
    toggleLike();
  };

  return (
    <motion.button
      type='button'
      onClick={handleClick}
      disabled={isPending}
      whileTap={{ scale: 0.88 }}
      className='group flex items-center gap-2 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/40'
      aria-pressed={likes.is_liked}
      aria-label={
        likes.is_liked
          ? t('product-social.unlike')
          : t('product-social.like')
      }
    >
      <span
        className={cn(
          'flex size-10 items-center justify-center rounded-full transition-colors',
          likes.is_liked
            ? 'bg-red-500/10'
            : 'bg-muted/80 group-hover:bg-muted'
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
                likes.is_liked
                  ? 'fill-red-500 text-red-500'
                  : 'text-foreground'
              )}
            />
          </motion.span>
        )}
      </span>
      <span className='text-sm font-semibold tabular-nums'>
        {likes.likes_count.toLocaleString(locale)}
      </span>
      <span className='text-muted-foreground text-sm'>
        {likes.likes_count === 1
          ? t('product-social.like-singular')
          : t('product-social.like-plural')}
      </span>
    </motion.button>
  );
};

export default ProductLikeButton;
