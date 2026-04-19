"use client";

import useDebounceValue from "@/app/hooks/use-debounce-value";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip } from "@/components/ui/tooltip";
import axiosInstance from "@/lib/axios";
import { cn } from "@/lib/utils";
import { ApiResponse, Pagination } from "@/types";
import { HomePageCategory, HomePageDiscount } from "@/types/home";
import { ProductCard as ProductCardType } from "@/types/products";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Search, X, TrendingUp, Sparkles, Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect, FC } from "react";

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

type SearchHeaderProps = {
  isMobile?: boolean;
};

const SearchHeader: FC<SearchHeaderProps> = ({ isMobile = false }) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const t = useTranslations();
  const locale = useLocale();
  const debouncedSearch = useDebounceValue(search, 400);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Custom click away handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["search-header", debouncedSearch[0], locale],
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
      getNextPageParam: (lastPage: SearchResponse) => {
        if (
          typeof lastPage.search.products.pagination.next_page_url === "string"
        ) {
          return lastPage.search.products.pagination.current_page + 1;
        }
        return undefined;
      },
      enabled: !!debouncedSearch[0] && isOpen,
    });

  const categories: HomePageCategory[] = data?.pages[0]?.search.categories.data ?? [];
  const products: ProductCardType[] = data?.pages[0]?.search.products.data ?? [];

  // Popular searches suggestions
  const popularSearches = [
    t("new-arrivals"),
    t("sale"),
    t("categories"),
  ];

  const handleClear = () => {
    setSearch("");
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    setIsFocused(true);
    setIsOpen(true);
  };

  if (isMobile) {
    return (
      <>
        <Tooltip text={t("search")}>
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-gray-100/80 transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <Search className="w-5 h-5 text-gray-700" />
          </Button>
        </Tooltip>

        {/* Mobile Search Overlay */}
        {isOpen && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col">
            {/* Mobile Search Header */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-100">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  ref={inputRef}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t("search-the-store")}
                  className="pl-10 pr-10 h-11 bg-gray-50 border-gray-200 rounded-full text-base focus-visible:ring-2 focus-visible:ring-primary/30"
                  autoFocus
                />
                {search && (
                  <button
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsOpen(false);
                  setSearch("");
                }}
              >
                {t("cancel")}
              </Button>
            </div>

            {/* Mobile Search Results */}
            <div className="flex-1 overflow-y-auto p-4">
              {!search ? (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    {t("popular-searches")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearch(term)}
                        className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : status === "pending" ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : status === "error" ? (
                <p className="text-center py-8 text-red-500">
                  {t("error-something-went-wrong")}
                </p>
              ) : (
                <div className="space-y-6">
                  {/* Categories */}
                  {categories.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 mb-3">
                        {t("categories")}
                      </h3>
                      <ul className="space-y-2">
                        {categories.map((category) => (
                          <li key={category.id}>
                            <Link
                              href={`/category/${category.slug}`}
                              onClick={() => setIsOpen(false)}
                              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-primary" />
                              </div>
                              <span className="text-gray-700">{category.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Products */}
                  {products.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 mb-3">
                        {t("products")}
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {products.slice(0, 4).map((product) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="group"
                          >
                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 relative">
                              {product.image && (
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                  sizes="(max-width: 768px) 50vw, 200px"
                                />
                              )}
                            </div>
                            <p className="text-sm text-gray-700 line-clamp-2 group-hover:text-primary transition-colors">
                              {product.name}
                            </p>
                            <p className="text-sm font-semibold text-primary mt-1">
                              {product.price}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {categories.length === 0 && products.length === 0 && (
                    <p className="text-center py-8 text-gray-500">
                      {t("no-results-found")}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      {/* Desktop Search Input */}
      <div
        className={cn(
          "relative flex items-center transition-all duration-300",
          isFocused && "scale-[1.02]"
        )}
      >
        <div
          className={cn(
            "absolute inset-y-0 inset-s-0 ps-4 flex items-center pointer-events-none transition-colors",
            isFocused ? "text-primary" : "text-gray-400"
          )}
        >
          <Search className="w-5 h-5" />
        </div>
        <Input
          ref={inputRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={handleFocus}
          placeholder={t("search-placeholder")}
          className={cn(
            "w-full pl-12 pr-10 h-11 bg-gray-50/80 border-gray-200/80 rounded-xl text-sm",
            "placeholder:text-gray-400",
            "focus-visible:bg-white focus-visible:border-primary/30 focus-visible:ring-4 focus-visible:ring-primary/10",
            "transition-all duration-300 ease-out",
            isFocused && "shadow-lg shadow-primary/5"
          )}
        />
        {search && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <div className="p-1 hover:bg-gray-200 rounded-full transition-colors">
              <X className="w-4 h-4 text-gray-400" />
            </div>
          </button>
        )}
        
        {/* Search Button */}
        <Button
          size="sm"
          className={cn(
            "absolute inset-e-1.5 h-8 px-4 rounded-lg transition-all duration-300",
            isFocused || search
              ? "bg-primary text-primary-foreground opacity-100"
              : "opacity-0 pointer-events-none"
          )}
        >
          {t("search")}
        </Button>
      </div>

      {/* Desktop Search Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden z-50">
          <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">
            {!search ? (
              <div className="p-4">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  {t("popular-searches")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearch(term)}
                      className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-full text-sm text-gray-600 hover:text-gray-900 transition-all duration-200"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : status === "pending" ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : status === "error" ? (
              <p className="text-center py-8 text-red-500">
                {t("error-something-went-wrong")}
              </p>
            ) : (
              <div className="p-4 space-y-4">
                {/* Categories Section */}
                {categories.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      {t("categories")}
                    </h3>
                    <div className="grid grid-cols-1 gap-1">
                      {categories.slice(0, 5).map((category) => {
                        const parent = category.parents_slugs;
                        const categoryPath = parent
                          ? `/category/${parent
                              .slice()
                              .reverse()
                              .join("/")}`
                          : `/category/${category.slug}`;
                        return (
                          <Link
                            key={category.id}
                            href={categoryPath}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-xl transition-colors group"
                          >
                            <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                              <Sparkles className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-sm text-gray-700 group-hover:text-gray-900">
                              {category.name}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Products Section */}
                {products.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      {t("products")}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {products.slice(0, 4).map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="group p-2 hover:bg-gray-50 rounded-xl transition-colors"
                        >
                          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 relative">
                            {product.image && (
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="200px"
                              />
                            )}
                          </div>
                          <p className="text-sm text-gray-700 line-clamp-2 group-hover:text-primary transition-colors">
                            {product.name}
                          </p>
                          {product.price && (
                            <p className="text-sm font-semibold text-primary mt-1">
                              {product.price}
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {categories.length === 0 && products.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">
                      {t("no-results-for")} &quot;{search}&quot;
                    </p>
                  </div>
                )}

                {/* Load More */}
                {hasNextPage && (
                  <div className="pt-2 border-t border-gray-100">
                    <Button
                      onClick={() => fetchNextPage()}
                      disabled={isFetchingNextPage}
                      variant="ghost"
                      className="w-full"
                    >
                      {isFetchingNextPage ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : null}
                      {t("load-more")}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchHeader;
