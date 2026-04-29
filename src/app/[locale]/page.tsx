import getCategories from '@/api/categories/get-categories';
import { getProducts } from '@/api/products/get-products';
import PageWrapper from '@/components/page-wrapper';
import SectionWrapper, {
  sectionWrapperClassName,
} from '@/components/section-wrapper';
import getSession from '@/lib/get-session';
import { heroDummyContent } from '@/lib/hero-section-dummy-data';
import { cn } from '@/lib/utils';
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
  const [categories, productsResponse] = await Promise.all([
    getCategories(locale, request),
    getProducts({ per_page: '20' }, locale, request),
  ]);
  const products = productsResponse.ok ? productsResponse.data.products : [];
  const homeCategories = categories.map(category => ({
    id: category.id,
    name: category.name,
    slug: String(category.id),
    image: category.image,
    parents_slugs: [],
  }));

  return (
    <PageWrapper>
      <h1 className='sr-only'>Welcome to BNB Store</h1>
      <HeroSection
        content={heroDummyContent}
        bestSellingProducts={products}
        highlightedProducts={products}
        discounts={null}
        collectionsCategories={homeCategories.slice(0, 4)}
      />
      {/* Categories Carousel - New beautiful circular design */}
      <SectionWrapper className='bg-transparent py-0!'>
        <CategoriesCarousel categories={homeCategories} />
      </SectionWrapper>

      {/* Featured Products with category filter */}
      <FeaturedProducts categories={homeCategories} products={products} />

      <RecentlyViewed
        className={cn('mt-16', sectionWrapperClassName)}
        isLoggedIn={isLoggedIn}
        token={session && session.user ? session.user.access_token : userToken}
      />
    </PageWrapper>
  );
};

export default HomePage;
