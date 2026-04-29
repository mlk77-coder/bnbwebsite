import { getCategory } from '@/api/categories/get-category-details';
import SubCategoryProducts from '@/app/[locale]/(categories)/components/sub-category-products';
import CategoryCirclesCarousel from '@/components/category-circles-carousel';
import CustomBreadcrumb from '@/components/custom-breadcrumb';
import PageWrapper from '@/components/page-wrapper';
import SectionWrapper, {
  sectionWrapperClassName,
} from '@/components/section-wrapper';
import getSession from '@/lib/get-session';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { cookies, headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { FC, Suspense } from 'react';
import RecentlyViewed from '../../../_components/recently-viewed';

type PropsType = {
  params: Promise<{
    locale: string;
    category: string;
  }>;
  searchParams: Promise<Record<string, string>>;
};

export async function generateMetadata(props: PropsType): Promise<Metadata> {
  const params = await props.params;

  const { category, locale } = params;

  try {
    const data = await getCategory(category, locale);
    if (data.ok) {
      const categoryData = data.data;

      // Check if there are no products and add 'noindex' if true
      const noindex = data.data.products_count === 0;

      return {
        title: categoryData.name,
        description: categoryData.description,
        robots: {
          index: !noindex, // Prevent indexing if no products
          follow: true,
          'max-snippet': -1,
          'max-image-preview': 'standard',
          'max-video-preview': -1,
          notranslate: false,
          noimageindex: false,
        },
        alternates: {
          canonical: `${process.env.NEXT_PUBLIC_LOCAL_URL}/${locale}/category/${categoryData.slug}`,
          languages: {
            en: `${process.env.NEXT_PUBLIC_LOCAL_URL}/en/category/${categoryData.slug}`,
            ar: `${process.env.NEXT_PUBLIC_LOCAL_URL}/ar/category/${categoryData.slug}`,
          },
        },
        openGraph: {
          url: `${process.env.NEXT_PUBLIC_LOCAL_URL}/${locale}/category/${categoryData.slug}`,
          title: categoryData.name,
          description: categoryData.description || undefined,
          siteName: 'BNB Store',
          locale,
          images: categoryData.image ? [categoryData.image] : [],
        },
      };
    } else {
      return {
        title: 'Default Category',
        description: 'Default description for category',
      };
    }
  } catch (error) {
    console.error('Error fetching category data:', error);
    return {
      title: 'Error',
      description: 'Unable to fetch category data at the moment.',
    };
  }
}

const Page: FC<PropsType> = async props => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const { category, locale } = params;

  const cookieStore = await cookies();
  const session = await getSession();
  const userToken = cookieStore.get('x-user-session')?.value || '';
  const isLoggedIn = Boolean(session && session.user);
  const t = await getTranslations();
  const headersList = await headers();
  const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
    headers: headersList,
  });
  const data = await getCategory(category, locale, request);
  if (!data.ok) return <>error</>;
  if (data.status === 404) return notFound();
  const categoryData = data.data;
  const subCategories = categoryData.subcategories;
  return (
    <PageWrapper>
      <SectionWrapper className='space-y-8! md:py-4 lg:py-8'>
        <CustomBreadcrumb activeLink={categoryData.name} links={[]} />
        {subCategories.length > 0 ? (
          <CategoryCirclesCarousel
            items={subCategories.map(c => ({
              id: c.id,
              name: c.name,
              image: c.image,
              href: `/category/${category}/${c.id}`,
            }))}
            title={t('hero-shop-by-category')}
            description={t('explore-our-selection-description')}
            sectionClassName='py-0!'
          />
        ) : null}
        <Suspense fallback={<>loading.....</>}>
          <SubCategoryProducts
            category={String(categoryData.id)}
            searchParams={searchParams}
            fallbackCategories={subCategories}
          />
        </Suspense>
      </SectionWrapper>
      {/* <RecentlyViewed
        className={cn('mt-16', sectionWrapperClassName)}
        isLoggedIn={isLoggedIn}
        token={session && session.user ? session.user.access_token : userToken}
      /> */}
    </PageWrapper>
  );
};

export default Page;
