'use client';

import useCartCountStore from '@/store/use-cart-count-store';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { Check, Loader2, ShoppingBag } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

type State = 'idle' | 'loading' | 'done';

type Props = {
  productId: number;
  outOfStock?: boolean;
};

export function QuickAddButton({ productId, outOfStock }: Props) {
  const [state, setState] = useState<State>('idle');
  const increment = useCartCountStore(s => s.incrementProductsCount);
  const t = useTranslations();

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (state !== 'idle' || outOfStock) return;

    setState('loading');
    try {
      await axios.post('/api/cart', { product_id: productId, quantity: 1 });
      increment(1);
      setState('done');
      setTimeout(() => setState('idle'), 2200);
    } catch (err) {
      if (
        axios.isAxiosError(err) &&
        (err.response?.status === 400 || err.response?.status === 401)
      ) {
        toast.error(t('auth.sign-in'), {
          description: 'Sign in to add items to your cart',
          action: {
            label: t('auth.sign-in'),
            onClick: () => (window.location.href = '/sign-in'),
          },
        });
      } else {
        toast.error("Couldn't add to cart, please try again");
      }
      setState('idle');
    }
  };

  return (
    <>
      {/* Desktop — full bar slides up on hover */}
      <button
        onClick={handleAdd}
        disabled={!!outOfStock || state === 'loading'}
        aria-label={t('cart.add-to-cart-button')}
        className={cn(
          'absolute inset-x-0 bottom-0 z-10 hidden items-center justify-center gap-2 sm:flex',
          'h-11 text-[11px] font-semibold tracking-[0.16em] uppercase',
          'translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0',
          state === 'done'
            ? 'bg-green-600 text-white'
            : 'bg-foreground/95 text-background backdrop-blur-sm'
        )}
      >
        {state === 'loading' ? (
          <Loader2 className='size-3.5 animate-spin' />
        ) : state === 'done' ? (
          <>
            <Check className='size-3.5' />
            {t('cart.add-to-cart-button')}
          </>
        ) : (
          <>
            <ShoppingBag className='size-3.5' />
            {t('cart.add-to-cart-button')}
          </>
        )}
      </button>

      {/* Mobile — always-visible round button bottom-right */}
      <button
        onClick={handleAdd}
        disabled={!!outOfStock || state === 'loading'}
        aria-label={t('cart.add-to-cart-button')}
        className={cn(
          'absolute inset-e-2 bottom-2 z-10 sm:hidden',
          'flex size-8 items-center justify-center rounded-full shadow-md',
          'transition-colors duration-200',
          state === 'done'
            ? 'bg-green-600 text-white'
            : 'bg-background/95 text-foreground border-border/40 border backdrop-blur-sm'
        )}
      >
        {state === 'loading' ? (
          <Loader2 className='size-3.5 animate-spin' />
        ) : state === 'done' ? (
          <Check className='size-3.5' />
        ) : (
          <ShoppingBag className='size-3.5' />
        )}
      </button>
    </>
  );
}
