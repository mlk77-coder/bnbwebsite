import PageWrapper from '@/components/page-wrapper';
import { sectionWrapperClassName } from '@/components/section-wrapper';
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
import { cn } from '@/lib/utils';
import { GetHomeDataResponse, HomePageCategory } from '@/types/home';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { cookies, headers } from 'next/headers';
import { FC } from 'react';
import BestSellers from './_components/home/best-sellers';
import { CategoriesCarousel } from './_components/home/categories-carousel';
import Collections from './_components/home/collections';
import ExploreOurSelection from './_components/home/explore-our-selection';
import { HeroSection } from './_components/home/hero-section';
import NewArrivals from './_components/home/new-arrivals';
import SalesSlider from './_components/home/sales-slider';
import { FeaturedProducts } from './_components/home/featured-products';
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
  const t = await getTranslations();
  const response = await fetcher<GetHomeDataResponse>(
    `home-page-content`,
    locale,
    { cache: 'no-store' },
    false,
    request
  );

  if (!response.ok) return <>error</>;

  const u = (photoSlug: string, w = 900) =>
    `https://images.unsplash.com/${photoSlug}?auto=format&fit=crop&w=${w}&q=90`;

  const dummyCategories: HomePageCategory[] = [
    {
      id: 1,
      name: 'Women',
      slug: 'women',
      image: u('photo-1483985988355-763728e1935b'),
      parents_slugs: [],
    },
    {
      id: 2,
      name: 'Curve',
      slug: 'curve',
      image: u('photo-1581044777550-4cfa60707c03'),
      parents_slugs: [],
    },
    {
      id: 3,
      name: 'Kids',
      slug: 'kids',
      image: u('photo-1519345182560-3f2917c472ef'),
      parents_slugs: [],
    },
    {
      id: 4,
      name: 'Men',
      slug: 'men',
      image: u('photo-1519085360753-af0119f7cbe7'),
      parents_slugs: [],
    },
    {
      id: 5,
      name: 'Beachwear',
      slug: 'beachwear',
      image: u('photo-1524504388940-b1c1722653e1'),
      parents_slugs: [],
    },
    {
      id: 6,
      name: 'Tops',
      slug: 'tops',
      image: u('photo-1521572163474-6864f9cf17ab'),
      parents_slugs: [],
    },
    {
      id: 7,
      name: 'Dresses',
      slug: 'dresses',
      image: u('photo-1496747611176-843222e1e57c'),
      parents_slugs: [],
    },
    {
      id: 8,
      name: 'Cell Phones',
      slug: 'cell-phones',
      image: u('photo-1511707171634-5f897ff02aa9'),
      parents_slugs: [],
    },
    {
      id: 9,
      name: 'Shoes',
      slug: 'shoes',
      image: u('photo-1542291026-7eec264c27ff'),
      parents_slugs: [],
    },
    {
      id: 10,
      name: 'Jewelry',
      slug: 'jewelry',
      image: u('photo-1617038220319-276d3cfab638'),
      parents_slugs: [],
    },
    {
      id: 11,
      name: 'Home & Living',
      slug: 'home-living',
      image: u('photo-1616627455735-25b716496f5c'),
      parents_slugs: [],
    },
    {
      id: 12,
      name: 'Beauty',
      slug: 'beauty',
      image: u('photo-1522338242992-e1a54906a8da'),
      parents_slugs: [],
    },
    {
      id: 13,
      name: 'Sports',
      slug: 'sports',
      image: u('photo-1461896836934-ffe607ba8211'),
      parents_slugs: [],
    },
    {
      id: 14,
      name: 'Baby',
      slug: 'baby',
      image: u('photo-1515488042361-ee00e0ddd4e4'),
      parents_slugs: [],
    },
    {
      id: 15,
      name: 'Underwear',
      slug: 'underwear',
      image: u('photo-1512436991641-6745cdb1723f'),
      parents_slugs: [],
    },
    {
      id: 16,
      name: 'Toys & Games',
      slug: 'toys-games',
      image: u('photo-1566576912321-d58ddd7a6088'),
      parents_slugs: [],
    },
    {
      id: 17,
      name: 'Bags',
      slug: 'bags',
      image: u('photo-1594223274512-ad4803739b7c'),
      parents_slugs: [],
    },
    {
      id: 18,
      name: 'Watches',
      slug: 'watches',
      image: u('photo-1523170335258-f5ed11844a49'),
      parents_slugs: [],
    },
    {
      id: 19,
      name: 'Perfumes',
      slug: 'perfumes',
      image: u('photo-1594035910387-fea47794261f'),
      parents_slugs: [],
    },
    {
      id: 20,
      name: 'Accessories',
      slug: 'accessories',
      image: u('photo-1576053139778-7e32f2ae3cfd'),
      parents_slugs: [],
    },
  ];

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
      <CategoriesCarousel categories={dummyCategories} />

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
