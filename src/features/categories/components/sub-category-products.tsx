import { getProductList } from "@/features/products";
import InifinteProducts from "@/app/[locale]/products/_components/inifinte-products";
import ProductCard from "@/components/product-card/product-card";
import getSession from "@/lib/get-session";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { CategoryMainInfo } from "@/types/categories";
import { Undo2Icon } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import Image from "next/image";
import { FC } from "react";

type PropsType = {
  searchParams: Record<string, string>;
  category: string;
  fallbackCategories?: CategoryMainInfo[];
};

const MAX_FALLBACK_CATEGORY_REQUESTS = 4;
const FALLBACK_PRODUCTS_PER_CATEGORY = 8;

const SubCategoryProducts: FC<PropsType> = async ({
  category,
  searchParams,
  fallbackCategories = [],
}) => {
  try {
    const t = await getTranslations();
    const locale = await getLocale();
    const session = await getSession();
    const token = session?.user?.access_token ?? "";
    const headersList = await headers();
    const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
      headers: headersList,
    });
    const response = await getProductList(
      category,
      searchParams,
      locale,
      request,
      token
    );
    if (!response.ok) return <>error</>;
    const { data: productList } = response;
    const shouldLoadFallbackProducts =
      productList.products.length === 0 &&
      fallbackCategories.length > 0 &&
      Object.keys(searchParams).length === 0;
    const fallbackSections = shouldLoadFallbackProducts
      ? await Promise.all(
          fallbackCategories
            .slice(0, MAX_FALLBACK_CATEGORY_REQUESTS)
            .map(async (fallbackCategory) => {
              const productsResponse = await getProductList(
                String(fallbackCategory.id),
                { per_page: String(FALLBACK_PRODUCTS_PER_CATEGORY) },
                locale,
                request,
                token
              );

              if (
                !productsResponse.ok ||
                productsResponse.data.products.length === 0
              ) {
                return null;
              }

              return {
                category: fallbackCategory,
                products: productsResponse.data.products,
                total: productsResponse.data.pagination.total,
              };
            })
        )
      : [];
    const visibleFallbackSections = fallbackSections.filter(Boolean);

    if (visibleFallbackSections.length > 0) {
      const total = visibleFallbackSections.reduce(
        (sum, section) => sum + (section?.total || 0),
        0
      );
      const mergedProducts = visibleFallbackSections
        .flatMap((section) => section?.products || [])
        .filter(
          (product, index, array) =>
            array.findIndex((item) => item.id === product.id) === index
        );

      return (
        <div className="space-y-5">
          <p className="flex w-full items-start justify-start">
            {t("product-count", { count: total })}
          </p>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5">
            {mergedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      );
    }

    return (
      <>
        {productList.products.length !== 0 ||
        Object.keys(searchParams).length === 0 ? (
          <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
            <p className="flex w-full items-start justify-start">
              {t("product-count", { count: productList.pagination.total })}
            </p>
          </div>
        ) : null}
        {productList.products.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-4">
            <Image
              src="/no-product.svg"
              alt="no product avatar"
              width={300}
              height={300}
            />
            <p className="text-primary text-xl font-medium sm:text-2xl">
              {t("product-count", { count: productList.pagination.total })}
            </p>
            <Link
              href="/"
              className={cn(
                "text-primary before:bg-primary relative flex items-center gap-1.5 before:absolute before:-bottom-0.5 before:h-px before:w-full before:content-[''] hover:before:hidden"
              )}
            >
              <Undo2Icon size={16} />
              {t("go-home")}
            </Link>
          </div>
        ) : (
          <InifinteProducts
            params={searchParams}
            initialData={productList}
            slug={category}
          />
        )}
      </>
    );
  } catch {
    return <>error</>;
  }
};

export default SubCategoryProducts;
