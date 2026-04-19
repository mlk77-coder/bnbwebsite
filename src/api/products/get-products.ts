import { fetcher } from "@/lib/fetcher";
import { GetProductsResponse } from "@/types/products";

const getProductList = async (
  slug: string,
  params: Record<string, string> = {},
  locale: string = "en",
  request?: any
) => {
  const response = await fetcher<GetProductsResponse>(
    `category/products/${slug}?${new URLSearchParams(params).toString()}`,
    locale,
    undefined,
    false,
    request
  );

  return response;
};

export default getProductList;
