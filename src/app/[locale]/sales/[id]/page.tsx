import getProductList from "@/api/products/get-products";
import CustomBreadcrumb from "@/components/custom-breadcrumb";
import PageWrapper from "@/components/page-wrapper";
import SectionWrapper, {
  sectionWrapperClassName,
} from "@/components/section-wrapper";
import { getTranslations } from "next-intl/server";
import { FC } from "react";
import InifinteProducts from "../../products/_components/inifinte-products";
import ProductsFilters from "../../products/_components/products-filters";
import RecentlyViewed from "../../_components/recently-viewed";
import { cookies, headers } from "next/headers";
import getSession from "@/lib/get-session";

type PropsType = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
  searchParams: Promise<Record<string, string>>;
};

const Page: FC<PropsType> = async props => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const {
    locale,
    id
  } = params;

  const cookieStore = await cookies();
  const session = await getSession();
  const userToken = cookieStore.get("x-user-session")?.value || "";
  const isLoggedIn = Boolean(session && session.user);
  const t = await getTranslations();
  const headersList = await headers();
  const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
    headers: headersList,
  });
  const response = await getProductList(
    "",
    {
      ...searchParams,
      discount_id: id,
    },
    locale,
    request
  );
  if (!response.ok) return <>error</>;
  const { data: productList } = response;
  try {
    return (
      <PageWrapper>
        <SectionWrapper className="px-2.5 md:px-4 lg:px-6 xl:px-7 py-4 md:py-4 lg:py-8 max-w-screen-xl space-y-8">
          <CustomBreadcrumb activeLink={"SALE"} links={[]} />

          <div className="flex flex-col-reverse sm:flex-row justify-between items-start gap-5">
            <p className="flex justify-start items-start w-full">
              {t("product-count", { count: productList.pagination.total })}
            </p>
            <ProductsFilters
              priceRange={productList.range_price}
              attributes={productList.attributes}
            />
          </div>
          <InifinteProducts initialData={productList} isSales={id} slug={""} />
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
    return <div>error</div>;
  }
};

export default Page;
