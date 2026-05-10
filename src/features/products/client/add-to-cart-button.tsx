'use client';

import { addToCartAction } from '@/app/actions/cart-actions';
import { Button } from '@/components/ui/button';
import { ADD_TO_CART_AUTH_REQUIRED } from '@/lib/cart-auth';
import { getLoginUrlWithCallback } from '@/lib/auth-navigation';
import { usePathname, useRouter } from '@/navigation';
import useCartCountStore from '@/store/use-cart-count-store';
import useProductDetailsStore from '@/store/use-product-details-store';
import { AddToCartBody } from '@/types/cart';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { FC, Fragment, useEffect, useState } from 'react';
import AddToCartErrorDialog from '@/features/products/client/add-to-cart-error-dialog';
import AddToCartSuccessDialog from '@/features/products/client/add-to-cart-success-dialog';
import { ProductDetails } from '@/types/products';

type PropsType = {
  product: ProductDetails;
};

const AddToCartButton: FC<PropsType> = ({ product }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const pathname = usePathname();
  const router = useRouter();
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
    mutationFn: async (body: AddToCartBody) => {
      const result = await addToCartAction(body);
      if (result === ADD_TO_CART_AUTH_REQUIRED) {
        throw new Error(ADD_TO_CART_AUTH_REQUIRED);
      }
      if (result !== 'success') {
        throw new Error(result);
      }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      incrementProductsCount(quantity);
    },
    onError: error => {
      const message =
        error instanceof Error
          ? error.message
          : 'Something went wrong, please try again';
      if (message === ADD_TO_CART_AUTH_REQUIRED) {
        reset();
        router.push(getLoginUrlWithCallback(pathname || '/'));
        return;
      }
      setErrorMessage(message);
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
        open={
          isError &&
          errorMessage !== '' &&
          errorMessage !== ADD_TO_CART_AUTH_REQUIRED
        }
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
