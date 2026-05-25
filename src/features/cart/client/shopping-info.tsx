'use client';

import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn, formatPrice } from '@/lib/utils';
import { Link } from '@/navigation';
import useCartShoppingStore from '@/store/use-cart-shopping-store';
import useCurrencyStore from '@/store/use-currency-store';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

const ShoppingInfo = () => {
  const t = useTranslations();
  const tHome = useTranslations('home');
  const subtotal = useCartShoppingStore(state => state.subtotal);
  const tax = useCartShoppingStore(state => state.tax);
  const shipping = useCartShoppingStore(state => state.shipping);
  const total = useCartShoppingStore(state => state.total);
  const currency = useCurrencyStore(state => state.currency);
  const symbol = useCurrencyStore(state => state.symbol);

  return (
    <div
      className={cn(
        'static top-20 w-full sm:ms-4 md:sticky md:w-5/12 lg:ms-10 lg:w-4/12',
        {
          'hidden md:hidden': subtotal <= 0,
        }
      )}
    >
      <div className='border-primary/10 overflow-hidden rounded-3xl border bg-white'>
        <div className='p-5'>
          <div className='flex items-start justify-between gap-4'>
            <div>
              <p className='text-primary/70 text-xs font-semibold tracking-[0.2em] uppercase'>
                {tHome('site-name')}
              </p>
              <h3 className='text-foreground mt-1 text-2xl font-bold'>
                {t('shopping-info')}
              </h3>
            </div>
            <span className='text-primary flex size-11 items-center justify-center rounded-2xl bg-white shadow-sm'>
              <ShieldCheck className='size-5' />
            </span>
          </div>
        </div>

        <div className='space-y-4 p-5'>
          <div className='bg-secondary/40 space-y-3 rounded-2xl p-4'>
            <p className='flex w-full items-center justify-between text-sm capitalize'>
              <span className='text-muted-foreground'>{t('subtotal')}</span>
              <span className='font-medium'>
                {formatPrice(subtotal * currency, symbol)}
              </span>
            </p>
            <p className='flex w-full items-center justify-between text-sm capitalize'>
              <span className='text-muted-foreground'>{t('tax')}</span>
              <span className='font-medium'>
                {formatPrice(tax * currency, symbol)}
              </span>
            </p>
            <p className='flex w-full items-center justify-between text-sm capitalize'>
              <span className='text-muted-foreground'>{t('shipping')}</span>
              <span className='font-medium'>
                {formatPrice(shipping * currency, symbol)}
              </span>
            </p>
          </div>

          <Separator />

          <div className='flex items-center justify-between'>
            <span className='text-foreground text-base font-semibold capitalize'>
              {t('total')}
            </span>
            <span className='text-primary text-2xl font-bold'>
              {formatPrice(total * currency, symbol)}
            </span>
          </div>

          <Link
            href='/checkout'
            className={cn(
              buttonVariants({ size: 'lg' }),
              'shadow-primary/20 h-13 w-full gap-2 rounded-2xl text-base uppercase shadow-lg'
            )}
          >
            {t('continue-to-checkout')}
            <ArrowRight className='size-4 rtl:rotate-180' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShoppingInfo;
