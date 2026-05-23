import WishlistGrid from '@/features/wishlist/client/wishlist-grid';
import { getWishlist } from '@/features/wishlist/api/get-wishlist';
import getSession from '@/lib/get-session';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { Heart } from 'lucide-react';
import { FC } from 'react';
import { Separator } from '@/components/ui/separator';

type PropsType = {
  params: Promise<{ locale: string }>;
};

const WishlistPage: FC<PropsType> = async props => {
  const params = await props.params;
  const { locale } = params;

  const session = await getSession();
  const t = await getTranslations();
  const headersList = await headers();
  const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
    headers: headersList,
  });
  if (!session || !session.user) return notFound();
  const wishListResponse = await getWishlist(
    locale,
    session.user.access_token,
    request
  );

  if (!wishListResponse.ok) {
    return (
      <p className='text-muted-foreground text-sm'>{t('wishlist-load-error')}</p>
    );
  }
  return (
    <div className='flex size-full flex-col items-start justify-start gap-6'>
      <div className='flex items-center gap-3'>
        <span className='bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl'>
          <Heart className='size-5' />
        </span>
        <div>
          <h2 className='text-primary text-2xl font-bold'>{t('wishlist')}</h2>
          <p className='text-muted-foreground text-sm'>
            {t('product-count', { count: wishListResponse.data.data.length })}
          </p>
        </div>
      </div>
      <Separator />
      <WishlistGrid
        initialData={wishListResponse.data.data}
        token={session?.user?.access_token || ''}
      />
    </div>
  );
};

export default WishlistPage;
