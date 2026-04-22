'use client';

import getProductList from '@/api/products/get-products';
import ProductCard from '@/components/product-card/product-card';
import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/loader';
import { GetProductsResponse } from '@/types/products';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Fragment, useState } from 'react';

const InifinteProducts = ({
  slug,
  initialData,
  params,
  isSales = '',
}: {
  slug: string;
  initialData: GetProductsResponse;
  isSales?: string;
  params?: Record<string, string>;
}) => {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = useTranslations();
  const [hasFetched, setHasFetched] = useState(false);

  const queryFilters: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    queryFilters[key] = value;
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [
        'products-list',
        { slug, discount_id: isSales, ...queryFilters, ...params },
      ],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await getProductList(
          slug,
          {
            page: pageParam.toString(),
            ...queryFilters,
            ...params,
          },
          locale
        );
        if (response.ok) return response.data;
        else return initialData;
      },
      initialPageParam: 1,
      initialData: {
        pages: [initialData],
        pageParams: [1],
      },
      getNextPageParam: lastPage => {
        if (typeof lastPage.pagination.next_page_url === 'string')
          return lastPage.pagination.current_page + 1;
        else return undefined;
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
      <div className='grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5'>
        {data?.pages.map(page =>
          page.products.map((product, index) => (
            <ProductCard key={product.id || index} product={product} />
          ))
        )}
      </div>
      <div className='flex w-full flex-col items-center justify-center gap-2'>
        {hasNextPage ? (
          <Button
            variant='outline'
            size='lg'
            onClick={handleLoadMore}
            disabled={isFetchingNextPage || (!hasNextPage && hasFetched)}
          >
            {isFetchingNextPage ? <Loader /> : t('see-more')}
          </Button>
        ) : null}
      </div>
    </Fragment>
  );
};

export default InifinteProducts;
