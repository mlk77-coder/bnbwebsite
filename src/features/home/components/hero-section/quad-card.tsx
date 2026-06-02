'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, LayoutGrid, Sparkles, Tag } from 'lucide-react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import type { ProductCard } from '@/types/products';
import { cn } from '@/lib/utils';

const PLACEHOLDER =
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80';

export type QuadCardVariant = 'trendy' | 'sale' | 'latest' | 'most-viewed';

export type QuadCardProps = {
  title: string;
  variant: QuadCardVariant;
  seeMoreHref: string;
  seeMoreLabel: string;
  products: ProductCard[];
};

function tileGridClass(count: number): string {
  if (count <= 1) return 'grid-cols-1';
  if (count === 2) return 'grid-cols-2';
  if (count === 3) return 'grid-cols-2';
  return 'grid-cols-2';
}

function getIcon(variant: QuadCardVariant) {
  switch (variant) {
    case 'trendy':
      return {
        bg: 'bg-amber-50',
        Icon: Sparkles,
        iconClass: 'text-amber-500',
        strokeWidth: 1.65,
      };
    case 'sale':
      return {
        bg: 'bg-primary/10',
        Icon: Tag,
        iconClass: 'text-primary',
        strokeWidth: 1.5,
      };
    case 'latest':
      return {
        bg: 'bg-primary/10',
        Icon: LayoutGrid,
        iconClass: 'text-primary',
        strokeWidth: 1.5,
      };
    case 'most-viewed':
      return {
        bg: 'bg-sky-50',
        Icon: Eye,
        iconClass: 'text-sky-600',
        strokeWidth: 1.5,
      };
  }
}

export function QuadCard({
  title,
  variant,
  seeMoreHref,
  seeMoreLabel,
  products,
}: QuadCardProps) {
  const t = useTranslations();
  const tiles = products.slice(0, 4);
  const { bg, Icon, iconClass, strokeWidth } = getIcon(variant);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className='bg-card flex h-full flex-col rounded-xl p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6'
    >
      <div className='mb-4 flex gap-3.5'>
        <div
          className={`flex size-8 shrink-0 items-center justify-center rounded-xl ${bg}`}
          aria-hidden
        >
          <Icon className={`size-5 ${iconClass}`} strokeWidth={strokeWidth} />
        </div>
        <div className='min-w-0 flex-1 pt-0.5'>
          <h3 className='text-foreground text-lg leading-tight font-bold tracking-tight sm:text-xl'>
            {title}
          </h3>
        </div>
      </div>

      {tiles.length === 0 ? (
        <p className='text-muted-foreground flex-1 text-sm'>
          {t('no-products-found')}
        </p>
      ) : (
        <div
          className={cn(
            'grid flex-1 gap-2.5 sm:gap-3',
            tileGridClass(tiles.length)
          )}
        >
          {tiles.map(product => {
            const discounted =
              product.sale_price != null && product.sale_price < product.price;

            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className='group relative aspect-square overflow-hidden rounded-xl ring-1 ring-black/6 transition-[box-shadow,transform] duration-300 hover:shadow-md hover:ring-black/10'
              >
                <Image
                  src={product.image || PLACEHOLDER}
                  alt={product.name}
                  fill
                  className='object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]'
                  sizes='(max-width: 768px) 50vw, 200px'
                />
                <div className='absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent' />
                <div className='absolute inset-x-0 bottom-0 space-y-1 px-2.5 pt-8 pb-2.5 sm:px-3 sm:pb-3'>
                  <p className='line-clamp-1 text-start text-[11px] leading-snug font-medium text-white/95 sm:text-xs'>
                    {product.name}
                  </p>
                  <div className='flex flex-wrap items-baseline gap-x-2 gap-y-0.5'>
                    {discounted ? (
                      <>
                        <span className='text-sm font-semibold tracking-tight text-red-400 tabular-nums sm:text-[0.95rem]'>
                          {String(product.sale_price)}
                        </span>
                        <span className='text-[10px] text-white/50 tabular-nums line-through decoration-white/35 sm:text-[11px]'>
                          {product.price}
                        </span>
                      </>
                    ) : (
                      <span className='text-sm font-medium tracking-tight text-white tabular-nums sm:text-[0.95rem]'>
                        {product.price}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <Link
        href={seeMoreHref}
        className='group/link hover:text-primary mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-700 underline-offset-4 transition-colors'
      >
        {seeMoreLabel}
        <ArrowRight className='size-3.5 opacity-70 transition-transform group-hover/link:translate-x-0.5 rtl:rotate-180' />
      </Link>
    </motion.div>
  );
}
