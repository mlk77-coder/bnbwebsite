'use client';

import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils';
import type { CartSummary } from '@/types/cart';
import useCurrencyStore from '@/store/use-currency-store';
import { useTranslations } from 'next-intl';
import { type FC } from 'react';

type Props = {
  summary: CartSummary;
};

const CheckoutOrderBreakdown: FC<Props> = ({ summary }) => {
  const t = useTranslations();
  const currency = useCurrencyStore(state => state.currency);
  const symbol = useCurrencyStore(state => state.symbol);

  const fmt = (amount: number) =>
    formatPrice(Math.max(0, amount) * currency, symbol);

  return (
    <>
      <div className='bg-secondary/40 space-y-3 rounded-2xl p-4'>
        <p className='flex w-full items-center justify-between text-sm capitalize'>
          <span className='text-muted-foreground'>{t('subtotal')}</span>
          <span className='font-medium'>{fmt(summary.subtotal)}</span>
        </p>
        <p className='flex w-full items-center justify-between text-sm capitalize'>
          <span className='text-muted-foreground'>{t('tax')}</span>
          <span className='font-medium'>{fmt(summary.tax)}</span>
        </p>
        <p className='flex w-full items-center justify-between text-sm capitalize'>
          <span className='text-muted-foreground'>{t('shipping')}</span>
          <span className='font-medium'>{fmt(summary.shipping)}</span>
        </p>
        <p className='flex w-full items-center justify-between text-sm capitalize'>
          <span className='text-muted-foreground'>{t('payment')}</span>
          <span className='font-medium'>{t('checkout-cash-on-delivery')}</span>
        </p>
      </div>

      <Separator />

      <div className='flex items-center justify-between'>
        <span className='text-foreground text-base font-semibold capitalize'>
          {t('total')}
        </span>
        <span className='text-primary text-2xl font-bold'>
          {fmt(summary.total)}
        </span>
      </div>
    </>
  );
};

export default CheckoutOrderBreakdown;
