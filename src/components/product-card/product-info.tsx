'use client';

import { cn, formatPrice } from '@/lib/utils';
import useCurrencyStore from '@/store/use-currency-store';
import { ProductCard as ProductCardType } from '@/types/products';
import { FC } from 'react';

type ProductInfoProps = {
  product: ProductCardType;
};

const ProductInfo: FC<ProductInfoProps> = ({ product }) => {
  const currency = useCurrencyStore(s => s.currency);
  const symbol = useCurrencyStore(s => s.symbol);

  const originalPrice = formatPrice(product.price * currency, symbol);
  const salePrice =
    product.sale_price && product.sale_price < product.price
      ? formatPrice(product.sale_price * currency, symbol)
      : null;

  return (
    <div className='space-y-0.5 pt-2.5'>
      <p className='truncate text-sm leading-snug font-medium'>
        {product.name}
      </p>
      <div className='flex items-center gap-1.5 text-sm'>
        {salePrice ? (
          <>
            <span className='text-orange font-semibold'>{salePrice}</span>
            <span className={cn('text-muted-foreground text-xs line-through')}>
              {originalPrice}
            </span>
          </>
        ) : (
          <span className='font-semibold'>{originalPrice}</span>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
