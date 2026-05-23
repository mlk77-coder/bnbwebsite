'use client';

import { useGetFavoriteIds } from '@/features/auth';
import useToggleWishList from '@/features/products/client/hooks/use-toggle-wishlist';
import { CustomSession } from '@/lib/auth-options';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from '@/navigation';
import { Heart, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

export function WishlistHeart({ id }: { id: number }) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const { data: raw } = useSession();
  const session = raw as CustomSession | null;
  const token = session?.user?.access_token ?? '';

  const { data: favorites } = useGetFavoriteIds(token);
  const { handleToggleWishList, isPending } = useToggleWishList(token, id);

  const isFav = !!token && (favorites?.productIds.includes(id) ?? false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!session) {
      router.push(
        `/login?${new URLSearchParams({ callbackUrl: pathname || '/' }).toString()}`
      );
      return;
    }
    handleToggleWishList();
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      aria-label={isFav ? t('remove-from-wishlist') : t('add-to-wishlist')}
      className={cn(
        'group absolute inset-e-2 top-2 z-20 flex size-8 cursor-pointer items-center justify-center rounded-full',
        'border-border/30 border bg-white/90 shadow-sm backdrop-blur-sm',
        'opacity-0 transition-all duration-200 group-hover:opacity-100',
        'hover:scale-110 active:scale-95 disabled:opacity-50',
        isFav && 'opacity-100'
      )}
    >
      {isPending ? (
        <Loader2 className='text-foreground/60 size-3.5 animate-spin' />
      ) : (
        <Heart
          className={cn(
            'size-3.5 transition-colors duration-150 group-hover:text-red-500',
            isFav ? 'fill-red-500 text-red-500' : 'text-foreground/60'
          )}
        />
      )}
    </button>
  );
}
