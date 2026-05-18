'use client';

import { Badge } from '@/components/ui/badge';
import { cn, formatPrice } from '@/lib/utils';
import { Link } from '@/navigation';
import useCurrencyStore from '@/store/use-currency-store';
import type { ReelProduct } from '@/types/reels';
import { ArrowUpRight, ShoppingBag } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';

type PropsType = {
  product: ReelProduct;
  variant?: 'overlay' | 'card' | 'viewer';
  className?: string;
  onNavigate?: () => void;
};

const ReelFeaturedProduct: FC<PropsType> = ({
  product,
  variant = 'overlay',
  className,
  onNavigate,
}) => {
  const t = useTranslations('reels');
  const currency = useCurrencyStore(state => state.currency);
  const symbol = useCurrencyStore(state => state.symbol);
  const hasSale =
    product.salePrice != null && product.salePrice < product.price;
  const displayPrice = hasSale ? product.salePrice! : product.price;

  const handleClick = () => onNavigate?.();

  if (variant === 'card') {
    return (
      <Link
        href={`/products/${product.id}`}
        className={cn(
          'group flex items-center gap-4 overflow-hidden rounded-2xl border bg-linear-to-br from-card via-card to-muted/40 p-4 transition-all hover:border-primary/30 hover:shadow-md',
          className
        )}
      >
        <div className='relative size-20 shrink-0 overflow-hidden rounded-xl'>
          <Image
            src={product.image || '/no-product.svg'}
            alt={product.name}
            fill
            sizes='80px'
            className='object-cover transition-transform duration-500 group-hover:scale-105'
          />
        </div>
        <div className='min-w-0 flex-1 space-y-1.5'>
          <p className='text-muted-foreground text-[11px] font-medium tracking-wider uppercase'>
            {t('featured-product')}
          </p>
          <p className='line-clamp-2 font-semibold leading-snug'>{product.name}</p>
          <div className='flex flex-wrap items-center gap-2'>
            {hasSale ? (
              <>
                <span
                  className='text-muted-foreground text-sm line-through tabular-nums'
                  dir='ltr'
                >
                  {formatPrice(product.price * currency, symbol)}
                </span>
                <span className='text-primary text-base font-bold tabular-nums' dir='ltr'>
                  {formatPrice(displayPrice * currency, symbol)}
                </span>
                <Badge variant='destructive' className='text-[10px]'>
                  {t('sale')}
                </Badge>
              </>
            ) : (
              <span className='text-primary text-base font-bold tabular-nums' dir='ltr'>
                {formatPrice(displayPrice * currency, symbol)}
              </span>
            )}
          </div>
        </div>
        <span className='bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-full transition-colors group-hover:bg-primary group-hover:text-white'>
          <ShoppingBag className='size-4' aria-hidden />
        </span>
      </Link>
    );
  }

  const isViewer = variant === 'viewer';

  return (
    <Link
      href={`/products/${product.id}`}
      onClick={handleClick}
      className={cn(
        'group flex items-center gap-3 rounded-2xl border transition-all',
        isViewer
          ? 'border-white/15 bg-black/50 p-3 backdrop-blur-xl hover:border-white/30 hover:bg-black/60'
          : 'border-white/20 bg-black/45 p-2 backdrop-blur-xl hover:border-white/35 hover:bg-black/55',
        className
      )}
    >
      <div
        className={cn(
          'relative shrink-0 overflow-hidden rounded-xl ring-2 ring-white/25',
          isViewer ? 'size-14' : 'size-10'
        )}
      >
        <Image
          src={product.image || '/no-product.svg'}
          alt={product.name}
          fill
          sizes={isViewer ? '56px' : '40px'}
          className='object-cover transition-transform duration-500 group-hover:scale-105'
        />
      </div>
      <div className='min-w-0 flex-1'>
        <p className='text-[10px] font-medium tracking-wider text-white/60 uppercase'>
          {t('featured-product')}
        </p>
        <p
          className={cn(
            'line-clamp-1 font-semibold text-white',
            isViewer ? 'text-sm' : 'text-xs'
          )}
        >
          {product.name}
        </p>
        <div className='mt-0.5 flex items-center gap-1.5'>
          {hasSale ? (
            <>
              <span
                className='text-[11px] text-white/45 line-through tabular-nums'
                dir='ltr'
              >
                {formatPrice(product.price * currency, symbol)}
              </span>
              <span
                className={cn(
                  'font-bold text-white tabular-nums',
                  isViewer ? 'text-sm' : 'text-xs'
                )}
                dir='ltr'
              >
                {formatPrice(displayPrice * currency, symbol)}
              </span>
            </>
          ) : (
            <span
              className={cn(
                'font-bold text-white tabular-nums',
                isViewer ? 'text-sm' : 'text-xs'
              )}
              dir='ltr'
            >
              {formatPrice(displayPrice * currency, symbol)}
            </span>
          )}
        </div>
      </div>
      <span className='flex size-8 shrink-0 items-center justify-center rounded-full bg-white/15 transition-colors group-hover:bg-white/25'>
        <ArrowUpRight className='size-4 text-white' aria-hidden />
      </span>
    </Link>
  );
};

export default ReelFeaturedProduct;
