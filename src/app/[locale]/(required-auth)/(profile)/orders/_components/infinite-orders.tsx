"use client";
import { getOrders } from "@/api/order/get-orders";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { formatPrice } from "@/lib/utils";
import { Link } from "@/navigation";
import useCurrencyStore from "@/store/use-currency-store";
import { GetOrdersResponse } from "@/types/order";
import { useInfiniteQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { FC, Fragment, useState } from "react";

type PropsType = {
  token: string;
  initialData: GetOrdersResponse;
};
const InifinteOrders: FC<PropsType> = ({ token, initialData }) => {
  const currency = useCurrencyStore((state) => state.currency);
  const symbol = useCurrencyStore((state) => state.symbol);
  const [hasFetched, setHasFetched] = useState(false);
  const t = useTranslations();
  const locale = useLocale();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["orders", token],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await getOrders(locale, token, pageParam);
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
      <div className="w-full space-y-5">
        {data.pages[0].orders.length === 0 ? (
          <div className="flex size-full items-center justify-center rounded-3xl border border-primary/10 bg-secondary/40 px-4 py-10 text-center">
            <p className="text-lg font-bold text-primary md:text-2xl">
              {t("you-don-t-have-any-orders-yet")}
            </p>
          </div>
        ) : (
          data.pages.map((page) =>
            page.orders.map((product) => (
              <Link
                href={`/orders/${product.id}`}
                key={product.id}
                className="group grid cursor-pointer grid-cols-[auto_1fr] gap-4 rounded-3xl border border-primary/10 bg-white p-3 shadow-sm shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/10 sm:p-4"
              >
                <Image
                  src={product.image ?? "/no-product.svg"}
                  alt="men"
                  width={100}
                  height={100}
                  className="size-24 shrink-0 rounded-2xl object-cover sm:size-28"
                />
                <span className="flex size-full min-w-0 flex-col items-start justify-start gap-1">
                  <span className="flex w-full items-start justify-between gap-3">
                    <span className="truncate font-bold text-primary sm:text-xl">
                      {product.order_id}
                    </span>
                    <Badge className="shrink-0 rounded-full" variant="secondary">
                      {product.status}
                    </Badge>
                  </span>
                  <span className="text-sm font-medium text-orange">
                    {format(new Date(product.created_at), "PP")}
                  </span>
                  <span className="text-sm font-semibold">
                    {formatPrice(product.total * currency, symbol)}
                  </span>
                  <span className="rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                    {t("product-count", {
                      count: product.order_products_count,
                    })}
                  </span>
                </span>
              </Link>
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

export default InifinteOrders;
