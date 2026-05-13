import PageWrapper from '@/components/page-wrapper';
import SectionWrapper from '@/components/section-wrapper';
import { getCategories } from '@/features/categories';
import { CategoriesCarousel } from '@/features/home/components/categories-section/categories-carousel';
import { FeaturedProducts } from '@/features/home/components/featured-collection-section/featured-products';
import { HeroSection } from '@/features/home/components/hero-section';
import { FEATURED_PRODUCTS_PER_PAGE } from '@/features/home/constants';
import { getProducts } from '@/features/products';
import type { Pagination } from '@/types';
import { heroDummyContent } from '@/lib/hero-section-dummy-data';
import { headers } from 'next/headers';
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

const HomePage: FC<PropsType> = async props => {
  const params = await props.params;

  const { locale } = params;

  // const cookieStore = await cookies();
  // const session = await getSession();
  // const userToken = cookieStore.get('x-user-session')?.value || '';
  // const isLoggedIn = Boolean(session && session.user);
  const headersList = await headers();
  const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
    headers: headersList,
  });
  const [categories, productsResponse] = await Promise.all([
    getCategories(locale, request),
    getProducts(
      { per_page: String(FEATURED_PRODUCTS_PER_PAGE), page: '1' },
      locale,
      request
    ),
  ]);
  const products = productsResponse.ok ? productsResponse.data.products : [];
  const featuredPagination = productsResponse.ok
    ? productsResponse.data.pagination
    : fallbackFeaturedPagination;
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
      <SectionWrapper className='bg-transparent py-0!'>
        <CategoriesCarousel categories={homeCategories} />
      </SectionWrapper>

      <FeaturedProducts
        key={locale}
        locale={locale}
        initialProducts={products}
        initialPagination={featuredPagination}
      />

      {/* <RecentlyViewed
        className={cn("mt-16", sectionWrapperClassName)}
        isLoggedIn={isLoggedIn}
        token={
          session && session.user ? session.user.access_token : userToken
        }
      /> */}
    </PageWrapper>
  );
};

export default HomePage;
