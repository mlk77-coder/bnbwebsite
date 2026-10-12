import PageWrapper from '@/components/page-wrapper';
import { getCategories } from '@/features/categories';
import { DealsRail } from '@/features/home/client/deals-rail';
import { CategoriesCarousel } from '@/features/home/components/categories-section/categories-carousel';
import { FeaturedProducts } from '@/features/home/components/featured-collection-section/featured-products';
import { HeroSection } from '@/features/home/components/hero-section';
import {
  FEATURED_PRODUCTS_PER_PAGE,
  HOME_DEALS_LIMIT,
  HOME_SECTION_SPACING,
} from '@/features/home/constants';
import {
  getProductCollection,
  HERO_PRODUCTS_LIMIT,
} from '@/features/product-collections';
import { getProducts } from '@/features/products';
import ReelsSection from '@/features/reels/client/reels-section';
import { getReels, REELS_HOME_PER_PAGE } from '@/features/reels';
import getSession from '@/lib/get-session';
import type { Pagination } from '@/types';
import type { ProductCard } from '@/types/products';
import { heroDummyContent } from '@/lib/hero-section-dummy-data';
import { headers } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import { FC } from 'react';

type PropsType = {
  params: Promise<{ locale: string }>;
};

const fallbackFeaturedPagination: Pagination = {
  current_page: 1,
  next_page_url: null,
  prev_page_url: null,
  first_page_url: `products?per_page=${FEATURED_PRODUCTS_PER_PAGE}&page=1`,
  last_page_url: `products?per_page=${FEATURED_PRODUCTS_PER_PAGE}&page=1`,
  per_page: FEATURED_PRODUCTS_PER_PAGE,
  total: 0,
};

const emptyProducts: ProductCard[] = [];

const HomePage: FC<PropsType> = async props => {
  const params = await props.params;
  const { locale } = params;
  const t = await getTranslations('home');
  const session = await getSession();
  const token = session?.user?.access_token ?? '';
  const headersList = await headers();
  const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
    headers: headersList,
  });
  const heroLimit = String(HERO_PRODUCTS_LIMIT);
  const heroParams = { limit: heroLimit };
  const [
    categories,
    productsResponse,
    reelsResponse,
    trendyResponse,
    latestResponse,
    saleResponse,
    mostViewedResponse,
  ] = await Promise.all([
    getCategories(locale, request),
    getProducts(
      { per_page: String(FEATURED_PRODUCTS_PER_PAGE), page: '1' },
      locale,
      request,
      token
    ),
    getReels(
      { per_page: String(REELS_HOME_PER_PAGE), page: '1' },
      locale,
      request,
      token
    ),
    getProductCollection('featured', heroParams, locale, request, token),
    getProductCollection('latest', heroParams, locale, request, token),
    getProductCollection(
      'on-sale',
      {
        limit: String(HOME_DEALS_LIMIT),
        per_page: String(HOME_DEALS_LIMIT),
        page: '1',
        sort_by: 'discount',
      },
      locale,
      request,
      token
    ),

    getProductCollection('most-viewed', heroParams, locale, request, token),
  ]);

  const products = productsResponse.ok ? productsResponse.data.products : [];

  const featuredPagination = productsResponse.ok
    ? productsResponse.data.pagination
    : fallbackFeaturedPagination;

  const reels = reelsResponse.ok ? reelsResponse.data.reels : [];

  const homeCategories = categories.map(category => ({
    id: category.id,
    name: category.name,
    slug: String(category.id),
    image: category.image,
    parents_slugs: [],
  }));

  const trendyProducts = trendyResponse.ok
    ? trendyResponse.data.products
    : emptyProducts;

  const latestProducts = latestResponse.ok
    ? latestResponse.data.products
    : emptyProducts;

  const saleProducts = saleResponse.ok
    ? saleResponse.data.products
    : emptyProducts;

  const mostViewedProducts = mostViewedResponse.ok
    ? mostViewedResponse.data.products
    : emptyProducts;

  return (
    <PageWrapper>
      <h1 className='sr-only'>{t('page-heading')}</h1>

      <HeroSection
        content={heroDummyContent}
        trendyProducts={trendyProducts}
        saleProducts={saleProducts}
        latestProducts={latestProducts}
        mostViewedProducts={mostViewedProducts}
        featuredProducts={products}
      />

      <CategoriesCarousel categories={homeCategories} />

      <DealsRail products={saleProducts} />

      <ReelsSection reels={reels} className={HOME_SECTION_SPACING} />

      <FeaturedProducts
        key={locale}
        locale={locale}
        initialProducts={products}
        initialPagination={featuredPagination}
      />
    </PageWrapper>
  );
};

export default HomePage;
