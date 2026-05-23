import {
  getCategory,
  SubCategoryProducts,
  getBreadcrumbLinks,
} from '@/features/categories';
import CustomBreadcrumb from '@/components/custom-breadcrumb';
import PageWrapper from '@/components/page-wrapper';
import SectionWrapper from '@/components/section-wrapper';
import { getCategoryMetadataFallback, getSiteBranding } from '@/lib/page-metadata';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { FC, Suspense } from 'react';

type PropsType = {
  params: Promise<{
    locale: string;
    category: string;
    subCategory: string;
    subSubCategory: string[];
  }>;
  searchParams: Promise<Record<string, string>>;
};

export async function generateMetadata(props: PropsType): Promise<Metadata> {
  const params = await props.params;

  const { subSubCategory, locale } = params;

  try {
    const data = await getCategory(
      subSubCategory[subSubCategory.length - 1],
      locale
    );
    if (!data.ok) {
      return getCategoryMetadataFallback('not-found');
    }

    const category = data.data;
    const { siteName } = await getSiteBranding();
    return {
      title: category?.name,
      description: category?.description,
      openGraph: {
        title: category.name,
        description: category.description || undefined,
        siteName,
        locale,
        images: category.image ? [category.image] : [],
      },
      robots: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'standard',
        'max-video-preview': -1,
        notranslate: false,
        noimageindex: false,
      },
    };
  } catch {
    return getCategoryMetadataFallback('error');
  }
}

const Page: FC<PropsType> = async props => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const { subSubCategory, locale } = params;

  try {
    const headersList = await headers();
    const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
      headers: headersList,
    });

    const categoryDetail = getCategory(
      subSubCategory[subSubCategory.length - 1],
      locale,
      request
    );
    const [data] = await Promise.all([categoryDetail]);

    if (!data.ok || !data.data) return notFound();
    const categoryData = data.data;
    const subCategories = categoryData.subcategories ?? [];
    return (
      <PageWrapper>
        <SectionWrapper className='space-y-8! md:py-4 lg:py-8'>
          <CustomBreadcrumb
            activeLink={categoryData.name}
            links={getBreadcrumbLinks(categoryData)}
          />
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
  } catch (error) {
    return <></>;
  }
};

export default Page;
