"use client";

import { getOrders } from "@/features/orders/api/get-orders";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { formatPrice } from "@/lib/utils";
import { Link } from "@/navigation";
import useCurrencyStore from "@/store/use-currency-store";
import type { ApiPaginatedData } from "@/types";
import type { OrderSummary } from "@/types/order";
import { useInfiniteQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useLocale, useTranslations } from "next-intl";
import { Package } from "lucide-react";
import { FC, Fragment } from "react";

type PropsType = {
  token: string;
  initialData: ApiPaginatedData<OrderSummary>;
};

const InfiniteOrders: FC<PropsType> = ({ token, initialData }) => {
  const currency = useCurrencyStore((state) => state.currency);
  const symbol = useCurrencyStore((state) => state.symbol);
  const t = useTranslations();
  const locale = useLocale();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["orders", token, locale],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await getOrders(locale, token, pageParam);
        if (!response.ok || !response.data.success) {
          throw new Error("orders fetch failed");
        }
        return response.data.data;
      },
      initialPageParam: 1,
      initialData: {
        pages: [initialData],
        pageParams: [1],
      },
      staleTime: Infinity,
      getNextPageParam: (lastPage) => {
        const { current_page, last_page } = lastPage.meta;
        return current_page < last_page ? current_page + 1 : undefined;
      },
    });

  const handleLoadMore = () => fetchNextPage();

  return (
    <Fragment>
      <div className="w-full space-y-5">
        {data.pages[0].data.length === 0 ? (
          <div className="flex size-full items-center justify-center rounded-3xl border border-primary/10 bg-secondary/40 px-4 py-10 text-center">
            <p className="text-lg font-bold text-primary md:text-2xl">
              {t("you-don-t-have-any-orders-yet")}
            </p>
          </div>
        ) : (
          data.pages.map((page) =>
            page.data.map((order) => (
              <Link
                href={`/orders/${order.id}`}
                key={order.id}
                className="group grid cursor-pointer grid-cols-[auto_1fr] gap-4 rounded-3xl border border-primary/10 bg-white p-3 shadow-sm shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/10 sm:p-4"
              >
                <span className="flex size-24 shrink-0 items-center justify-center rounded-2xl bg-primary/5 text-primary sm:size-28">
                  <Package className="size-10 sm:size-12" aria-hidden />
                </span>
                <span className="flex size-full min-w-0 flex-col items-start justify-start gap-1">
                  <span className="flex w-full items-start justify-between gap-3">
                    <span className="truncate font-bold text-primary sm:text-xl">
                      {order.order_number}
                    </span>
                    <Badge className="shrink-0 rounded-full" variant="secondary">
                      {order.status}
                    </Badge>
                  </span>
                  <span className="text-sm font-medium text-orange">
                    {format(new Date(order.created_at), "PP")}
                  </span>
                  <span className="text-sm font-semibold">
                    {formatPrice(order.total * currency, symbol)}
                  </span>
                  <span className="rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                    {t("product-count", {
                      count: order.items_count,
                    })}
                  </span>
                </span>
              </Link>
            )),
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
            disabled={isFetchingNextPage || !hasNextPage}
          >
            {isFetchingNextPage ? <Loader /> : t("load-more")}
          </Button>
        ) : null}
      </div>
    </Fragment>
  );
};

export default InfiniteOrders;
