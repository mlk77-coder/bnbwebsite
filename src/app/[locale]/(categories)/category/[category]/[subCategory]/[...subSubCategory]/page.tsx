import { getCategory } from '@/api/categories/get-category-details';
import SubCategoryProducts from '@/app/[locale]/(categories)/components/sub-category-products';
import RecentlyViewed from '@/app/[locale]/_components/recently-viewed';
import CustomBreadcrumb from '@/components/custom-breadcrumb';
import PageWrapper from '@/components/page-wrapper';
import SectionWrapper, {
  sectionWrapperClassName,
} from '@/components/section-wrapper';
import getSession from '@/lib/get-session';
import { cn } from '@/lib/utils';
import { CategoryMainInfo, CategorySlugs } from '@/types/categories';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { cookies, headers } from 'next/headers';
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
    if (!data.ok)
      return {
        title: 'Category Not Found',
        description: 'The category you are looking for does not exist.',
      };

    const category = data.data;
    return {
      title: category?.name,
      description: category?.description,
      openGraph: {
        title: category.name,
        description: category.description || undefined,
        siteName: 'BNB Store',
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
  } catch (error) {
    return {
      title: 'Error',
      description: 'Unable to fetch category details.',
    };
  }
}

const getBreadcrumbLinks = (category: CategoryMainInfo) => {
  const links = [];
  const buildSlug = (cat: CategorySlugs): string => {
    if (!cat.parent) {
      return cat.slug;
    }
    return `${buildSlug(cat.parent)}/${cat.slug}`;
  };

  let currentCategory: CategorySlugs | null = category;

  // نبدأ بالتنقل في الشجرة، لكن نستثني العنصر الذي بدأنا به
  while (currentCategory?.parent) {
    links.unshift({
      name: currentCategory.name,
      slug: `/category/${buildSlug(currentCategory)}`,
    });
    currentCategory = currentCategory.parent;
  }

  // إضافة الجذر إذا كان موجودًا
  if (currentCategory) {
    links.unshift({
      name: currentCategory.name,
      slug: `/category/${currentCategory.slug}`,
    });
  }

  // استثناء آخر ابن
  if (links.length > 0) {
    links.pop();
  }

  return links;
};

export const getAllSlugs = (category: CategorySlugs | null): string[] => {
  const slugs = [];
  let currentCategory = category;

  while (currentCategory) {
    slugs.unshift(currentCategory.slug);
    currentCategory = currentCategory.parent || null;
  }

  return slugs;
};

const Page: FC<PropsType> = async props => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const { subSubCategory, locale } = params;

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
    return <></>;
  }
};

export default Page;
