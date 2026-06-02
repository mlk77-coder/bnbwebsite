'use client';

import useDebounceValue from '@/app/hooks/use-debounce-value';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip } from '@/components/ui/tooltip';
import axiosInstance from '@/lib/axios';
import { cn } from '@/lib/utils';
import { ApiResponse, Pagination } from '@/types';
import { HomePageCategory, HomePageDiscount } from '@/types/home';
import { ProductCard as ProductCardType } from '@/types/products';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Search, X, TrendingUp, Sparkles, Loader2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect, FC } from 'react';

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
  const [search, setSearch] = useState('');
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
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['search-header', debouncedSearch[0], locale],
      initialPageParam: 1,
      queryFn: async ({ pageParam = 1 }) => {
        const { data } = await axiosInstance.get<SearchResponse>('search', {
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
          typeof lastPage.search.products.pagination.next_page_url === 'string'
        ) {
          return lastPage.search.products.pagination.current_page + 1;
        }
        return undefined;
      },
      enabled: !!debouncedSearch[0] && isOpen,
    });

  const categories: HomePageCategory[] =
    data?.pages[0]?.search.categories.data ?? [];
  const products: ProductCardType[] =
    data?.pages[0]?.search.products.data ?? [];

  // Popular searches suggestions
  const popularSearches = [t('new-arrivals'), t('sale'), t('categories')];

  const handleClear = () => {
    setSearch('');
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    setIsFocused(true);
    setIsOpen(true);
  };

  if (isMobile) {
    return (
      <>
        <Tooltip text={t('search')}>
          <Button
            variant='ghost'
            size='icon'
            className='relative transition-colors hover:bg-gray-100/80'
            onClick={() => setIsOpen(true)}
          >
            <Search className='h-5 w-5 text-gray-700' />
          </Button>
        </Tooltip>

        {/* Mobile Search Overlay */}
        {isOpen && (
          <div className='fixed inset-0 z-50 flex flex-col bg-white'>
            {/* Mobile Search Header */}
            <div className='flex items-center gap-3 border-b border-gray-100 p-4'>
              <div className='relative flex-1'>
                <Search className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400' />
                <Input
                  ref={inputRef}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={t('search-the-store')}
                  className='focus-visible:ring-primary/30 h-11 rounded-full border-gray-200 bg-gray-50 pr-10 pl-10 text-base focus-visible:ring-2'
                  autoFocus
                />
                {search && (
                  <button
                    onClick={handleClear}
                    className='absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 transition-colors hover:bg-gray-200'
                  >
                    <X className='h-4 w-4 text-gray-400' />
                  </button>
                )}
              </div>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => {
                  setIsOpen(false);
                  setSearch('');
                }}
              >
                {t('cancel')}
              </Button>
            </div>

            {/* Mobile Search Results */}
            <div className='flex-1 overflow-y-auto p-4'>
              {!search ? (
                <div className='space-y-4'>
                  <h3 className='flex items-center gap-2 text-sm font-semibold text-gray-500'>
                    <TrendingUp className='h-4 w-4' />
                    {t('popular-searches')}
                  </h3>
                  <div className='flex flex-wrap gap-2'>
                    {popularSearches.map(term => (
                      <button
                        key={term}
                        onClick={() => setSearch(term)}
                        className='rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-200'
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : status === 'pending' ? (
                <div className='flex justify-center py-8'>
                  <Loader2 className='text-primary h-8 w-8 animate-spin' />
                </div>
              ) : status === 'error' ? (
                <p className='py-8 text-center text-red-500'>
                  {t('error-something-went-wrong')}
                </p>
              ) : (
                <div className='space-y-6'>
                  {/* Categories */}
                  {categories.length > 0 && (
                    <div>
                      <h3 className='mb-3 text-sm font-semibold text-gray-500'>
                        {t('categories')}
                      </h3>
                      <ul className='space-y-2'>
                        {categories.map(category => (
                          <li key={category.id}>
                            <Link
                              href={`/category/${category.id}`}
                              onClick={() => setIsOpen(false)}
                              className='flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50'
                            >
                              <div className='bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg'>
                                <Sparkles className='text-primary h-5 w-5' />
                              </div>
                              <span className='text-gray-700'>
                                {category.name}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Products */}
                  {products.length > 0 && (
                    <div>
                      <h3 className='mb-3 text-sm font-semibold text-gray-500'>
                        {t('products')}
                      </h3>
                      <div className='grid grid-cols-2 gap-3'>
                        {products.slice(0, 4).map(product => (
                          <Link
                            key={product.id}
                            href={`/products/${product.id}`}
                            onClick={() => setIsOpen(false)}
                            className='group'
                          >
                            <div className='relative mb-2 aspect-square overflow-hidden rounded-lg bg-gray-100'>
                              {product.image && (
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  className='object-cover transition-transform duration-300 group-hover:scale-105'
                                  sizes='(max-width: 768px) 50vw, 200px'
                                />
                              )}
                            </div>
                            <p className='group-hover:text-primary line-clamp-2 text-sm text-gray-700 transition-colors'>
                              {product.name}
                            </p>
                            <p className='text-primary mt-1 text-sm font-semibold'>
                              {product.price}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {categories.length === 0 && products.length === 0 && (
                    <p className='py-8 text-center text-gray-500'>
                      {t('no-results-found')}
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
    <div ref={containerRef} className='relative w-full max-w-xl'>
      {/* Desktop Search Input */}
      <div
        className={cn(
          'relative flex items-center transition-all duration-300',
          isFocused && 'scale-[1.02]'
        )}
      >
        <div
          className={cn(
            'pointer-events-none absolute inset-y-0 inset-s-0 flex items-center ps-4 transition-colors',
            isFocused ? 'text-primary' : 'text-gray-400'
          )}
        >
          <Search className='h-5 w-5' />
        </div>
        <Input
          ref={inputRef}
          value={search}
          onChange={e => setSearch(e.target.value)}
          onFocus={handleFocus}
          placeholder={t('search-placeholder')}
          className={cn(
            'h-10 w-full rounded-xl border-gray-200/80 bg-gray-50/80 pr-10 pl-12 text-sm',
            'placeholder:text-gray-400',
            'focus-visible:border-primary/30 focus-visible:ring-primary/10 focus-visible:bg-white focus-visible:ring-4',
            'transition-all duration-300 ease-out',
            isFocused && 'shadow-primary/5 shadow-lg'
          )}
        />
        {search && (
          <button
            onClick={handleClear}
            className='absolute inset-y-0 right-0 flex items-center pr-3'
          >
            <div className='rounded-full p-1 transition-colors hover:bg-gray-200'>
              <X className='h-4 w-4 text-gray-400' />
            </div>
          </button>
        )}

        {/* Search Button */}
        <Button
          size='sm'
          className={cn(
            'absolute inset-e-1.5 h-8 rounded-lg px-4 transition-all duration-300',
            isFocused || search
              ? 'bg-primary text-primary-foreground opacity-100'
              : 'pointer-events-none opacity-0'
          )}
        >
          {t('search')}
        </Button>
      </div>

      {/* Desktop Search Dropdown */}
      {isOpen && (
        <div className='absolute top-full right-0 left-0 z-50 mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl shadow-gray-200/50'>
          <div className='custom-scrollbar max-h-[70vh] overflow-y-auto'>
            {!search ? (
              <div className='p-4'>
                <h3 className='mb-3 flex items-center gap-2 text-xs font-semibold tracking-wider text-gray-400 uppercase'>
                  <TrendingUp className='h-4 w-4' />
                  {t('popular-searches')}
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {popularSearches.map(term => (
                    <button
                      key={term}
                      onClick={() => setSearch(term)}
                      className='rounded-full bg-gray-50 px-3 py-1.5 text-sm text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900'
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : status === 'pending' ? (
              <div className='flex justify-center py-12'>
                <Loader2 className='text-primary h-8 w-8 animate-spin' />
              </div>
            ) : status === 'error' ? (
              <p className='py-8 text-center text-red-500'>
                {t('error-something-went-wrong')}
              </p>
            ) : (
              <div className='space-y-4 p-4'>
                {/* Categories Section */}
                {categories.length > 0 && (
                  <div>
                    <h3 className='mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase'>
                      {t('categories')}
                    </h3>
                    <div className='grid grid-cols-1 gap-1'>
                      {categories.slice(0, 5).map(category => {
                        const parent = category.parents_slugs;
                        const categoryPath = `/category/${category.id}`;
                        return (
                          <Link
                            key={category.id}
                            href={categoryPath}
                            onClick={() => setIsOpen(false)}
                            className='group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-gray-50'
                          >
                            <div className='bg-primary/10 group-hover:bg-primary/20 flex h-9 w-9 items-center justify-center rounded-lg transition-colors'>
                              <Sparkles className='text-primary h-4 w-4' />
                            </div>
                            <span className='text-sm text-gray-700 group-hover:text-gray-900'>
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
                    <h3 className='mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase'>
                      {t('products')}
                    </h3>
                    <div className='grid grid-cols-2 gap-3'>
                      {products.slice(0, 4).map(product => (
                        <Link
                          key={product.id}
                          href={`/products/${product.id}`}
                          onClick={() => setIsOpen(false)}
                          className='group rounded-xl p-2 transition-colors hover:bg-gray-50'
                        >
                          <div className='relative mb-2 aspect-square overflow-hidden rounded-lg bg-gray-100'>
                            {product.image && (
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className='object-cover transition-transform duration-300 group-hover:scale-105'
                                sizes='200px'
                              />
                            )}
                          </div>
                          <p className='group-hover:text-primary line-clamp-2 text-sm text-gray-700 transition-colors'>
                            {product.name}
                          </p>
                          {product.price && (
                            <p className='text-primary mt-1 text-sm font-semibold'>
                              {product.price}
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {categories.length === 0 && products.length === 0 && (
                  <div className='py-8 text-center'>
                    <div className='mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100'>
                      <Search className='h-8 w-8 text-gray-400' />
                    </div>
                    <p className='text-gray-500'>
                      {t('no-results-for')} &quot;{search}&quot;
                    </p>
                  </div>
                )}

                {/* Load More */}
                {hasNextPage && (
                  <div className='border-t border-gray-100 pt-2'>
                    <Button
                      onClick={() => fetchNextPage()}
                      disabled={isFetchingNextPage}
                      variant='ghost'
                      className='w-full'
                    >
                      {isFetchingNextPage ? (
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      ) : null}
                      {t('load-more')}
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
