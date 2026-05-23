'use client';

import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/loader';
import { getOrders } from '@/features/orders/api/get-orders';
import {
  getOrderStatusClassName,
  getOrderStatusLabel,
} from '@/features/orders/lib/order-status';
import { cn, formatPrice } from '@/lib/utils';
import { Link } from '@/navigation';
import useCurrencyStore from '@/store/use-currency-store';
import type { ApiPaginatedData } from '@/types';
import type { OrderSummary } from '@/types/order';
import { useInfiniteQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useLocale, useTranslations } from 'next-intl';
import { FC } from 'react';

type PropsType = {
  token: string;
  initialData: ApiPaginatedData<OrderSummary>;
};

const InfiniteOrders: FC<PropsType> = ({ token, initialData }) => {
  const currency = useCurrencyStore(state => state.currency);
  const symbol = useCurrencyStore(state => state.symbol);
  const t = useTranslations();
  const locale = useLocale();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['orders', token, locale],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await getOrders(locale, token, pageParam);
        if (!response.ok || !response.data.success) {
          throw new Error(t('errors.load-page-error'));
        }
        return response.data.data;
      },
      initialPageParam: 1,
      initialData: {
        pages: [initialData],
        pageParams: [1],
      },
      staleTime: Infinity,
      getNextPageParam: lastPage => {
        const { current_page, last_page } = lastPage.meta;
        return current_page < last_page ? current_page + 1 : undefined;
      },
    });

  const orders = data.pages.flatMap(page => page.data);

  return (
    <div className='w-full space-y-4'>
      {orders.length === 0 ? (
        <div className='border-primary/10 bg-secondary/40 flex items-center justify-center rounded-3xl border px-4 py-12 text-center'>
          <p className='text-primary text-base font-semibold md:text-lg'>
            {t('you-don-t-have-any-orders-yet')}
          </p>
        </div>
      ) : (
        <ul className='grid gap-3 sm:grid-cols-2'>
          {orders.map(order => (
            <li key={order.id}>
              <Link
                href={`/orders/${order.id}`}
                className='group border-primary/10 hover:border-primary/25 flex items-center gap-3 rounded-2xl border bg-white p-3.5 transition-all duration-200 sm:p-4'
              >
                <span className='min-w-0 flex-1 space-y-1.5'>
                  <span className='flex items-start justify-between gap-2'>
                    <span className='text-primary truncate text-sm font-bold'>
                      {order.order_number}
                    </span>
                    <span
                      className={cn(
                        'shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium capitalize',
                        getOrderStatusClassName(order.status)
                      )}
                    >
                      {getOrderStatusLabel(order.status, t)}
                    </span>
                  </span>

                  <span className='text-muted-foreground block text-xs'>
                    {format(new Date(order.created_at), 'PP')}
                  </span>

                  <span className='flex flex-wrap items-center justify-between gap-2'>
                    <span className='bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 text-xs font-medium'>
                      {t('product-count', { count: order.items_count })}
                    </span>
                    <span className='text-sm font-semibold tabular-nums'>
                      {formatPrice(order.total * currency, symbol)}
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {hasNextPage ? (
        <div className='flex justify-center pt-2'>
          <Button
            variant='outline'
            size='lg'
            className='border-primary/20 hover:bg-primary hover:text-primary-foreground rounded-full px-8'
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? <Loader /> : t('load-more')}
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default InfiniteOrders;
