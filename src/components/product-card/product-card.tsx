'use client';

import SheetCloseLink from '@/app/[locale]/_components/SheetCloseLink';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';
import { ProductCard as ProductCardType } from '@/types/products';
import { useLocale } from 'next-intl';
import { FC } from 'react';
import { getLangDir } from 'rtl-detect';
import ProductImage from './product-image';
import ProductInfo from './product-info';
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

  const Wrapper = insideSheet ? SheetCloseLink : Link;

  return (
    <article dir={dir} className={cn('group relative flex flex-col')}>
      {/* ── Image zone ── */}
      <div className='relative overflow-hidden rounded-xl'>
        {/* Clickable image → product page */}
        <Wrapper href={`/products/${product.id}`} tabIndex={-1} aria-hidden>
          <ProductImage product={product} />
        </Wrapper>

        {/* Floating wishlist heart */}
        {showWishlistHeart ? <WishlistHeart id={product.id} /> : null}

        {/* Quick-add to cart */}
        <QuickAddButton
          productId={product.id}
          outOfStock={!product.is_available}
        />
      </div>

      {/* ── Info zone ── */}
      <div className='flex flex-1 flex-col'>
        <Wrapper href={`/products/${product.id}`}>
          <ProductInfo product={product} />
        </Wrapper>
        <ProductSocialStats product={product} />
      </div>
    </article>
  );
};

export default ProductCard;
