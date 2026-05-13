'use client';

import { LoadMorePill } from '@/components/load-more-pill';
import { loadMorePillRowClassName } from '@/components/load-more-pill.constants';
import ProductCard from '@/components/product-card/product-card';
import SectionWrapper, {
  sectionWrapperClassName,
} from '@/components/section-wrapper';
import Loader from '@/components/ui/loader';
import { loadMoreFeaturedProductsAction } from '@/features/home/actions/load-more-featured-products';
import { cn } from '@/lib/utils';
import type { Pagination } from '@/types';
import type { ProductCard as ProductCardType } from '@/types/products';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

export function FeaturedProducts({
  locale,
  initialProducts,
  initialPagination,
}: {
  locale: string;
  initialProducts: ProductCardType[];
  initialPagination: Pagination;
}) {
  const t = useTranslations();
  const [products, setProducts] = useState(initialProducts);
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(false);

  const staggerChunk = Math.max(pagination.per_page, 1);
  const hasMore = typeof pagination.next_page_url === 'string';

  const nextPage = useMemo(
    () => pagination.current_page + 1,
    [pagination.current_page]
  );

  const handleLoadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const result = await loadMoreFeaturedProductsAction(
        locale,
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

  return (
    <SectionWrapper className={cn(sectionWrapperClassName, 'mt-0 pt-0')}>
      <div className='mb-6 space-y-1.5'>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-xl font-bold tracking-wide sm:text-2xl lg:text-3xl'
        >
          {t('featured-collection')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className='text-muted-foreground text-sm'
        >
          {t('explore-our-selection-description')}
        </motion.p>
      </div>
      <motion.div
        layout
        className='grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-5 md:gap-x-5 md:gap-y-10 lg:grid-cols-5'
      >
        <AnimatePresence mode='popLayout'>
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{
                duration: 0.28,
                delay: (i % staggerChunk) * 0.035,
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {hasMore && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className={loadMorePillRowClassName}
        >
          <LoadMorePill
            label={
              loading ? (
                <span className='inline-flex items-center gap-2'>
                  <Loader size='sm' />
                  {t('load-more')}
                </span>
              ) : (
                t('load-more')
              )
            }
            onClick={handleLoadMore}
            disabled={loading}
          />
        </motion.div>
      )}
    </SectionWrapper>
  );
}
