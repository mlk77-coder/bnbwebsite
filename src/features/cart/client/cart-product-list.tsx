'use client';

import { Cart } from '@/types/cart';
import useUpdateCart from '@/features/cart/client/hooks/use-update-cart';
import CartProductCard from '@/features/cart/client/cart-product-card';
import Loader from '@/components/ui/loader';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { ShoppingBag, Undo2Icon } from 'lucide-react';
import { cn } from '@/lib/utils';
import ClearCartButton from '@/features/cart/client/clear-cart-button';
import { Fragment } from 'react';

const CartProductsList = ({
  cart,
  userToken,
  isLoggedIn,
}: {
  cart: Cart;
  userToken: string;
  isLoggedIn: boolean;
}) => {
  const { isPending, data, isError, isFetching } = useUpdateCart(
    cart,
    userToken,
    isLoggedIn
  );
  const t = useTranslations();
  if (isPending)
    return (
      <div className='border-primary/10 bg-primary/5 flex min-h-80 w-full flex-col items-center justify-center gap-4 rounded-3xl border'>
        <span className='shadow-primary/10 flex size-16 items-center justify-center rounded-full bg-white shadow-lg'>
          <Loader size='lg' className='text-primary' />
        </span>
        <div className='text-center'>
          <p className='text-primary text-lg font-semibold'>
            {t('cart.loading')}
          </p>
          <p className='text-muted-foreground text-sm'>
            {t('cart.loading-description')}
          </p>
        </div>
      </div>
    );
  if (isError)
    return (
      <p className='text-primary w-full text-center text-lg'>
        {t('failed-to-fetch-cart')}
      </p>
    );
  return (
    <Fragment>
      {isFetching ? (
        <div className='absolute inset-x-0 top-0 z-20 flex justify-center pt-3'>
          <div className='border-primary/10 text-primary shadow-primary/10 flex items-center gap-2 rounded-full border bg-white/90 px-4 py-2 text-sm font-medium shadow-lg backdrop-blur'>
            <Loader size='xs' className='text-primary' />
            {t('cart.updating')}
          </div>
        </div>
      ) : null}
      {data.items.length === 0 ? (
        <div className='flex w-full flex-col items-center gap-20 rounded p-4 text-xl capitalize'>
          <p className='text-primary text-2xl font-semibold'>
            {t('cart.your-cart-is-empty')}
          </p>
          <Link
            href='/'
            className={cn(
              "text-primary before:bg-primary relative flex items-center gap-1.5 before:absolute before:-bottom-0.5 before:h-px before:w-full before:content-[''] hover:before:hidden"
            )}
          >
            <Undo2Icon size={16} />
            {t('go-home')}
          </Link>
        </div>
      ) : (
        <Fragment>
          <div className='border-primary/10 shadow-primary/5 flex flex-col gap-4 rounded-3xl border bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex items-center gap-3'>
              <span className='bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl'>
                <ShoppingBag className='size-5' />
              </span>
              <div>
                <h1 className='text-primary text-2xl font-bold sm:text-3xl'>
                  {t('your-cart')}
                </h1>
                <p className='text-muted-foreground text-sm'>
                  {t('cart.products-count', {
                    count: data.items.reduce(
                      (sum, item) => sum + item.quantity,
                      0
                    ),
                  })}
                </p>
              </div>
            </div>
            <ClearCartButton />
          </div>
          <div className='overflow-hidden rounded-xl border border-gray-100 bg-white md:space-y-4 md:overflow-visible md:rounded-none md:border-0 md:bg-transparent'>
            {data.items.map(item => (
              <CartProductCard
                key={`${item.id}-${item.product.id}`}
                item={item}
              />
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CartProductsList;
