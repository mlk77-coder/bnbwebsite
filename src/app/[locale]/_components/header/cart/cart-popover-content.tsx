'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn, formatPrice } from '@/lib/utils';
import { Link } from '@/navigation';
import { Cart } from '@/types/cart';
import { PopoverClose } from '@radix-ui/react-popover';
import Image from 'next/image';
import { ArrowRight, PackageOpen, ShoppingBag, X } from 'lucide-react';
import { Fragment } from 'react';
import CartItemVariants from '@/features/cart/client/cart-item-variants';
import useUpdateCart from '@/features/cart/client/hooks/use-update-cart';
import { useTranslations } from 'next-intl';
import useCurrencyStore from '@/store/use-currency-store';
import Loader from '@/components/ui/loader';
import { SheetClose } from '@/components/ui/sheet';
import { Slot } from '@radix-ui/react-slot';

const CartPopoverContent = ({
  cart,
  userToken,
  isLoggedIn,
  insideSheet = false,
}: {
  cart: Cart;
  userToken: string;
  isLoggedIn: boolean;
  insideSheet?: boolean;
}) => {
  const t = useTranslations();
  const tA11y = useTranslations('accessibility');
  const currency = useCurrencyStore(state => state.currency);
  const symbol = useCurrencyStore(state => state.symbol);
  const { isPending, data, isError, isFetching } = useUpdateCart(
    cart,
    userToken,
    isLoggedIn
  );

  const Components = insideSheet ? SheetClose : Slot;
  if (isPending)
    return (
      <div className='flex min-h-72 flex-col items-center justify-center gap-4 p-8'>
        <span className='bg-primary/10 flex size-16 items-center justify-center rounded-full'>
          <Loader className='text-primary' variant='spinner' size='lg' />
        </span>
        <div className='text-center'>
          <p className='text-primary font-semibold'>{t('cart.loading')}</p>
          <p className='text-muted-foreground text-xs'>
            {t('cart.loading-description')}
          </p>
        </div>
      </div>
    );
  if (isError)
    return (
      <p className='text-primary w-full p-8 text-center text-lg'>
        {t('failed-to-fetch-cart')}
      </p>
    );
  if (data.items.length === 0)
    return (
      <div className='flex min-h-64 flex-col items-center justify-center gap-3 p-8 text-center'>
        <span className='bg-primary/10 text-primary flex size-16 items-center justify-center rounded-full'>
          <PackageOpen className='size-8' />
        </span>
        <p className='text-primary text-lg font-semibold capitalize'>
          {t('cart.your-cart-is-empty')}
        </p>
        <Link
          href='/'
          className={cn(
            buttonVariants({ variant: 'outline', size: 'sm' }),
            'border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground rounded-full'
          )}
        >
          {t('go-home')}
        </Link>
      </div>
    );
  return (
    <Fragment>
      <div className='relative'>
        {isFetching ? (
          <div className='absolute inset-x-0 top-2 z-20 flex justify-center'>
            <div className='border-primary/10 text-primary shadow-primary/10 flex items-center gap-2 rounded-full border bg-white/90 px-3 py-1.5 text-xs font-medium shadow-lg backdrop-blur'>
              <Loader size='xs' className='text-primary' />
              {t('cart.updating')}
            </div>
          </div>
        ) : null}
      </div>

      <div className='flex w-full items-center justify-between px-5 py-3'>
        <p className='text-foreground inline-flex items-center gap-2 text-sm font-semibold'>
          <ShoppingBag className='text-primary size-4' />
          {t('item-s-in-your-cart')}
        </p>
        <PopoverClose asChild>
          <Button
            variant='ghost'
            size='icon'
            className='text-muted-foreground size-8 rounded-full hover:bg-red-50 hover:text-red-500'
          >
            <span className='sr-only'>{tA11y('close')}</span>
            <X className='size-4' />
          </Button>
        </PopoverClose>
      </div>

      <div className='space-y-3 px-4 pb-4'>
        {data.items.map((item, index) => (
          <Link
            key={`${item.id}-${item.product.id}-${index}`}
            href={`/products/${item.product.id}`}
            className='group border-primary/10 bg-secondary/30 hover:border-primary/25 hover:bg-primary/5 grid grid-cols-[auto_1fr] gap-3 rounded-2xl border p-2.5 transition-all'
          >
            <div className='relative overflow-hidden rounded-xl bg-white'>
              <Image
                src={item.product.image ?? '/no-product.svg'}
                alt={item.product.name}
                width={160}
                height={160}
                className='size-20 object-cover transition-transform duration-300 group-hover:scale-105'
              />
            </div>
            <div className='min-w-0 space-y-2'>
              <div className='flex items-start justify-between gap-3'>
                <h4
                  title={item.product.name}
                  className='text-foreground group-hover:text-primary line-clamp-2 text-sm leading-snug font-semibold'
                >
                  {item.product.name}
                </h4>
                <span className='text-primary rounded-full bg-white px-2 py-0.5 text-xs font-semibold shadow-sm'>
                  x{item.quantity}
                </span>
              </div>
              {item.variant?.attributes?.length ? (
                <CartItemVariants
                  attributes={item.variant.attributes}
                  compact
                />
              ) : null}
              <div className='flex items-end justify-between gap-2'>
                <p className='text-muted-foreground text-xs'>
                  {formatPrice(
                    (item.variant?.sale_price ??
                      item.variant?.price ??
                      item.product.sale_price ??
                      item.product.price) * currency,
                    symbol
                  )}
                </p>
                <p className='text-foreground text-sm font-bold'>
                  {formatPrice(item.subtotal * currency, symbol)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className='border-primary/10 border-t bg-white p-4'>
        <div className='bg-secondary/40 mb-3 space-y-2 rounded-2xl p-3'>
          <p className='flex w-full items-center justify-between text-sm'>
            <span className='text-muted-foreground'>{t('subtotal')}</span>
            <span className='font-semibold'>
              {formatPrice(data.summary.subtotal * currency, symbol)}
            </span>
          </p>
          <p className='flex w-full items-center justify-between text-sm'>
            <span className='text-muted-foreground'>{t('total')}</span>
            <span className='text-primary text-lg font-bold'>
              {formatPrice(data.summary.total * currency, symbol)}
            </span>
          </p>
        </div>

        <Link
          href='/cart'
          className={cn(
            buttonVariants({ size: 'lg' }),
            'shadow-primary/20 w-full rounded-2xl p-0 text-base uppercase shadow-lg ltr:tracking-wider'
          )}
        >
          <Components asChild>
            <PopoverClose asChild>
              <span className='inline-flex size-full items-center justify-center gap-2'>
                {t('view-cart')}
                <ArrowRight className='size-4 rtl:rotate-180' />
              </span>
            </PopoverClose>
          </Components>
        </Link>
      </div>
    </Fragment>
  );
};

export default CartPopoverContent;
