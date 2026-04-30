"use client";
import {
  getRecentlyViewed,
  GetRecentlyViewedResponse,
} from "@/api/recently-viewed/get-recently-viewed";
import ProductCard from "@/components/product-card/product-card";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { FC, Fragment, useState } from "react";

type PropsType = {
  token: string;
  initialData: GetRecentlyViewedResponse;
};
const InifinteRecentViewed: FC<PropsType> = ({ token, initialData }) => {
  const [hasFetched, setHasFetched] = useState(false);
  const t = useTranslations();
  const locale = useLocale();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["user-recently-viewed", token],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await getRecentlyViewed(locale, token, pageParam, true);
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
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.pages[0].products.length === 0 ? (
          <p className="col-span-full rounded-3xl border border-primary/10 bg-secondary/40 px-4 py-8 text-center text-sm text-muted-foreground">
            {t("recently-viewed-empty")}
          </p>
        ) : (
          data.pages.map((page) =>
            page.products.map((product) => (
              <div
                key={product.id}
                className="rounded-3xl border border-primary/10 bg-white p-2 shadow-sm shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/10"
              >
                <ProductCard product={product} />
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
            className="rounded-full border-primary/20 px-8 hover:bg-primary hover:text-primary-foreground"
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

export default InifinteRecentViewed;
