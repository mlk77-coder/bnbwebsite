"use client";

import useDebounceValue from "@/app/hooks/use-debounce-value";
import ProductCard from "@/components/product-card/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tooltip } from "@/components/ui/tooltip";
import axiosInstance from "@/lib/axios";
import { ApiResponse, Pagination } from "@/types";
import { HomePageCategory, HomePageDiscount } from "@/types/home";
import { ProductCard as ProductCardType } from "@/types/products";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

interface SearchResponse extends ApiResponse {
  search: {
    products: {
      data: ProductCardType[];
      pagination: Pagination;
    };
    categories: {
      data: HomePageCategory[];
      pagination: Pagination;
    };
    discounts: {
      data: HomePageDiscount[];
      pagination: Pagination;
    };
  };
}

const SearchSheet = () => {
  const [search, setSearch] = useState("");
  const t = useTranslations();
  const locale = useLocale();
  const debouncedSearch = useDebounceValue(search, 500);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["search", debouncedSearch[0], locale],
      initialPageParam: 1,
      queryFn: async ({ pageParam = 1 }) => {
        const { data } = await axiosInstance.get<SearchResponse>("search", {
          headers: { lang: locale },
          params: {
            name: debouncedSearch[0],
            page: pageParam,
          },
        });
        return data;
      },
      getNextPageParam: (lastPage) => {
        if (
          typeof lastPage.search.products.pagination.next_page_url === "string"
        ) {
          return lastPage.search.products.pagination.current_page + 1;
        } else {
          return undefined;
        }
      },
      enabled: !!debouncedSearch[0],
    });

  const categories = data?.pages[0]?.search.categories.data ?? [];
  const products = data?.pages[0].search.products.data ?? [];

  return (
    <Sheet>
      <Tooltip text={t("search")}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <span className="sr-only">Search</span>
            <Search className="size-5" />
          </Button>
        </SheetTrigger>
      </Tooltip>
      <SheetContent
        className="max-h-[80vh] flex flex-col justify-start items-start"
        side="top"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Search</SheetTitle>
          <SheetDescription>Search the store</SheetDescription>
        </SheetHeader>
        <div className="w-[calc(100%-20px)] relative">
          <Search className="absolute top-1/2 -translate-y-1/2 start-3 size-5 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("search-the-store")}
            className="text-lg outline-none rounded-none border-0 ps-10 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:border-0"
          />
        </div>
        <Separator />
        <div className="flex-1 size-full custom-scrollbar overflow-y-auto">
          {search ? (
            status === "pending" ? (
              <p className="text-center py-4">
                <Loader className="text-primary" size="lg" />
              </p>
            ) : status === "error" ? (
              <p className="text-center py-4 text-red-500">
                {t("error-something-went-wrong")}
              </p>
            ) : (
              <div className="flex px-2 flex-col space-y-8">
                {/* Categories */}
                <div className="flex flex-col max-lg:gap-8 lg:flex-row">
                  <div className="w-full lg:w-2/5">
                    <h3 className="font-semibold text-lg mb-4">
                      {t("categories")}
                    </h3>
                    {categories.length > 0 ? (
                      <ul className="space-y-3">
                        {data?.pages.map((page) =>
                          page.search.categories.data.map((category) => {
                            const parent = category.parents_slugs;
                            const categoryPath = parent
                              ? `/category/${parent
                                  .slice()
                                  .reverse()
                                  .join("/")}`
                              : `/category/${category.slug}`;
                            return (
                              <li key={category.id}>
                                <Link
                                  href={categoryPath}
                                  className="text-primary hover:underline"
                                >
                                  <SheetClose asChild key={category.id}>
                                    <span>{category.name}</span>
                                  </SheetClose>
                                </Link>
                              </li>
                            );
                          })
                        )}
                      </ul>
                    ) : (
                      <p className="text-gray-500">
                        {t("no-categories-found")}
                      </p>
                    )}
                  </div>

                  {/* Products */}
                  <div className="w-full lg:w-3/5">
                    <h3 className="font-semibold text-lg mb-2">
                      {t("products")}
                    </h3>
                    {products.length > 0 ? (
                      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {data.pages.map((page) =>
                          page.search.products.data.map((product) => (
                            <ProductCard
                              insideSheet
                              key={product.id}
                              product={product}
                            />
                          ))
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-500">{t("no-products-found")}</p>
                    )}
                  </div>
                </div>
                {hasNextPage && (
                  <div className="flex justify-center mt-8">
                    <Button
                      onClick={() => fetchNextPage()}
                      disabled={isFetchingNextPage}
                      variant="outline"
                    >
                      {isFetchingNextPage ? t("loading-more") : t("load-more")}
                    </Button>
                  </div>
                )}
              </div>
            )
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SearchSheet;
