'use client';

import ProductCard from '@/components/product-card/product-card';
import useRelatedProductsStore from '@/store/use-related-product-store';
import { useTranslations } from 'next-intl';
import { Fragment, useEffect } from 'react';

const ClientRelatedProducts = () => {
  const productsList = useRelatedProductsStore(state => state.productsList);
  const reset = useRelatedProductsStore(state => state.reset);
  const t = useTranslations();

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);
  if (productsList.length === 0) return null;
  return (
    <Fragment>
      <h3 className='text-base sm:text-lg font-medium'>{t('you-may-also-like')}</h3>
      <div className='w-full flex justify-start flex-col sm:flex-row items-start gap-4'>
        {productsList.slice(0, 3).map((product, index) => (
          <div className='basis-1/2 md:basis-1/3 lg:basis-1/4' key={index}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ClientRelatedProducts;
