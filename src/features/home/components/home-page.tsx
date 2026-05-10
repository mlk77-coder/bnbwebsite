import RecentlyViewed from "@/app/[locale]/_components/recently-viewed";
import PageWrapper from "@/components/page-wrapper";
import SectionWrapper, {
  sectionWrapperClassName,
} from "@/components/section-wrapper";
import { getCategories } from "@/features/categories";
import { CategoriesCarousel } from "@/features/home/client/categories-carousel";
import { FeaturedProducts } from "@/features/home/client/featured-products";
import { HeroSection } from "@/features/home/client/hero-section";
import { getProducts } from "@/features/products";
import getSession from "@/lib/get-session";
import { heroDummyContent } from "@/lib/hero-section-dummy-data";
import { cn } from "@/lib/utils";
import { cookies, headers } from "next/headers";
import { FC } from "react";

type PropsType = {
  params: Promise<{ locale: string }>;
};

const HomePage: FC<PropsType> = async (props) => {
  const params = await props.params;

  const { locale } = params;

  const cookieStore = await cookies();
  const session = await getSession();
  const userToken = cookieStore.get("x-user-session")?.value || "";
  const isLoggedIn = Boolean(session && session.user);
  const headersList = await headers();
  const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
    headers: headersList,
  });
  const [categories, productsResponse] = await Promise.all([
    getCategories(locale, request),
    getProducts({ per_page: "20" }, locale, request),
  ]);
  const products = productsResponse.ok ? productsResponse.data.products : [];
  const homeCategories = categories.map((category) => ({
    id: category.id,
    name: category.name,
    slug: String(category.id),
    image: category.image,
    parents_slugs: [],
  }));

  return (
    <PageWrapper>
      <h1 className="sr-only">Welcome to BNB Store</h1>
      <HeroSection
        content={heroDummyContent}
        bestSellingProducts={products}
        highlightedProducts={products}
        discounts={null}
        collectionsCategories={homeCategories.slice(0, 4)}
      />
      <SectionWrapper className="bg-transparent py-0!">
        <CategoriesCarousel categories={homeCategories} />
      </SectionWrapper>

      <FeaturedProducts categories={homeCategories} products={products} />

      <RecentlyViewed
        className={cn("mt-16", sectionWrapperClassName)}
        isLoggedIn={isLoggedIn}
        token={
          session && session.user ? session.user.access_token : userToken
        }
      />
    </PageWrapper>
  );
};

export default HomePage;
