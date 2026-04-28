import PageWrapper from '@/components/page-wrapper';
import SectionWrapper, {
  sectionWrapperClassName,
} from '@/components/section-wrapper';
import { fetcher } from '@/lib/fetcher';
import getSession from '@/lib/get-session';
import {
  heroDummyBestSellingProducts,
  heroDummyCollectionsCategories,
  heroDummyContent,
  heroDummyDiscounts,
  heroDummyFeaturedCategories,
  heroDummyHighlightedProducts,
} from '@/lib/hero-section-dummy-data';
import { dummyHomeCategories } from '@/lib/dummy-catalog-data';
import { cn } from '@/lib/utils';
import { GetHomeDataResponse } from '@/types/home';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { cookies, headers } from 'next/headers';
import { FC } from 'react';
import { CategoriesCarousel } from './_components/home/categories-carousel';
import { FeaturedProducts } from './_components/home/featured-products';
import { HeroSection } from './_components/home/hero-section';
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
      creator: '@Ibrahim',
      site: '@Ibrahim',
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
  const response = await fetcher<GetHomeDataResponse>(
    `home-page-content`,
    locale,
    { cache: 'no-store' },
    false,
    request
  );

  const categories = response.ok ? dummyHomeCategories : dummyHomeCategories;

  return (
    <PageWrapper>
      <h1 className='sr-only'>Welcome to BNB Store</h1>
      <HeroSection
        content={heroDummyContent}
        bestSellingProducts={heroDummyBestSellingProducts}
        highlightedProducts={heroDummyHighlightedProducts}
        discounts={heroDummyDiscounts}
        collectionsCategories={heroDummyCollectionsCategories}
      />
      {/* Categories Carousel - New beautiful circular design */}
      <SectionWrapper className='bg-transparent py-0!'>
        <CategoriesCarousel categories={categories} />
      </SectionWrapper>

      {/* Featured Products with category filter */}
      <FeaturedProducts categories={heroDummyFeaturedCategories} />

      <RecentlyViewed
        className={cn('mt-16', sectionWrapperClassName)}
        isLoggedIn={isLoggedIn}
        token={session && session.user ? session.user.access_token : userToken}
      />
    </PageWrapper>
  );
};

export default HomePage;
