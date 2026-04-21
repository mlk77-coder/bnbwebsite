'use client';

import { cn } from '@/lib/utils';
import { ProductCard as ProductCardType } from '@/types/products';
import { isWithinInterval, subDays } from 'date-fns';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

type Props = { product: ProductCardType; selectedColor: string };

const ProductImage: FC<Props> = ({ product, selectedColor }) => {
  const t = useTranslations();
  const src = selectedColor || product.image;

  const isNew = isWithinInterval(new Date(product.created_at), {
    start: subDays(new Date(), 7),
    end: new Date(),
  });

  const discountPct =
    product.has_discount && product.price_after_sale && product.quantity !== 0
      ? Math.round((1 - product.price_after_sale / +product.price) * 100)
      : 0;

  return (
    <div className='bg-secondary/40 relative aspect-square overflow-hidden rounded-md'>
      {/* Primary image */}
      <Image
        src={src}
        alt={product.name}
        fill
        sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
        className={cn(
          'object-cover transition-transform duration-700 ease-out will-change-transform',
          'group-hover:scale-110 group-hover:rotate-[0.6deg]'
        )}
      />

      {/* Hover glow */}
      <div className='pointer-events-none absolute inset-0 bg-linear-to-tr from-black/0 via-white/0 to-white/0 transition-all duration-700 group-hover:from-black/10 group-hover:via-white/5 group-hover:to-primary/10' />

      {/* Shimmer sweep */}
      <div className='pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/25 opacity-0 blur-md transition-all duration-700 group-hover:left-[115%] group-hover:opacity-100' />

      {/* Out-of-stock overlay */}
      {product.quantity === 0 && (
        <div className='absolute inset-0 z-10 flex items-center justify-center bg-white/65 backdrop-blur-[2px]'>
          <span className='bg-background/90 border-border/50 border px-3 py-1 text-[10px] font-semibold tracking-widest uppercase'>
            {t('out-of-stock')}
          </span>
        </div>
      )}

      {/* Badges — top left */}
      <div className='pointer-events-none absolute inset-s-2.5 top-2.5 z-10 flex flex-col gap-1'>
        {discountPct > 0 && (
          <span className='bg-foreground text-background inline-flex w-fit rounded-sm px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase'>
            -{discountPct}%
          </span>
        )}
        {isNew && !discountPct && product.quantity !== 0 && (
          <span className='bg-primary text-primary-foreground inline-flex w-fit rounded-sm px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase'>
            {t('new-in')}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductImage;
