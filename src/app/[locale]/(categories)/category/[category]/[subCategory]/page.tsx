import { getCategory } from '@/api/categories/get-category-details';
import RecentlyViewed from '@/app/[locale]/_components/recently-viewed';
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
import { FC } from 'react';
import SubCategoryProducts from '../../../components/sub-category-products';
import { getAllSlugs } from './[...subSubCategory]/page';

type PropsType = {
  params: Promise<{
    locale: string;
    category: string;
    subCategory: string;
  }>;
  searchParams: Promise<Record<string, string>>;
};

export async function generateMetadata(props: PropsType): Promise<Metadata> {
  const params = await props.params;

  const { subCategory, locale } = params;

  try {
    const data = await getCategory(subCategory, locale);

    if (data.ok) {
      const { category: categoryData } = data.data;
      return {
        title: `${data.data.category.parent_category.name} | ${categoryData.name}`,
        description: categoryData.description,
        robots: {
          index: true,
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
            en: `${process.env.NEXT_PUBLIC_LOCAL_URL}/en/category/${categoryData.parent_category.slug}/${categoryData.slug}`,
            ar: `${process.env.NEXT_PUBLIC_LOCAL_URL}/ar/category/${categoryData.parent_category.slug}/${categoryData.slug}`,
          },
        },
        openGraph: {
          url: `${process.env.NEXT_PUBLIC_LOCAL_URL}/en/category/${categoryData.parent_category.slug}/${categoryData.slug}`,
          title: categoryData.name,
          description: categoryData.description,
          siteName: 'BNB Store',
          locale,
          images: [categoryData.image || ''],
        },
      };
    } else {
      return {
        title: 'Unknown Category',
        description: 'No description available for this category.',
      };
    }
  } catch (error) {
    return {
      title: 'Error',
      description: 'Unable to fetch category data at the moment.',
    };
  }
}
const Page: FC<PropsType> = async props => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const { category, subCategory, locale } = params;

  try {
    const cookieStore = await cookies();
    const t = await getTranslations();
    const session = await getSession();
    const userToken = cookieStore.get('x-user-session')?.value || '';
    const isLoggedIn = Boolean(session && session.user);
    const headersList = await headers();
    const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
      headers: headersList,
    });
    const categoryDetail = getCategory(subCategory, locale, request);
    const [data] = await Promise.all([categoryDetail]);

    if (!data.ok) {
      return <>error</>;
    }

    if (data.status === 404) return notFound();

    const { category: categoryData, sub_categories } = data.data;
    return (
      <PageWrapper>
        <SectionWrapper className='space-y-8! md:py-4 lg:py-8'>
          <CustomBreadcrumb
            activeLink={categoryData.name}
            links={[
              {
                name: categoryData.parent_category.name,
                slug: `/category/${category}`,
              },
            ]}
          />
          {sub_categories.length > 1 ? (
            <CategoryCirclesCarousel
              items={sub_categories.map(c => ({
                id: c.id,
                name: c.name,
                image: c.image,
                href: `/category/${getAllSlugs(c).join('/')}`,
              }))}
              title={t('hero-shop-by-category')}
              description={t('explore-our-selection-description')}
              sectionClassName='py-0!'
            />
          ) : null}
          <SubCategoryProducts
            category={subCategory}
            searchParams={searchParams}
          />
        </SectionWrapper>
        {/* <RecentlyViewed
          className={cn('mt-16', sectionWrapperClassName)}
          isLoggedIn={isLoggedIn}
          token={
            session && session.user ? session.user.access_token : userToken
          }
        /> */}
      </PageWrapper>
    );
  } catch (error) {
    return notFound();
  }
};

export default Page;
