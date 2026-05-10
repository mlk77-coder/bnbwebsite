import { getCategory, getAllSlugs, SubCategoryProducts } from '@/features/categories';
import CategoryCirclesCarousel from '@/components/category-circles-carousel';
import CustomBreadcrumb from '@/components/custom-breadcrumb';
import PageWrapper from '@/components/page-wrapper';
import SectionWrapper from '@/components/section-wrapper';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { FC } from 'react';

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

    if (data.ok && data.data) {
      const categoryData = data.data;
      const parentCategory = categoryData.parent;
      return {
        title: parentCategory
          ? `${parentCategory.name} | ${categoryData.name}`
          : categoryData.name,
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
            en: `${process.env.NEXT_PUBLIC_LOCAL_URL}/en/category/${parentCategory?.slug || categoryData.slug}/${categoryData.slug}`,
            ar: `${process.env.NEXT_PUBLIC_LOCAL_URL}/ar/category/${parentCategory?.slug || categoryData.slug}/${categoryData.slug}`,
          },
        },
        openGraph: {
          url: `${process.env.NEXT_PUBLIC_LOCAL_URL}/en/category/${parentCategory?.slug || categoryData.slug}/${categoryData.slug}`,
          title: categoryData.name,
          description: categoryData.description || undefined,
          siteName: 'BNB Store',
          locale,
          images: categoryData.image ? [categoryData.image] : [],
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

  const t = await getTranslations();
  const headersList = await headers();
  const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
    headers: headersList,
  });
  const data = await getCategory(subCategory, locale, request);

  if (!data.ok || !data.data) return notFound();

  const categoryData = data.data;
  const subcategories = categoryData.subcategories ?? [];
  return (
    <PageWrapper>
      <SectionWrapper className='space-y-8! md:py-4 lg:py-8'>
        <CustomBreadcrumb
          activeLink={categoryData.name}
          links={[
            {
              name: categoryData.parent?.name || categoryData.name,
              slug: `/category/${category}`,
            },
          ]}
        />
        {subcategories.length > 0 ? (
          <CategoryCirclesCarousel
            items={subcategories.map(c => ({
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
          category={String(categoryData.id)}
          searchParams={searchParams}
          fallbackCategories={subcategories}
        />
      </SectionWrapper>
    </PageWrapper>
  );
};

export default Page;
