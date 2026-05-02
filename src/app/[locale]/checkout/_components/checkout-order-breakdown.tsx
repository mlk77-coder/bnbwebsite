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

function MoneyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex items-center justify-between gap-4 text-base'>
      <span className='text-primary font-medium'>{label}</span>
      <span className='text-muted-foreground shrink-0 tabular-nums'>
        {value}
      </span>
    </div>
  );
}

const CheckoutOrderBreakdown: FC<Props> = ({ summary }) => {
  const t = useTranslations();
  const currency = useCurrencyStore(state => state.currency);
  const symbol = useCurrencyStore(state => state.symbol);

  const fmt = (amount: number) =>
    formatPrice(Math.max(0, amount) * currency, symbol);

  return (
    <div className='space-y-4'>
      <div className='border-primary/15 bg-secondary/25 rounded-2xl border border-dashed px-4 py-3 sm:px-5'>
        <div className='text-muted-foreground flex items-center justify-between gap-4 text-sm'>
          <span className='text-primary font-medium'>{t('payment')}</span>
          <span>{t('checkout-cash-on-delivery')}</span>
        </div>
      </div>
      <div className='space-y-3'>
        <MoneyRow label={`${t('subtotal')}:`} value={fmt(summary.subtotal)} />
        <MoneyRow label={`${t('tax')}:`} value={fmt(summary.tax)} />
        <MoneyRow label={`${t('delivery')}:`} value={fmt(summary.shipping)} />
      </div>

      <Separator className='bg-primary/10' />

      <div className='flex items-center justify-between gap-4'>
        <span className='text-primary text-lg font-semibold'>{t('total')}</span>
        <span className='text-foreground text-2xl font-bold tracking-tight tabular-nums'>
          {fmt(summary.total)}
        </span>
      </div>
    </div>
  );
};

export default CheckoutOrderBreakdown;
