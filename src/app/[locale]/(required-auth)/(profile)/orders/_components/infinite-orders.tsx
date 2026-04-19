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
          <div className="size-full flex justify-center items-center">
            <p className="text-xl md:text-4xl font-bold">
              {t("you-don-t-have-any-orders-yet")}
            </p>
          </div>
        ) : (
          data.pages.map((page) =>
            page.orders.map((product) => (
              <Link
                href={`/orders/${product.id}`}
                key={product.id}
                className="cursor-pointer flex justify-start items-start gap-2"
              >
                <Image
                  src={product.image ?? ""}
                  alt="men"
                  width={100}
                  height={100}
                  className="size-28 shrink-0 object-cover"
                />
                <span className="size-full flex flex-col justify-start items-start">
                  <span className="w-full">
                    <span className="sm:text-xl font-bold">
                      {product.order_id}
                    </span>
                  </span>
                  <span className="text-orange">
                    {format(new Date(product.created_at), "PP")}
                  </span>
                  <span>{formatPrice(product.total * currency, symbol)}</span>
                  <span className="underline underline-offset-4 text-primary">
                    {t("product-count", {
                      count: product.order_products_count,
                    })}
                  </span>
                </span>
                <Badge variant="secondary">{product.status}</Badge>
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

export default InifinteOrders;
