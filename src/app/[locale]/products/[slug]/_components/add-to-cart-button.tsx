'use client';

import { Button } from '@/components/ui/button';
import useCartCountStore from '@/store/use-cart-count-store';
import useProductDetailsStore from '@/store/use-product-details-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { isAxiosError } from 'axios';
import { useTranslations } from 'next-intl';
import { FC, Fragment, useEffect, useState } from 'react';
import AddToCartErrorDialog from './add-to-cart-error-dialog';
import AddToCartSuccessDialog from './add-to-cart-success-dialog';
import { ProductDetails } from '@/types/products';

type PropsType = {
  product: ProductDetails;
};

const AddToCartButton: FC<PropsType> = ({ product }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const queryClient = useQueryClient();
  const quantity = useProductDetailsStore(state => state.quantity);
  const incrementProductsCount = useCartCountStore(
    state => state.incrementProductsCount
  );
  const setProductDetail = useProductDetailsStore(
    state => state.setProductDetail
  );

  useEffect(() => {
    setProductDetail({
      name: product.name,
      image: product.image,
      price:
        product.sale_price && product.sale_price < product.price
          ? product.sale_price
          : product.price,
    });
  }, [product, setProductDetail]);

  const t = useTranslations();
  const { mutate, isPending, isError, reset, isSuccess } = useMutation({
    mutationFn: async (body: unknown) => {
      await axios.post('/api/cart', body);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      incrementProductsCount(quantity);
    },
    onError: error => {
      if (isAxiosError(error) && error.response?.data?.message) {
        setErrorMessage(
          typeof error === 'string'
            ? error
            : typeof error.response.data.message === 'string'
              ? error.response.data.message
              : Object.values(error.response.data.message)
                  .flatMap(err => err)
                  .join('\n')
        );
      } else {
        setErrorMessage('Something went wrong, please try again');
      }
    },
  });
  return (
    <Fragment>
      <Button
        disabled={!product.is_available || isPending}
        onClick={() =>
          mutate({
            quantity,
            product_id: product.id,
          })
        }
        size='lg'
        className='w-full uppercase'
      >
        {product.is_available
          ? t('cart.add-to-cart-button')
          : t('this-item-is-out-of-stock')}
      </Button>
      <AddToCartErrorDialog
        errorMessage={errorMessage}
        open={isError}
        onClose={() => {
          setErrorMessage('');
          reset();
        }}
      />
      <AddToCartSuccessDialog isOpen={isSuccess} onClose={reset} />
    </Fragment>
  );
};

export default AddToCartButton;
