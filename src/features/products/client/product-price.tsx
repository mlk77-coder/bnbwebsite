'use client';

import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';
import useCurrencyStore from '@/store/use-currency-store';
import useProductDetailsStore from '@/store/use-product-details-store';
import { ProductDetails } from '@/types/products';
import { isWithinInterval, subDays } from 'date-fns';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

type PropsType = {
  defaultProduct: ProductDetails;
};

const ProductPrice: FC<PropsType> = ({ defaultProduct }) => {
  const t = useTranslations();
  const currency = useCurrencyStore(state => state.currency);
  const symbol = useCurrencyStore(state => state.symbol);
  const productDetail = useProductDetailsStore(state => state.productDetail);

  const hasLivePrice = productDetail.price > 0;
  const price = hasLivePrice
    ? (productDetail.compareAtPrice ?? productDetail.price)
    : defaultProduct.price;
  const salePrice = hasLivePrice
    ? (productDetail.salePrice ?? null)
    : defaultProduct.sale_price;

  const isNewProduct = (dateString: string) => {
    const productDate = new Date(dateString);
    const weekAgo = subDays(new Date(), 7);
    return isWithinInterval(productDate, { start: weekAgo, end: new Date() });
  };

  const renderPrice = (basePrice: number, sale?: number | null) => (
    <div className='flex items-center justify-start gap-2'>
      {sale && sale < basePrice ? (
        <>
          <p className='text-primary text-3xl font-bold line-through'>
            {formatPrice(basePrice * currency, symbol)}
          </p>
          <p className='text-orange text-3xl font-bold'>
            {formatPrice(sale * currency, symbol)}
          </p>
        </>
      ) : (
        <p className='text-primary text-3xl font-bold'>
          {formatPrice(basePrice * currency, symbol)}
        </p>
      )}
    </div>
  );

  return (
    <div className='flex items-center justify-start gap-3'>
      {renderPrice(price, salePrice)}

      {salePrice && salePrice < price ? (
        <Badge variant='destructive' className='capitalize'>
          {t('sale')}
        </Badge>
      ) : isNewProduct(defaultProduct.created_at) ? (
        <Badge
          variant='outline'
          className='border-primary/25 bg-primary/10 text-primary capitalize'
        >
          {t('new-in')}
        </Badge>
      ) : null}
    </div>
  );
};

export default ProductPrice;
