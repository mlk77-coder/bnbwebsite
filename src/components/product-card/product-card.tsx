'use client';

import SheetCloseLink from '@/app/[locale]/_components/SheetCloseLink';
import { Link } from '@/navigation';
import { cn, formatPrice } from '@/lib/utils';
import useCurrencyStore from '@/store/use-currency-store';
import { ProductCard as ProductCardType } from '@/types/products';
import { useLocale } from 'next-intl';
import { FC } from 'react';
import { getLangDir } from 'rtl-detect';
import ProductImage from './product-image';
import ProductSocialStats from './product-social-stats';
import { QuickAddButton } from './quick-add-button';
import { WishlistHeart } from './wishlist-heart';

type PropsType = {
  product: ProductCardType;
  insideSheet?: boolean;
  showWishlistHeart?: boolean;
};

const ProductCard: FC<PropsType> = ({
  product,
  insideSheet,
  showWishlistHeart = true,
}) => {
  const locale = useLocale();
  const dir = getLangDir(locale);
  const currency = useCurrencyStore(s => s.currency);
  const symbol = useCurrencyStore(s => s.symbol);

  const Wrapper = insideSheet ? SheetCloseLink : Link;
  const originalPrice = formatPrice(product.price * currency, symbol);
  const salePrice =
    product.sale_price && product.sale_price < product.price
      ? formatPrice(product.sale_price * currency, symbol)
      : null;

  return (
    <article dir={dir} className={cn('group relative flex flex-col')}>
      <div className='relative overflow-hidden rounded-xl'>
        <Wrapper href={`/products/${product.id}`} tabIndex={-1} aria-hidden>
          <ProductImage product={product} />
        </Wrapper>

        {showWishlistHeart ? <WishlistHeart id={product.id} /> : null}
      </div>

      <div className='flex flex-1 flex-col gap-1.5 pt-2.5'>
        <div className='flex items-start justify-between gap-2'>
          <Wrapper
            href={`/products/${product.id}`}
            className='min-w-0 flex-1 space-y-0.5'
          >
            <p className='truncate text-sm leading-snug font-medium'>
              {product.name}
            </p>
            <div className='flex flex-wrap items-baseline gap-1.5 text-sm'>
              {salePrice ? (
                <>
                  <span className='text-orange font-semibold'>{salePrice}</span>
                  <span className='text-muted-foreground text-xs line-through'>
                    {originalPrice}
                  </span>
                </>
              ) : (
                <span className='font-semibold'>{originalPrice}</span>
              )}
            </div>
          </Wrapper>

          <QuickAddButton
            productId={product.id}
            outOfStock={!product.is_available}
          />
        </div>

        <ProductSocialStats product={product} />
      </div>
    </article>
  );
};

export default ProductCard;
