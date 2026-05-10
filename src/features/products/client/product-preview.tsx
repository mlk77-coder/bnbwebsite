'use client';

import { formatPrice } from '@/lib/utils';
import useCurrencyStore from '@/store/use-currency-store';
import useProductDetailsStore from '@/store/use-product-details-store';
import Image from 'next/image';

const ProductPreview = () => {
  const productDetail = useProductDetailsStore(state => state.productDetail);
  const quantity = useProductDetailsStore(state => state.quantity);
  const currency = useCurrencyStore(state => state.currency);
  const symbol = useCurrencyStore(state => state.symbol);
  return (
    <div className='flex w-full justify-start items-start gap-5'>
      <Image
        src={productDetail.image ?? ''}
        alt={productDetail.name}
        width={250}
        height={250}
        className='size-28 shrink-0 object-cover'
      />
      <span className='w-full flex ltr:tracking-wide text-sm flex-col justify-start items-start'>
        <span className='w-full text-base font-medium'>{productDetail.name}</span>
        <span className='ltr:tracking-wide'>Quantity: {quantity}</span>
        <span className='font-bold'>
          {formatPrice(productDetail.price * currency, symbol)}
        </span>
      </span>
    </div>
  );
};

export default ProductPreview;
