import { getProductDetails } from "@/api/products/get-product-details";
import PageWrapper from "@/components/page-wrapper";
import SectionWrapper, {
  sectionWrapperClassName,
} from "@/components/section-wrapper";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import getSession from "@/lib/get-session";
import { cleanDescription, cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import { FC } from "react";
import RecentlyViewed from "../../_components/recently-viewed";
import ProductImagesSlider from "../_components/product-images-slider";
import ProductPrice from "../_components/product-price";
import ProductPageMetaData from "../meta-data";
import AddToCartButton from "./_components/add-to-cart-button";
import DeliveryAlert from "./_components/delivery-alert";
import DetailsAccordion from "./_components/details-accordion";
import ProductBreadcrumb from "./_components/product-breadcrumb";
import ProductDetails from "./_components/product-details";
import ProductSelectQuantity from "./_components/product-select-quantity";
import ProductVariants from "./_components/product-variants";
import RelatedProducts from "./_components/related-products";
import ReviewsContainer from "./_components/reviews/reviews-container";
import SizeChartDialog from "./_components/size-chart-dialog";
import WishToggleButton from "./_components/wish-toggle-button";

type PropsType = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata(props: PropsType): Promise<Metadata> {
  const params = await props.params;
  return ProductPageMetaData(params);
}

const Page: FC<PropsType> = async props => {
  const params = await props.params;

  const {
    locale,
    slug
  } = params;

  const cookieStore = await cookies();
  const session = await getSession();
  const isLoggedIn = Boolean(session && session.user);
  const userToken = cookieStore.get("x-user-session")?.value || "";
  const headersList = await headers();
  const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
    headers: headersList,
  });
  const token = isLoggedIn ? session?.user?.access_token || "" : userToken;
  const t = await getTranslations();
  const response = await getProductDetails(
    slug,
    locale,
    isLoggedIn,
    token,
    request
  );
  if (!response.ok) notFound();
  const data = response.data;
  return (
    <PageWrapper>
      <SectionWrapper className="size-full space-y-4 md:py-4 lg:py-6 max-w-screen-2xl">
        <ProductBreadcrumb category={data.product.category} />
        <div className="size-full relative grid grid-cols-1 md:grid-cols-10 items-start gap-6 md:gap-12">
          <div className="flex flex-col md:col-span-5 gap-10">
            <ProductImagesSlider
              name={data.product.name}
              gallery={data.product.gallery.map((g) => g.url)}
              mainImage={data.product.image}
            />
            <div className="hidden md:block">
              <ReviewsContainer
                slug={slug}
                token={session?.user?.access_token || ""}
              />
            </div>
          </div>
          <div className="space-y-5 md:sticky md:top-20 md:col-span-5">
            <div>
              <h1 className="text-primary font-medium text-xl">
                {data.product.name}
              </h1>
              {data.product.code ? (
                <span className="text-orange text-sm">{data.product.code}</span>
              ) : null}
            </div>
            <ProductPrice defaultProduct={data.product} />
            <div
              className="max-md:hidden"
              dangerouslySetInnerHTML={{
                __html: cleanDescription(data.product.description),
              }}
            />
            <Separator />
            <ProductVariants
              slug={slug}
              product={data.product}
              attributes={data.attributes}
            />
            <div className="space-y-3">
              <SizeChartDialog type={data.product.category.size_chart_type} />
              <div className="flex justify-start items-center gap-3">
                <h3 className="font-bold text-primary">{t("quantity")}:</h3>
                <ProductSelectQuantity />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row w-full justify-center items-center gap-3">
              <AddToCartButton
                userToken={userToken}
                slug={slug}
                product={data.product}
              />
              <WishToggleButton session={session} id={data.product.id} />
            </div>
            <div
              className="md:hidden"
              dangerouslySetInnerHTML={{
                __html: cleanDescription(data.product.description),
              }}
            />
            <DetailsAccordion details={data.product.details} />
            <p className="!mt-0 max-md:text-sm">
              {t.rich("looking-to-buy-a-large-order", {
                link: (children) => (
                  <Link
                    href="/contact-us"
                    className={cn(
                      buttonVariants({ variant: "link" }),
                      "px-0 hover:text-orange text-base"
                    )}
                  >
                    {children}
                  </Link>
                ),
              })}
            </p>
            <div className="max-md:hidden">
              <DeliveryAlert />
            </div>
            <div className="max-md:hidden">
              <ProductDetails details={data.product.details} />
            </div>
          </div>
          <div className="md:hidden block">
            <ReviewsContainer
              slug={slug}
              token={session?.user?.access_token || ""}
            />
          </div>
        </div>
      </SectionWrapper>
      <RelatedProducts id={data.product.slug} />
      <RecentlyViewed
        className={cn(sectionWrapperClassName)}
        isLoggedIn={isLoggedIn}
        token={session && session.user ? session.user.access_token : userToken}
      />
    </PageWrapper>
  );
};

export default Page;
