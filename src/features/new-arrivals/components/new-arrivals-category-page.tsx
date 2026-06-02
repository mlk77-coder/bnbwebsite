import RecentlyViewed from "@/app/[locale]/_components/recently-viewed";
import CustomBreadcrumb from "@/components/custom-breadcrumb";
import PageWrapper from "@/components/page-wrapper";
import SectionWrapper, {
  sectionWrapperClassName,
} from "@/components/section-wrapper";
import { SubCategoryProducts } from "@/features/categories";
import { CollectionPageHeader } from "@/features/product-collections/components/collection-page-header";
import getSession from "@/lib/get-session";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";
import { FC, Suspense } from "react";

type PropsType = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
  searchParams: Promise<Record<string, string>>;
};

const NewArrivalsCategoryPage: FC<PropsType> = async (props) => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const { slug } = params;

  try {
    const cookieStore = await cookies();
    const session = await getSession();
    const userToken = cookieStore.get("x-user-session")?.value || "";
    const isLoggedIn = Boolean(session && session.user);
    const t = await getTranslations();
    return (
      <PageWrapper>
        <SectionWrapper className="space-y-8! md:py-4 lg:py-8">
          <CustomBreadcrumb activeLink={t("new-arrivals")} links={[]} />
          <CollectionPageHeader
            title={t("new-arrivals")}
            description={t("new-arrivals-description")}
          />
          <Suspense
            fallback={
              <p className='text-muted-foreground text-sm'>
                {t('products-loading')}
              </p>
            }
          >
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
  } catch {
    const t = await getTranslations();
    return (
      <PageWrapper>
        <SectionWrapper>
          <p className='text-muted-foreground text-sm'>
            {t('errors.load-page-error')}
          </p>
        </SectionWrapper>
      </PageWrapper>
    );
  }
};

export default NewArrivalsCategoryPage;
