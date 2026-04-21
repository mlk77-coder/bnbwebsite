'use client';

import ProductCard from '@/components/product-card/product-card';
import { sectionWrapperClassName } from '@/components/section-wrapper';
import { cn } from '@/lib/utils';
import type { FeaturedCategory } from '@/lib/hero-section-dummy-data';
import type { ProductCard as ProductCardType } from '@/types/products';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const PAGE_SIZE = 20;

export function FeaturedProducts({
  categories,
}: {
  categories: FeaturedCategory[];
}) {
  const t = useTranslations();
  const [activeId, setActiveId] = useState<number | 'all'>('all');
  const [page, setPage] = useState(1);

  const allProducts: ProductCardType[] = categories.flatMap(c => c.products);
  const products =
    activeId === 'all'
      ? allProducts
      : (categories.find(c => c.id === activeId)?.products ?? []);
  const visible = products.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < products.length;

  const selectTab = (id: number | 'all') => {
    setActiveId(id);
    setPage(1);
  };

  return (
    <section className={cn(sectionWrapperClassName, 'mt-0 pt-0')}>
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

      {/* Load more — pill + icon capsule, primary accent on hover */}
      {hasMore && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className='mt-14 mb-6 flex justify-center'
        >
          <motion.button
            type='button'
            onClick={() => setPage(p => p + 1)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              'group border-border/80 inline-flex items-center gap-3 rounded-xl border',
              'bg-background/80 px-6 py-3 shadow-sm backdrop-blur-sm',
              'text-foreground text-[11px] font-semibold tracking-[0.2em] uppercase',
              'transition-[box-shadow,border-color,background-color] duration-300',
              'hover:border-primary/50 hover:bg-primary/5 hover:shadow-primary/15 hover:shadow-md'
            )}
          >
            <span>{t('load-more')}</span>
            <span
              className={cn(
                'flex size-8 items-center justify-center rounded-xl',
                'bg-foreground/6 text-foreground transition-all duration-300',
                'group-hover:bg-primary group-hover:text-primary-foreground',
                'group-hover:shadow-sm'
              )}
            >
              <ArrowRight className='size-3.5 transition-transform duration-300 group-hover:translate-x-0.5' />
            </span>
          </motion.button>
        </motion.div>
      )}
    </section>
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
