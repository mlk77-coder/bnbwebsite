import { getCategory } from "@/api/categories/get-category-details";
import RecentlyViewed from "@/app/[locale]/_components/recently-viewed";
import CategoryBigCard from "@/components/category-big-card";
import CustomBreadcrumb from "@/components/custom-breadcrumb";
import PageWrapper from "@/components/page-wrapper";
import SectionWrapper, {
  sectionWrapperClassName,
} from "@/components/section-wrapper";
import { buttonVariants } from "@/components/ui/button";
import getSession from "@/lib/get-session";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import { FC } from "react";
import CarouselWithProgressBar from "@/components/carousel-with-progress-bar";
import { CarouselItem } from "@/components/ui/carousel";
import SubCategoryProducts from "../../../components/sub-category-products";
import { getAllSlugs } from "./[...subSubCategory]/page";

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

  const {
    subCategory,
    locale
  } = params;

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
          "max-snippet": -1,
          "max-image-preview": "standard",
          "max-video-preview": -1,
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
          siteName: "BNB Store",
          locale,
          images: [categoryData.image || ""],
        },
      };
    } else {
      return {
        title: "Unknown Category",
        description: "No description available for this category.",
      };
    }
  } catch (error) {
    return {
      title: "Error",
      description: "Unable to fetch category data at the moment.",
    };
  }
}
const Page: FC<PropsType> = async props => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const {
    category,
    subCategory,
    locale
  } = params;

  try {
    const cookieStore = await cookies();
    const session = await getSession();
    const userToken = cookieStore.get("x-user-session")?.value || "";
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

    const {
      category: categoryData,
      sub_categories,
      sub_sub_categories,
    } = data.data;
    return (
      <PageWrapper>
        <SectionWrapper className="px-2.5 md:px-4 lg:px-6 xl:px-7 py-4 md:py-4 lg:py-8 max-w-7xl space-y-8">
          <CustomBreadcrumb
            activeLink={categoryData.name}
            links={[
              {
                name: categoryData.parent_category.name,
                slug: `/category/${category}`,
              },
            ]}
          />
          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-primary text-3xl font-bold">{categoryData.name}</h1>
            <p>{categoryData.description}</p>
          </div>
          {sub_categories.length > 1 ? (
            <CarouselWithProgressBar>
              {sub_categories.map((c) => {
                const x = getAllSlugs(c);
                return (
                  <CarouselItem key={c.id} className="md:basis-1/2 size-fit">
                    <CategoryBigCard
                      className="size-full"
                      href={`/category/${x.join("/")}`}
                      image={c.image}
                      name={c.name}
                    />
                  </CarouselItem>
                );
              })}
            </CarouselWithProgressBar>
          ) : null}
          <nav className="pt-5 flex justify-start overflow-x-auto md:flex-wrap items-start gap-5">
            {sub_sub_categories.map((c) => {
              const x = getAllSlugs(c);
              return (
                <Link
                  key={c.id}
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "text-base shrink-0 text-foreground hover:text-orange underline px-0"
                  )}
                  href={`/category/${x.join("/")}`}
                >
                  {c.name}
                </Link>
              );
            })}
          </nav>
          <SubCategoryProducts
            category={subCategory}
            searchParams={searchParams}
          />
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
    return notFound();
  }
};

export default Page;
