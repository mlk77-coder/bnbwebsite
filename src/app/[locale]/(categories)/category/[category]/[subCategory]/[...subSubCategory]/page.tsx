import { getCategory } from "@/api/categories/get-category-details";
import SubCategoryProducts from "@/app/[locale]/(categories)/components/sub-category-products";
import CategoryCard from "@/app/[locale]/_components/home/category-card";
import RecentlyViewed from "@/app/[locale]/_components/recently-viewed";
import CarouselWithProgressBar from "@/components/carousel-with-progress-bar";
import ClientLink from "@/components/client-link";
import CustomBreadcrumb from "@/components/custom-breadcrumb";
import PageWrapper from "@/components/page-wrapper";
import SectionWrapper, {
  sectionWrapperClassName,
} from "@/components/section-wrapper";
import { buttonVariants } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";
import getSession from "@/lib/get-session";
import { cn } from "@/lib/utils";
import { CategoryMainInfo, CategorySlugs } from "@/types/categories";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import { FC, Suspense } from "react";

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

  const {
    subSubCategory,
    locale
  } = params;

  try {
    const data = await getCategory(
      subSubCategory[subSubCategory.length - 1],
      locale
    );
    if (!data.ok)
      return {
        title: "Category Not Found",
        description: "The category you are looking for does not exist.",
      };

    const { category } = data.data;
    return {
      title: category?.name,
      description: category?.description,
      openGraph: {
        title: category.name,
        description: category.description,
        siteName: "BNB Store",
        locale,
        images: [category.image || ""],
      },
      robots: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "standard",
        "max-video-preview": -1,
        notranslate: false,
        noimageindex: false,
      },
    };
  } catch (error) {
    return {
      title: "Error",
      description: "Unable to fetch category details.",
    };
  }
}

const getBreadcrumbLinks = (category: CategoryMainInfo) => {
  const links = [];
  const buildSlug = (cat: CategorySlugs): string => {
    if (!cat.parent_category) {
      return cat.slug;
    }
    return `${buildSlug(cat.parent_category)}/${cat.slug}`;
  };

  let currentCategory: CategorySlugs | null = category;

  // نبدأ بالتنقل في الشجرة، لكن نستثني العنصر الذي بدأنا به
  while (currentCategory?.parent_category) {
    links.unshift({
      name: currentCategory.name,
      slug: `/category/${buildSlug(currentCategory)}`,
    });
    currentCategory = currentCategory.parent_category;
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
    currentCategory = currentCategory.parent_category;
  }

  return slugs;
};

const Page: FC<PropsType> = async props => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const {
    subSubCategory,
    locale
  } = params;

  try {
    const cookieStore = await cookies();
    const t = await getTranslations();
    const session = await getSession();
    const userToken = cookieStore.get("x-user-session")?.value || "";
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

    if (!data.ok || data.status === 404) return notFound();
    const { category: categoryData } = data.data;
    return (
      <PageWrapper>
        <SectionWrapper className="px-2.5 md:px-4 lg:px-6 xl:px-7 py-4 md:py-4 lg:py-8 max-w-screen-xl space-y-8">
          <CustomBreadcrumb
            activeLink={categoryData.name}
            links={getBreadcrumbLinks(categoryData)}
          />
          <div className="text-primary max-w-screen-md mx-auto space-y-4">
            <h1 className="text-3xl font-bold">{categoryData.name}</h1>
            <p>{categoryData.description}</p>
          </div>
          <nav className="pt-5 flex justify-start max-md:overflow-x-auto md:flex-wrap items-start gap-5">
            {data.data.sub_categories.map((subSubCategory) => {
              const x = getAllSlugs(subSubCategory);
              return (
                <ClientLink
                  activeClassName="text-orange"
                  slug={subSubCategory.slug}
                  key={subSubCategory.id}
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "text-base text-foreground hover:text-orange underline px-0"
                  )}
                  href={`/category/${x.join("/")}`}
                >
                  {subSubCategory.name}
                </ClientLink>
              );
            })}
          </nav>
          <Suspense fallback={<>loading.....</>}>
            <SubCategoryProducts
              category={subSubCategory[subSubCategory.length - 1]}
              searchParams={searchParams}
            />
          </Suspense>
          {data.data.sub_categories.length > 0 ? (
            <div className="space-y-4 w-full">
              <h2 className="text-base text-center py-10 sm:text-2xl font-bold text-primary ltr:tracking-wider">
                {t("explore-our-selection")}
              </h2>
              <CarouselWithProgressBar>
                {data.data.sub_categories.map((item) => (
                  <CarouselItem
                    key={item.id}
                    className="w-full basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <CategoryCard
                      category={{
                        ...item,
                        parents_slugs: getAllSlugs(item)?.reverse(),
                      }}
                      key={item.id}
                    />
                  </CarouselItem>
                ))}
              </CarouselWithProgressBar>
            </div>
          ) : null}
        </SectionWrapper>
        <RecentlyViewed
          className={cn("mt-16", sectionWrapperClassName)}
          isLoggedIn={isLoggedIn}
          token={
            session && session.user ? session.user.access_token : userToken
          }
        />
      </PageWrapper>
    );
  } catch (error) {
    return <></>;
  }
};

export default Page;
