'use client';

import SheetCloseLink from '@/app/[locale]/_components/SheetCloseLink';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';
import { ProductCard as ProductCardType } from '@/types/products';
import { useLocale } from 'next-intl';
import { FC, useMemo, useState } from 'react';
import { getLangDir } from 'rtl-detect';
import ColorSelector from './color-selector';
import ProductImage from './product-image';
import ProductInfo from './product-info';
import { QuickAddButton } from './quick-add-button';
import { WishlistHeart } from './wishlist-heart';

type PropsType = {
  product: ProductCardType;
  insideSheet?: boolean;
};

const ProductCard: FC<PropsType> = ({ product, insideSheet }) => {
  const locale = useLocale();
  const dir = getLangDir(locale);
  const [selectedColor, setSelectedColor] = useState('');

  const colorsImages = useMemo(
    () =>
      product.product_color_attributes.filter(
        c => c.color && c.color_image && c.image
      ),
    [product.product_color_attributes]
  );

  const Wrapper = insideSheet ? SheetCloseLink : Link;

  return (
    <article dir={dir} className={cn('group relative flex flex-col')}>
      {/* ── Image zone ── */}
      <div className='relative overflow-hidden rounded-xl'>
        {/* Clickable image → product page */}
        <Wrapper href={`/products/${product.slug}`} tabIndex={-1} aria-hidden>
          <ProductImage product={product} selectedColor={selectedColor} />
        </Wrapper>

        {/* Floating wishlist heart */}
        <WishlistHeart id={product.id} />

        {/* Quick-add to cart */}
        <QuickAddButton
          slug={product.slug}
          outOfStock={product.quantity === 0}
        />
      </div>

      {/* ── Info zone ── */}
      <div className='flex flex-1 flex-col'>
        {colorsImages.length > 0 && (
          <ColorSelector
            colorsImages={colorsImages}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        )}
        <Wrapper href={`/products/${product.slug}`}>
          <ProductInfo product={product} />
        </Wrapper>
      </div>
    </article>
  );
};

export default ProductCard;
