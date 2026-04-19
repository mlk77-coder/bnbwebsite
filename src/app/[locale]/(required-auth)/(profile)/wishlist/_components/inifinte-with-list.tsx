"use client";
import { GetFavoriteResponse, getWishlist } from "@/api/favorite/get-favorite";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { FC, Fragment, useState } from "react";
import RemoveFromWishlist from "./remove-from-wishlist";
import ProductCard from "@/components/product-card/product-card";

type PropsType = {
  token: string;
  initialData: GetFavoriteResponse;
};
const InifinteWithList: FC<PropsType> = ({ token, initialData }) => {
  const t = useTranslations();
  const [hasFetched, setHasFetched] = useState(false);
  const locale = useLocale();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["user-wishlist", token],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await getWishlist(locale, token, pageParam);
        if (response.ok) return response.data;
        else return initialData;
      },
      initialPageParam: 1,
      initialData: {
        pages: [initialData],
        pageParams: [1],
      },
      getNextPageParam: (lastPage) => {
        if (typeof lastPage.pagination.next_page_url === "string") {
          return lastPage.pagination.current_page + 1;
        } else {
          return undefined;
        }
      },
      enabled: hasFetched,
    });
  const handleLoadMore = () => {
    if (!hasFetched) {
      setHasFetched(true);
      fetchNextPage();
    } else if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <Fragment>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.pages[0].products.length === 0 ? (
          <p className="bg-gray/20 rounded-lg col-span-2 w-fit py-2 px-4 lg:col-span-3 xl:col-span-4">
            {t("wishlist-empty")}
          </p>
        ) : (
          data.pages.map((page) =>
            page.products.map((product, index) => (
              <div key={product.id || index} className="relative">
                <ProductCard product={product} />
                <RemoveFromWishlist
                  id={product.id}
                  token={token}
                  name={product.name}
                />
              </div>
            ))
          )
        )}
      </div>
      <div className="w-full flex justify-center items-center">
        {hasNextPage ? (
          <Button
            variant="outline"
            size="lg"
            className="hover:bg-gray-900 hover:text-background"
            onClick={handleLoadMore}
            disabled={isFetchingNextPage || (!hasNextPage && hasFetched)}
          >
            {isFetchingNextPage ? <Loader /> : "See More"}
          </Button>
        ) : null}
      </div>
    </Fragment>
  );
};

export default InifinteWithList;
