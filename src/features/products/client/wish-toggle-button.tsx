'use client';

import { useGetFavoriteIds } from '@/features/auth';
import { Button, buttonVariants } from '@/components/ui/button';
import { CustomSession } from '@/lib/auth-options';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { FC } from 'react';
import useToggleWishList from '@/features/products/client/hooks/use-toggle-wishlist';
import Loader from '@/components/ui/loader';
import { useTranslations } from 'next-intl';

interface WishlistButtonProps extends React.ComponentPropsWithoutRef<'button'> {}

const WishlistButton: FC<WishlistButtonProps> = ({ ...props }) => {
  const t = useTranslations();
  return (
    <Button
      {...props}
      variant='ghost'
      size='default'
      className='h-11 w-full border text-sm capitalize'
    >
      <Heart className='me-2 size-4' />
      {t('add-to-wishlist')}
    </Button>
  );
};

type PropsType = {
  session: CustomSession | null;
  id: number;
};

const WishToggleButton: FC<PropsType> = ({ session, id }) => {
  const t = useTranslations();
  const { handleToggleWishList, isPending: isPendingWishList } =
    useToggleWishList(session?.user?.access_token || '', id);
  const { data, isPending, isError } = useGetFavoriteIds(
    session?.user?.access_token || ''
  );

  if (!session)
    return (
      <button
        type='button'
        onClick={() => signIn()}
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'default' }),
          'h-11 w-full cursor-pointer border text-sm'
        )}
      >
        <Heart className='me-2 size-4' />
        {t('add-to-wishlist')}
      </button>
    );

  if (isPending) return <WishlistButton disabled />;
  if (isError) return <WishlistButton disabled />;

  if (!data.productIds.includes(id))
    return (
      <Button
        disabled={isPendingWishList}
        onClick={handleToggleWishList}
        variant='ghost'
        size='default'
        className='h-11 w-full border text-sm'
      >
        {isPendingWishList ? (
          <Loader className='me-2 size-4' />
        ) : (
          <Heart className='me-2 size-4' />
        )}
        {t('add-to-wishlist')}
      </Button>
    );
  else
    return (
      <Button
        disabled={isPendingWishList}
        onClick={handleToggleWishList}
        variant='ghost'
        size='default'
        className='h-11 w-full border text-sm'
      >
        {isPendingWishList ? (
          <Loader className='me-2 size-4' />
        ) : (
          <Heart className='me-2 size-4 fill-red-500 text-red-500' />
        )}
        {t('remove-from-wishlist')}
      </Button>
    );
};

export default WishToggleButton;
