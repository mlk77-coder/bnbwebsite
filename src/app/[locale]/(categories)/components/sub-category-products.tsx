import getProductList from "@/api/products/get-products";
import { FC } from "react";
import ProductsFilters from "../../products/_components/products-filters";
import InifinteProducts from "../../products/_components/inifinte-products";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import ActiveFilters from "../../products/_components/active-filters";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { Undo2Icon } from "lucide-react";
import { headers } from "next/headers";

type PropsType = {
  searchParams: Record<string, string>;
  category: string;
};

const SubCategoryProducts: FC<PropsType> = async ({
  category,
  searchParams,
}) => {
  try {
    const t = await getTranslations();
    const locale = await getLocale();
    const headersList = await headers();
    const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
      headers: headersList,
    });
    const response = await getProductList(
      category,
      searchParams,
      locale,
      request
    );
    if (!response.ok) return <>error</>;
    const { data: productList } = response;
    return (
      <>
        {productList.products.length !== 0 ||
        Object.keys(searchParams).length === 0 ? (
          <div className="flex flex-col-reverse sm:flex-row justify-between items-start gap-5">
            <p className="flex justify-start items-start w-full">
              {t("product-count", { count: productList.pagination.total })}
            </p>
            <ProductsFilters
              priceRange={productList.range_price}
              attributes={productList.attributes}
            />
          </div>
        ) : null}
        <ActiveFilters attributes={productList.attributes} />
        {productList.products.length === 0 ? (
          <div className="flex justify-center flex-col gap-4 items-center py-4">
            <Image
              src="/no-product.svg"
              alt="no product avatar"
              width={300}
              height={300}
            />
            <p className="text-xl sm:text-2xl font-medium text-primary">
              {t("product-count", { count: productList.pagination.total })}
            </p>
            <Link
              href="/"
              className={cn(
                " flex gap-1.5 text-primary items-center relative before:content-[''] before:absolute before:-bottom-0.5 before:w-full before:h-px before:bg-primary hover:before:hidden"
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
  } catch (error) {
    return <>error</>;
  }
};

export default SubCategoryProducts;
