import RecentlyViewed from "@/app/[locale]/_components/recently-viewed";
import CustomBreadcrumb from "@/components/custom-breadcrumb";
import PageWrapper from "@/components/page-wrapper";
import SectionWrapper, {
  sectionWrapperClassName,
} from "@/components/section-wrapper";
import { SubCategoryProducts } from "@/features/categories";
import { SALE_SLUG_COPY } from "@/features/sale/lib/sale-category-copy";
import getSession from "@/lib/get-session";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { FC } from "react";

type PropsType = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
  searchParams: Promise<Record<string, string>>;
};

const SaleSlugPage: FC<PropsType> = async (props) => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const { locale, slug } = params;

  const session = await getSession();
  const cookieStore = await cookies();
  const userToken = cookieStore.get("x-user-session")?.value || "";
  const isLoggedIn = Boolean(session && session.user);

  const t =
    SALE_SLUG_COPY[locale as keyof typeof SALE_SLUG_COPY] || SALE_SLUG_COPY.en;

  const categories = {
    woman: { title: t.woman, description: t.womanDescription },
    man: { title: t.man, description: t.manDescription },
    kids: { title: t.kids, description: t.kidsDescription },
    home: { title: t.home, description: t.homeDescription },
    beauty: { title: t.beauty, description: t.beautyDescription },
    travel: { title: t.travel, description: t.travelDescription },
  };

  const defaultCategory = { title: t.sale, description: t.saleDescription };
  const categoryKey = Object.keys(categories).find((key) => slug.includes(key));
  const categoryData = categoryKey
    ? categories[categoryKey as keyof typeof categories]
    : defaultCategory;

  try {
    return (
      <PageWrapper>
        <SectionWrapper className="max-w-screen-xl space-y-8 px-2.5 py-4 md:px-4 md:py-4 lg:px-6 lg:py-8 xl:px-7">
          <CustomBreadcrumb
            activeLink={categoryData?.title || ""}
            links={[
              {
                name: t.sale,
                slug: `/sale`,
              },
            ]}
          />
          <div className="mx-auto max-w-screen-md space-y-4 text-primary">
            <h1 className="text-3xl font-bold">{categoryData?.title || ""}</h1>
            <p>{categoryData?.description || ""}</p>
          </div>
          <SubCategoryProducts
            category={slug}
            searchParams={{ ...searchParams, has_discount: "1" }}
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
    console.log(error);
    return notFound();
  }
};

export default SaleSlugPage;
