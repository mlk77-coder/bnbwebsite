import { FC, Suspense } from "react";
import SectionWrapper from "@/components/section-wrapper";
import { fetcher } from "@/lib/fetcher";
import { GetProductsResponse } from "@/types/products";
import { getLocale, getTranslations } from "next-intl/server";
import RelatedProductsCarousel from "./related-products-carousel";
import Loader from "@/components/ui/loader";

type PropsType = {
  id: string;
};

const RelatedProducts: FC<PropsType> = async ({ id }) => {
  try {
    const t = await getTranslations();
    const locale = await getLocale();
    const response = await fetcher<GetProductsResponse>(
      `products/${id}/similar?page=1`,
      locale
    );
    if (!response.ok) return null;
    const initialProducts = response.data.products;
    const totalPages = Math.floor(response.data.pagination.total / 15); // Assuming the API returns this information

    if (initialProducts.length === 0) return null;
    return (
      <Suspense
        fallback={
          <SectionWrapper className="space-y-10">
            <h2 className="w-full border-b pb-2 text-lg sm:text-xl font-bold text-primary ltr:tracking-wider">
              {t("related-products")}
            </h2>
            <div className="flex justify-center items-center pt-4">
              <Loader variant="bars" className="text-primary" size="lg" />
            </div>
          </SectionWrapper>
        }
      >
        <SectionWrapper className="space-y-10">
          <h2 className="w-full border-b pb-2 text-lg sm:text-xl font-bold text-primary ltr:tracking-wider">
            {t("related-products")}
          </h2>
          <RelatedProductsCarousel
            id={id}
            locale={locale}
            initialProducts={initialProducts}
            totalPages={totalPages}
          />
        </SectionWrapper>
      </Suspense>
    );
  } catch (error) {
    console.error("Error fetching initial related products:", error);
    return null;
  }
};

export default RelatedProducts;
