'use client';

import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';
import { ProductDetails } from '@/types/products';
import { FC } from 'react';
import { isWithinInterval, subDays } from 'date-fns';
import { useTranslations } from 'next-intl';
import useCurrencyStore from '@/store/use-currency-store';

type PropsType = {
  defaultProduct: ProductDetails;
};

const ProductPrice: FC<PropsType> = ({ defaultProduct }) => {
  const t = useTranslations();
  const currency = useCurrencyStore(state => state.currency);
  const symbol = useCurrencyStore(state => state.symbol);

  const isNewProduct = (dateString: string) => {
    const productDate = new Date(dateString);
    const weekAgo = subDays(new Date(), 7);
    return isWithinInterval(productDate, { start: weekAgo, end: new Date() });
  };

  const renderPrice = (price: number, salePrice?: number | null) => (
    <div className='flex items-center justify-start gap-2'>
      {salePrice && salePrice < price ? (
        <>
          <p className='text-primary text-3xl font-bold line-through'>
            {formatPrice(price * currency, symbol)}
          </p>
          <p className='text-orange text-3xl font-bold'>
            {formatPrice(salePrice * currency, symbol)}
          </p>
        </>
      ) : (
        <p className='text-primary text-3xl font-bold'>
          {formatPrice(price * currency, symbol)}
        </p>
      )}
    </div>
  );

  return (
    <div className='flex items-center justify-start gap-3'>
      {renderPrice(defaultProduct.price, defaultProduct.sale_price)}

      {defaultProduct.sale_price &&
      defaultProduct.sale_price < defaultProduct.price ? (
        <Badge variant='destructive' className='capitalize'>
          {t('sale')}
        </Badge>
      ) : isNewProduct(defaultProduct.created_at) ? (
        <Badge variant='secondary' className='capitalize'>
          {t('new-in')}
        </Badge>
      ) : null}
    </div>
  );
};

export default ProductPrice;
