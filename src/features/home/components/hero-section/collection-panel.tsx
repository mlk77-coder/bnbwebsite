'use client';

import {
  type CollectionPanelVariant,
  getDiscountPercent,
  getFinalPrice,
  getSalePrice,
} from '@/features/home/lib/collection-panels';
import { cn, formatPrice } from '@/lib/utils';
import { Link } from '@/navigation';
import useCurrencyStore from '@/store/use-currency-store';
import type { ProductCard } from '@/types/products';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const PLACEHOLDER = '/no-product.svg';

function usePriceFormatter() {
  const currency = useCurrencyStore(s => s.currency);
  const symbol = useCurrencyStore(s => s.symbol);
  return (value: number) => formatPrice(value * currency, symbol);
}

type CollectionPanelProps = {
  variant: CollectionPanelVariant;
  products: ProductCard[];
  href?: string;
  index?: number;
};

export function CollectionPanel({
  variant,
  products,
  href,
  index = 0,
}: CollectionPanelProps) {
  const t = useTranslations('home');
  const format = usePriceFormatter();
  const [featured, ...side] = products;

  const getSubtitle = () => {
    const maxDiscount = Math.max(0, ...products.map(getDiscountPercent));
    if (variant === 'sale' && maxDiscount > 0) {
      return t('up-to-discount', { value: maxDiscount });
    }
    if (variant === 'lowest-price') {
      const lowestPrice = Math.min(...products.map(getFinalPrice));
      return t('starting-from', { price: format(lowestPrice) });
    }
    return t(`collection-panels.${variant}.tagline`);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: 'easeOut' }}
      className='bg-card border-border/50 flex w-[88%] shrink-0 snap-start flex-col rounded-xl border shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_1px_2px_rgba(0,0,0,0.05),0_12px_28px_rgba(0,0,0,0.07)] md:w-auto'
    >
      <header className='flex items-start justify-between gap-3 px-4 pt-4 pb-3 sm:px-5 sm:pt-5'>
        <div className='min-w-0 space-y-1'>
          <h3 className='flex items-center gap-2.5 truncate text-base font-bold tracking-tight sm:text-lg'>
            <span className='bg-primary h-4 w-0.5 shrink-0 rounded-full sm:h-5' />
            {t(`collection-panels.${variant}.title`)}
          </h3>
          <p
            className={cn(
              'truncate ps-3 text-xs sm:ps-3.5',
              variant === 'sale' || variant === 'lowest-price'
                ? 'text-primary font-medium'
                : 'text-muted-foreground'
            )}
          >
            {getSubtitle()}
          </p>
        </div>
        {href ? (
          <Link
            href={href}
            className='group/link text-muted-foreground hover:text-primary mt-0.5 inline-flex shrink-0 items-center gap-1 text-xs font-medium transition-colors sm:text-sm'
          >
            {t('see-all')}
            <ArrowRight className='size-3.5 transition-transform group-hover/link:translate-x-0.5 rtl:rotate-180 rtl:group-hover/link:-translate-x-0.5' />
          </Link>
        ) : null}
      </header>

      <div className='grid h-[280px] grid-cols-2 gap-2.5 px-4 pb-4 sm:h-[320px] sm:gap-3 sm:px-5 sm:pb-5 lg:h-[340px]'>
        {featured ? (
          <ProductTile
            product={featured}
            variant={variant}
            format={format}
            featured
          />
        ) : null}
        <div className='grid min-h-0 grid-rows-2 gap-2.5 sm:gap-3'>
          {side.map(product => (
            <ProductTile
              key={product.id}
              product={product}
              variant={variant}
              format={format}
            />
          ))}
        </div>
      </div>
    </motion.article>
  );
}

type ProductTileProps = {
  product: ProductCard;
  variant: CollectionPanelVariant;
  format: (value: number) => string;
  featured?: boolean;
};

function ProductTile({
  product,
  variant,
  format,
  featured = false,
}: ProductTileProps) {
  const t = useTranslations('home');
  const salePrice = getSalePrice(product);
  const discount = getDiscountPercent(product);

  return (
    <Link
      href={`/products/${product.id}`}
      className='group/tile relative block min-h-0 overflow-hidden rounded-lg'
    >
      <div className='bg-muted/30 absolute inset-0'>
        <Image
          src={product.image || PLACEHOLDER}
          alt={product.name}
          fill
          sizes={
            featured
              ? '(max-width: 768px) 44vw, (max-width: 1024px) 22vw, 14vw'
              : '(max-width: 768px) 22vw, (max-width: 1024px) 11vw, 7vw'
          }
          className='object-cover transition-transform duration-500 ease-out group-hover/tile:scale-[1.04]'
        />
        <div className='absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent' />
      </div>

      {discount > 0 ? (
        <span className='bg-background/95 text-foreground absolute start-2 top-2 z-10 rounded px-1.5 py-0.5 text-[10px] font-semibold tracking-wide'>
          -{discount}%
        </span>
      ) : variant === 'latest' ? (
        <span className='bg-background/95 text-foreground absolute start-2 top-2 z-10 rounded px-1.5 py-0.5 text-[10px] font-semibold tracking-wide'>
          {t('new-badge')}
        </span>
      ) : null}

      <div className='absolute inset-x-0 bottom-0 z-10 space-y-0.5 p-2.5 sm:p-3'>
        <p className='truncate text-[11px] font-medium text-white/95 sm:text-xs'>
          {product.name}
        </p>
        <p className='flex flex-wrap items-baseline gap-x-1.5 tabular-nums'>
          <span className='text-sm font-semibold text-white'>
            {format(salePrice ?? product.price)}
          </span>
          {salePrice != null ? (
            <span className='text-[11px] text-white/55 line-through'>
              {format(product.price)}
            </span>
          ) : null}
        </p>
      </div>
    </Link>
  );
}

export default CollectionPanel;
