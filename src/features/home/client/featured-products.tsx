'use client';

import ProductCard from '@/components/product-card/product-card';
import { LoadMorePill } from '@/components/load-more-pill';
import { loadMorePillRowClassName } from '@/components/load-more-pill.constants';
import SectionWrapper, {
  sectionWrapperClassName,
} from '@/components/section-wrapper';
import { cn } from '@/lib/utils';
import type { HomePageCategory } from '@/types/home';
import type { ProductCard as ProductCardType } from '@/types/products';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const PAGE_SIZE = 20;

export function FeaturedProducts({
  categories,
  products,
}: {
  categories: HomePageCategory[];
  products: ProductCardType[];
}) {
  const t = useTranslations();
  const [activeId, setActiveId] = useState<number | 'all'>('all');
  const [page, setPage] = useState(1);

  const filteredProducts =
    activeId === 'all'
      ? products
      : products.filter(product => product.category_id === activeId);
  const visible = filteredProducts.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < filteredProducts.length;

  const selectTab = (id: number | 'all') => {
    setActiveId(id);
    setPage(1);
  };

  return (
    <SectionWrapper className={cn(sectionWrapperClassName, 'mt-0 pt-0')}>
      {/* Header */}
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

      {/* Filter pills */}
      <div className='scrollbar-hide mb-4 flex gap-2 overflow-x-auto pb-4'>
        <Pill active={activeId === 'all'} onClick={() => selectTab('all')}>
          {t('all-products')}
        </Pill>
        {categories.map(cat => (
          <Pill
            key={cat.id}
            active={activeId === cat.id}
            onClick={() => selectTab(cat.id)}
          >
            {cat.name}
          </Pill>
        ))}
      </div>

      {/* Products grid */}
      <motion.div
        layout
        className='grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-5 md:gap-x-5 md:gap-y-10 lg:grid-cols-5'
      >
        <AnimatePresence mode='popLayout'>
          {visible.map((product, i) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28, delay: (i % PAGE_SIZE) * 0.035 }}
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
            label={t('load-more')}
            onClick={() => setPage(p => p + 1)}
          />
        </motion.div>
      )}
    </SectionWrapper>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'shrink-0 rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200',
        active
          ? 'bg-foreground text-background border-foreground'
          : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
      )}
    >
      {children}
    </button>
  );
}
