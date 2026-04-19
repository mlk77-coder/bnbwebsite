import PageWrapper from '@/components/page-wrapper';
import { sectionWrapperClassName } from '@/components/section-wrapper';
import { fetcher } from '@/lib/fetcher';
import getSession from '@/lib/get-session';
import { cn } from '@/lib/utils';
import { GetHomeDataResponse } from '@/types/home';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { cookies, headers } from 'next/headers';
import { FC } from 'react';
import BestSellers from './_components/home/best-sellers';
import Collections from './_components/home/collections';
import ExploreOurSelection from './_components/home/explore-our-selection';
import Hero from './_components/home/hero';
import NewArrivals from './_components/home/new-arrivals';
import SalesSlider from './_components/home/sales-slider';
import RecentlyViewed from './_components/recently-viewed';

type PropsType = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: 'Welcome to BNB Store',
    description: t('meta-description'),
    openGraph: {
      type: 'website',
      title: 'BNB Store',
      description: t('meta-description'),
      siteName: 'BNB Store',
      locale: 'en',
      url: process.env.NEXT_PUBLIC_LOCAL_URL,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_LOCAL_URL}/og.png`,
          width: 1200,
          height: 630,
          alt: 'BNB Store Logo',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: 'BNB Store',
      description: t('meta-description'),
      images: [`${process.env.NEXT_PUBLIC_LOCAL_URL}/logo-light.png`],
      creator: '@R-Link',
      site: '@R-Link',
    },
    icons: {
      icon: '/favicon/favicon.ico',
      apple: '/favicon/apple-touch-icon.png',
      shortcut: '/favicon/apple-touch-icon.png',
    },
    other: {
      rating: 'General',
    },
  };
}

const HomePage: FC<PropsType> = async props => {
  const params = await props.params;

  const { locale } = params;

  const cookieStore = await cookies();
  const session = await getSession();
  const userToken = cookieStore.get('x-user-session')?.value || '';
  const isLoggedIn = Boolean(session && session.user);
  const headersList = await headers();
  const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
    headers: headersList,
  });
  const t = await getTranslations();
  const response = await fetcher<GetHomeDataResponse>(
    `home-page-content`,
    locale,
    { cache: 'no-store' },
    false,
    request
  );

  if (!response.ok) return <>error</>;

  return (
    <PageWrapper>
      <h1 className='sr-only'>Welcome to BNB Store</h1>
      {/* <Hero content={response.data.content} />

      {response.data.latest_six_categories.length === 0 ? null : (
        <ExploreOurSelection categories={response.data.latest_six_categories} />
      )}
      {response.data.latest_two_categories.length === 0 ? null : (
        <NewArrivals categories={response.data.latest_two_categories} />
      )}
      {response.data.best_selling_products.length === 0 ? null : (
        <BestSellers
          title={t('best-sellers')}
          description={t('best-sellers-description')}
          products={response.data.best_selling_products}
        />
      )}
      {response.data.highlighted_products.length === 0 ? null : (
        <BestSellers
          title={t('Trendy')}
          description={t('Trendy-d')}
          products={response.data.highlighted_products}
        />
      )}

      {!response.data.discounts ? null : (
        <SalesSlider discounts={response.data.discounts} />
      )}
      {response.data.two_categories_products.length === 0 ? null : (
        <Collections categories={response.data.two_categories_products} />
      )}
      <RecentlyViewed
        className={cn('mt-16', sectionWrapperClassName)}
        isLoggedIn={isLoggedIn}
        token={session && session.user ? session.user.access_token : userToken}
      /> */}
    </PageWrapper>
  );
};

export default HomePage;
