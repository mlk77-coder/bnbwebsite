'use client';

import {
  getRecentlyViewed,
  GetRecentlyViewedResponse,
} from '@/features/recent-items/api/get-recently-viewed';
import ProductCard from '@/components/product-card/product-card';
import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/loader';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useLocale, useTranslations } from 'next-intl';
import { FC, useState } from 'react';

type PropsType = {
  token: string;
  initialData: GetRecentlyViewedResponse;
};

const RecentItemsGrid: FC<PropsType> = ({ token, initialData }) => {
  const [hasFetched, setHasFetched] = useState(false);
  const t = useTranslations();
  const locale = useLocale();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['user-recently-viewed', token],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await getRecentlyViewed(
          locale,
          token,
          pageParam,
          true
        );
        if (response.ok) return response.data;
        return initialData;
      },
      initialPageParam: 1,
      initialData: {
        pages: [initialData],
        pageParams: [1],
      },
      getNextPageParam: lastPage => {
        if (typeof lastPage.pagination.next_page_url === 'string') {
          return lastPage.pagination.current_page + 1;
        }
        return undefined;
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

  const products = data.pages.flatMap(page => page.products);

  return (
    <div className='w-full space-y-4'>
      {products.length === 0 ? (
        <p className='border-primary/10 bg-secondary/40 text-muted-foreground rounded-xl border px-4 py-8 text-center text-sm'>
          {t('recently-viewed-empty')}
        </p>
      ) : (
        <div className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {products.map(product => (
            <div key={product.id} className='relative'>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}

      {hasNextPage ? (
        <div className='flex justify-center pt-2'>
          <Button
            variant='outline'
            size='lg'
            className='border-primary/20 hover:bg-primary hover:text-primary-foreground rounded-full px-8'
            onClick={handleLoadMore}
            disabled={isFetchingNextPage || (!hasNextPage && hasFetched)}
          >
            {isFetchingNextPage ? <Loader /> : t('load-more')}
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default RecentItemsGrid;
