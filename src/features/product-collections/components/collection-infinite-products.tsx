'use client';

import ProductCard from '@/components/product-card/product-card';
import { LoadMorePill } from '@/components/load-more-pill';
import { loadMorePillRowClassName } from '@/components/load-more-pill.constants';
import Loader from '@/components/ui/loader';
import { loadMoreCollectionAction } from '@/features/product-collections/actions/load-more-collection';
import type { ProductCollectionId } from '@/features/product-collections/types';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';
import type { GetProductsResponse } from '@/types/products';
import { Undo2Icon } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

type Props = {
  collection: ProductCollectionId;
  initialData: GetProductsResponse;
};

export function CollectionInfiniteProducts({ collection, initialData }: Props) {
  const locale = useLocale();
  const t = useTranslations();
  const [products, setProducts] = useState(initialData.products);
  const [pagination, setPagination] = useState(initialData.pagination);
  const [loading, setLoading] = useState(false);

  const hasMore = typeof pagination.next_page_url === 'string';
  const nextPage = useMemo(
    () => pagination.current_page + 1,
    [pagination.current_page]
  );

  const handleLoadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const result = await loadMoreCollectionAction(
        locale,
        collection,
        nextPage,
        pagination.per_page
      );
      if (result.ok) {
        setProducts(prev => {
          const seen = new Set(prev.map(p => p.id));
          const extra = result.products.filter(p => !seen.has(p.id));
          return [...prev, ...extra];
        });
        setPagination(result.pagination);
      }
    } finally {
      setLoading(false);
    }
  };

  if (products.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center gap-4 py-4'>
        <Image
          src='/no-product.svg'
          alt={t('no-products-image-alt')}
          width={300}
          height={300}
        />
        <p className='text-primary text-xl font-medium sm:text-2xl'>
          {t('product-count', { count: pagination.total })}
        </p>
        <Link
          href='/'
          className={cn(
            "text-primary before:bg-primary relative flex items-center gap-1.5 before:absolute before:-bottom-0.5 before:h-px before:w-full before:content-[''] hover:before:hidden"
          )}
        >
          <Undo2Icon size={16} />
          {t('go-home')}
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className='flex flex-col-reverse items-start justify-between gap-5 sm:flex-row'>
        <p className='flex w-full items-start justify-start'>
          {t('product-count', { count: pagination.total })}
        </p>
      </div>
      <div className='grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5'>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {hasMore ? (
        <div className={loadMorePillRowClassName}>
          <LoadMorePill
            label={
              loading ? (
                <span className='inline-flex items-center gap-2'>
                  <Loader size='sm' />
                  {t('loading-more')}
                </span>
              ) : (
                t('load-more')
              )
            }
            onClick={handleLoadMore}
            disabled={loading}
          />
        </div>
      ) : null}
    </>
  );
}
  