import RecentlyViewed from "@/app/[locale]/_components/recently-viewed";
import CustomBreadcrumb from "@/components/custom-breadcrumb";
import PageWrapper from "@/components/page-wrapper";
import SectionWrapper, {
  sectionWrapperClassName,
} from "@/components/section-wrapper";
import { SubCategoryProducts } from "@/features/categories";
import { SALE_ROOT_COPY } from "@/features/sale/lib/sale-category-copy";
import getSession from "@/lib/get-session";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { FC } from "react";

type PropsType = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<Record<string, string>>;
};

const SaleRootPage: FC<PropsType> = async (props) => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const { locale } = params;

  const session = await getSession();
  const cookieStore = await cookies();
  const userToken = cookieStore.get("x-user-session")?.value || "";
  const isLoggedIn = Boolean(session && session.user);

  const t =
    SALE_ROOT_COPY[locale as keyof typeof SALE_ROOT_COPY] || SALE_ROOT_COPY.en;

  const categoryData = { title: t.sale, description: t.saleDescription };

  try {
    return (
      <PageWrapper>
        <SectionWrapper className="max-w-screen-xl space-y-8 px-2.5 py-4 md:px-4 md:py-4 lg:px-6 lg:py-8 xl:px-7">
          <CustomBreadcrumb activeLink={t.sale || ""} links={[]} />
          <div className="mx-auto max-w-screen-md space-y-4 text-primary">
            <h1 className="text-3xl font-bold">{categoryData?.title || ""}</h1>
            <p>{categoryData?.description || ""}</p>
          </div>
          <SubCategoryProducts
            category={""}
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

export default SaleRootPage;
