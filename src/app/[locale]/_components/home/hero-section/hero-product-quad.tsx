'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Trophy } from 'lucide-react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { ProductCard } from '@/types/products';

const PLACEHOLDER =
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80';

export type HeroProductQuadVariant = 'trendy' | 'best-selling';

export type HeroProductQuadProps = {
  title: string;
  products: ProductCard[];
  seeMoreHref: string;
  seeMoreLabel: string;
  variant: HeroProductQuadVariant;
};

type Tile =
  | { kind: 'product'; product: ProductCard }
  | { kind: 'empty'; key: string; href: string };

/** Split "Best Sellers" → two lines of style; single word / Arabic stays one block. */
function splitTitleWords(title: string): { first: string; rest: string } {
  const trimmed = title.trim();
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return { first: trimmed, rest: '' };
  return { first: parts[0]!, rest: parts.slice(1).join(' ') };
}

export function HeroProductQuad({
  title,
  products,
  seeMoreHref,
  seeMoreLabel,
  variant,
}: HeroProductQuadProps) {
  const t = useTranslations();
  const showPrices = variant === 'best-selling';
  const slice = products.slice(0, 4);
  const tiles: Tile[] = slice.map(p => ({
    kind: 'product' as const,
    product: p,
  }));
  while (tiles.length < 4) {
    tiles.push({
      kind: 'empty',
      key: `empty-${tiles.length}`,
      href: seeMoreHref,
    });
  }

  const tagLine =
    variant === 'trendy'
      ? t('hero-quad-trendy-tag')
      : t('hero-quad-bestseller-tag');
  const { first: titleFirst, rest: titleRest } = splitTitleWords(title);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className='border-border bg-card flex h-full flex-col border p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6'
    >
      {/* Header — editorial, no looping animations */}
      <div className='mb-5 flex gap-3.5'>
        {variant === 'trendy' ? (
          <div
            className='flex size-11 shrink-0 items-center justify-center rounded-2xl bg-purple-50'
            aria-hidden
          >
            <Sparkles
              className='size-[22px] text-purple-600'
              strokeWidth={1.65}
            />
          </div>
        ) : (
          <div
            className='flex size-11 shrink-0 items-center justify-center rounded-2xl bg-neutral-100'
            aria-hidden
          >
            <Trophy
              className='size-[22px] text-neutral-800'
              strokeWidth={1.5}
            />
          </div>
        )}

        <div className='min-w-0 flex-1 pt-0.5'>
          {variant === 'trendy' ? (
            <h3 className='text-[1.35rem] leading-tight font-bold tracking-tight text-purple-600 sm:text-xl'>
              {title}
            </h3>
          ) : (
            <h3 className='text-[1.35rem] leading-tight font-bold tracking-tight sm:text-xl'>
              {titleRest ? (
                <>
                  <span className='text-primary'>{titleFirst}</span>
                  <span className='text-primary'> </span>
                  <span className='text-primary'>{titleRest}</span>
                </>
              ) : (
                <span className='text-neutral-900'>{title}</span>
              )}
            </h3>
          )}
          <p
            className={cn(
              'mt-2 text-[10px] font-semibold tracking-[0.28em] uppercase sm:text-[11px]',
              variant === 'trendy' ? 'text-purple-600' : 'text-primary'
            )}
          >
            {tagLine}
          </p>
        </div>
      </div>

      <div className='grid flex-1 grid-cols-2 gap-2.5 sm:gap-3'>
        {tiles.slice(0, 4).map(tile => {
          if (tile.kind === 'empty') {
            return (
              <Link
                key={tile.key}
                href={tile.href}
                className='group bg-muted/40 relative aspect-square overflow-hidden rounded-xl'
              >
                <Image
                  src={PLACEHOLDER}
                  alt=''
                  fill
                  className='object-cover opacity-35 transition-transform duration-300 group-hover:scale-[1.02]'
                  sizes='(max-width: 768px) 50vw, 200px'
                />
                <span className='text-muted-foreground absolute inset-0 flex items-center justify-center text-xs'>
                  —
                </span>
              </Link>
            );
          }

          const { product } = tile;
          const discounted =
            showPrices &&
            product.has_discount === 1 &&
            product.price_after_sale != null;

          return (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
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
                <p className='line-clamp-2 text-start text-[11px] leading-snug font-medium text-white/95 sm:text-xs'>
                  {product.name}
                </p>
                {showPrices ? (
                  <div className='flex flex-wrap items-baseline gap-x-2 gap-y-0.5'>
                    {discounted ? (
                      <>
                        <span className='text-sm font-semibold tracking-tight text-red-400 tabular-nums sm:text-[0.95rem]'>
                          {String(product.price_after_sale)}
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
                ) : null}
              </div>
            </Link>
          );
        })}
      </div>

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
