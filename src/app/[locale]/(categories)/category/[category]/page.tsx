import { getCategory, SubCategoryProducts } from '@/features/categories';
import CategoryCirclesCarousel from '@/components/category-circles-carousel';
import CustomBreadcrumb from '@/components/custom-breadcrumb';
import PageWrapper from '@/components/page-wrapper';
import SectionWrapper from '@/components/section-wrapper';
import { getCategoryMetadataFallback, getSiteBranding } from '@/lib/page-metadata';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { FC, Suspense } from 'react';
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
    if (data.ok && data.data) {
      const categoryData = data.data;
      const { siteName } = await getSiteBranding();
      const noindex = categoryData.products_count === 0;

      return {
        title: categoryData.name,
        description: categoryData.description,
        robots: {
          index: !noindex,
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
          siteName,
          locale,
          images: categoryData.image ? [categoryData.image] : [],
        },
      };
    }

    return getCategoryMetadataFallback('default');
  } catch (error) {
    console.error('Error fetching category data:', error);
    return getCategoryMetadataFallback('error');
  }
}

const Page: FC<PropsType> = async props => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const { category, locale } = params;

  const t = await getTranslations();
  const headersList = await headers();
  const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
    headers: headersList,
  });
  const data = await getCategory(category, locale, request);
  if (!data.ok || !data.data) return notFound();
  const categoryData = data.data;
  const subCategories = categoryData.subcategories ?? [];
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
    </PageWrapper>
  );
};

export default Page;
