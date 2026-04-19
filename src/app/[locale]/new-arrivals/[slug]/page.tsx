import CustomBreadcrumb from "@/components/custom-breadcrumb";
import PageWrapper from "@/components/page-wrapper";
import SectionWrapper, {
  sectionWrapperClassName,
} from "@/components/section-wrapper";
import { getTranslations } from "next-intl/server";
import { FC, Suspense } from "react";
import SubCategoryProducts from "../../(categories)/components/sub-category-products";
import { cookies } from "next/headers";
import getSession from "@/lib/get-session";
import RecentlyViewed from "../../_components/recently-viewed";

type PropsType = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
  searchParams: Promise<Record<string, string>>;
};

const Page: FC<PropsType> = async props => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const {
    slug
  } = params;

  try {
    const cookieStore = await cookies();
    const session = await getSession();
    const userToken = cookieStore.get("x-user-session")?.value || "";
    const isLoggedIn = Boolean(session && session.user);
    const t = await getTranslations();
    return (
      <PageWrapper>
        <SectionWrapper className="px-2.5 md:px-4 lg:px-6 xl:px-7 py-4 md:py-4 lg:py-8 max-w-screen-xl space-y-8">
          <CustomBreadcrumb activeLink={t("new-arrivals")} links={[]} />
          <div className="text-primary w-full space-y-4">
            <h1 className="font-bold text-primary text-xl sm:text-3xl md:text-4xl">
              {t("new-arrivals")}
            </h1>
          </div>
          <Suspense fallback={<>loading.....</>}>
            <SubCategoryProducts category={slug} searchParams={searchParams} />
          </Suspense>
        </SectionWrapper>
        <RecentlyViewed
          className={sectionWrapperClassName}
          isLoggedIn={isLoggedIn}
          token={
            session && session.user ? session.user.access_token : userToken
          }
        />
      </PageWrapper>
    );
  } catch (error) {
    return <>error</>;
  }
};

export default Page;
