import { getCategory } from "@/api/categories/get-category-details";
import getProductList from "@/api/products/get-products";
import CarouselWithProgressBar from "@/components/carousel-with-progress-bar";
import CategoryBigCard from "@/components/category-big-card";
import CustomBreadcrumb from "@/components/custom-breadcrumb";
import PageWrapper from "@/components/page-wrapper";
import ProductCard from "@/components/product-card/product-card";
import SectionWrapper, {
  sectionWrapperClassName,
} from "@/components/section-wrapper";
import { buttonVariants } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";
import getSession from "@/lib/get-session";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import { FC } from "react";
import RecentlyViewed from "../../../_components/recently-viewed";
import { getAllSlugs } from "./[subCategory]/[...subSubCategory]/page";

type PropsType = {
  params: Promise<{
    locale: string;
    category: string;
  }>;
};

export async function generateMetadata(props: PropsType): Promise<Metadata> {
  const params = await props.params;

  const {
    category,
    locale
  } = params;

  try {
    const data = await getCategory(category, locale);
    if (data.ok) {
      const { category: categoryData } = data.data;

      // Check if there are no products and add 'noindex' if true
      const noindex = !data.data.products || data.data.products.length === 0;

      return {
        title: categoryData.name,
        description: categoryData.description,
        robots: {
          index: !noindex, // Prevent indexing if no products
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
            en: `${process.env.NEXT_PUBLIC_LOCAL_URL}/en/category/${categoryData.slug}`,
            ar: `${process.env.NEXT_PUBLIC_LOCAL_URL}/ar/category/${categoryData.slug}`,
          },
        },
        openGraph: {
          url: `${process.env.NEXT_PUBLIC_LOCAL_URL}/${locale}/category/${categoryData.slug}`,
          title: categoryData.name,
          description: categoryData.description,
          siteName: "BNB Store",
          locale,
          images: [categoryData.image || ""],
        },
      };
    } else {
      return {
        title: "Default Category",
        description: "Default description for category",
      };
    }
  } catch (error) {
    console.error("Error fetching category data:", error);
    return {
      title: "Error",
      description: "Unable to fetch category data at the moment.",
    };
  }
}

const Page: FC<PropsType> = async props => {
  const params = await props.params;

  const {
    category,
    locale
  } = params;

  // unstable_setRequestLocale(locale);
  const cookieStore = await cookies();
  const session = await getSession();
  const userToken = cookieStore.get("x-user-session")?.value || "";
  const isLoggedIn = Boolean(session && session.user);
  const t = await getTranslations();
  const categoryDetail = getCategory(category, locale);
  const headersList = await headers();
  const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
    headers: headersList,
  });
  const products = await getProductList(category, {}, locale, request);
  const [data, productList] = await Promise.all([categoryDetail, products]);
  if (!data.ok) return <>error</>;
  if (data.status === 404) return notFound();
  const { category: categoryData, sub_sub_categories } = data.data;
  return (
    <PageWrapper>
      <SectionWrapper className="px-2.5 md:px-4 lg:px-6 xl:px-7 py-4 md:py-4 lg:py-8 max-w-7xl space-y-12">
        <CustomBreadcrumb activeLink={categoryData.name} links={[]} />
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-primary text-3xl font-bold">{categoryData.name}</h1>
          <p>{categoryData.description}</p>
        </div>

        <CarouselWithProgressBar>
          {data.data.sub_categories.length > 1
            ? data.data.sub_categories.map((c) => (
                <CarouselItem key={c.id} className="md:basis-1/2 size-fit">
                  <CategoryBigCard
                    className="size-full"
                    href={`/category/${category}/${c.slug}`}
                    image={c.image}
                    name={c.name}
                  />
                </CarouselItem>
              ))
            : null}
        </CarouselWithProgressBar>

        {productList.ok ? (
          productList.data.products.length > 0 ? (
            <div className="space-y-10 w-full">
              <h2 className="w-full text-center border-b py-10 text-lg sm:text-2xl font-bold text-primary ltr:tracking-wider">
                {t("new-arrivals")}
              </h2>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {productList.data.products.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="w-full flex justify-center items-center">
                <Link
                  href={`/new-arrivals/${category}`}
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "uppercase rounded-none"
                  )}
                >
                  {t("show-more")}
                </Link>
              </div>
            </div>
          ) : null
        ) : (
          <>error</>
        )}
        {sub_sub_categories.length > 0 ? (
          <div className="space-y-4 w-full">
            <h2 className="text-base text-center py-10 sm:text-2xl font-bold text-primary ltr:tracking-wider">
              {t("explore-our-selection")}
            </h2>
            <CarouselWithProgressBar>
              {sub_sub_categories.length > 0
                ? sub_sub_categories.map((c) => {
                    const x = getAllSlugs(c);
                    return (
                      <CarouselItem
                        key={c.id}
                        className="md:basis-1/2 size-fit"
                      >
                        <CategoryBigCard
                          className="size-full"
                          href={`/category/${x.join("/")}`}
                          image={c.image}
                          name={c.name}
                        />
                      </CarouselItem>
                    );
                  })
                : null}
            </CarouselWithProgressBar>
          </div>
        ) : null}
      </SectionWrapper>
      <RecentlyViewed
        className={cn("mt-16", sectionWrapperClassName)}
        isLoggedIn={isLoggedIn}
        token={session && session.user ? session.user.access_token : userToken}
      />
    </PageWrapper>
  );
};

export default Page;
