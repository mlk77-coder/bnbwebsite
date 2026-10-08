'use client';

import CartItemVariants from '@/features/cart/client/cart-item-variants';
import { formatPrice } from '@/lib/utils';
import useCurrencyStore from '@/store/use-currency-store';
import useProductDetailsStore from '@/store/use-product-details-store';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const ProductPreview = () => {
  const t = useTranslations('product');
  const productDetail = useProductDetailsStore(state => state.productDetail);
  const quantity = useProductDetailsStore(state => state.quantity);
  const variantAttrs = useProductDetailsStore(
    state => state.selectedVariantAttributes
  );
  const currency = useCurrencyStore(state => state.currency);
  const symbol = useCurrencyStore(state => state.symbol);

  return (
    <div className='flex w-full items-start justify-start gap-4 sm:gap-5'>
      <Image
        src={productDetail.image ?? ''}
        alt={productDetail.name}
        width={250}
        height={250}
        className='size-24 shrink-0 object-cover sm:size-28'
      />
      <div className='flex w-full flex-col items-start justify-start gap-1.5 text-sm'>
        <span className='font-body text-base font-medium tracking-normal'>
          {productDetail.name}
        </span>
        {variantAttrs.length > 0 ? (
          <CartItemVariants attributes={variantAttrs} compact />
        ) : null}
        <span className='text-muted-foreground'>
          {t('preview-quantity', { quantity })}
        </span>
        <span className='font-bold'>
          {formatPrice(productDetail.price * currency, symbol)}
        </span>
      </div>
    </div>
  );
};

export default ProductPreview;
