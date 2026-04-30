import { getWishlist } from '@/api/wishlist/get-wishlist';
import getSession from '@/lib/get-session';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { FC } from 'react';
import InifinteWithList from './_components/inifinte-with-list';
import { Heart } from 'lucide-react';

type PropsType = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t('wishlist'),
    robots: {
      index: false,
    },
  };
}

const WishListPage: FC<PropsType> = async props => {
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

  if (!wishListResponse.ok) return <>error</>;
  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-3 rounded-3xl bg-secondary/40 p-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-center gap-3'>
          <span className='flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
            <Heart className='size-5' />
          </span>
          <div>
            <h2 className='text-2xl font-bold text-primary'>{t('wishlist')}</h2>
            <p className='text-sm text-muted-foreground'>
              {t('product-count', { count: wishListResponse.data.data.length })}
            </p>
          </div>
        </div>
      </div>
      <InifinteWithList
        initialData={wishListResponse.data.data}
        token={session?.user?.access_token || ''}
      />
    </div>
  );
};

export default WishListPage;
