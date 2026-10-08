'use client';

import { addToCartAction } from '@/app/actions/cart-actions';
import { getLoginUrlWithCallback } from '@/lib/auth-navigation';
import { ADD_TO_CART_AUTH_REQUIRED } from '@/lib/cart-auth';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from '@/navigation';
import useCartCountStore from '@/store/use-cart-count-store';
import { Check, Loader2, ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

type State = 'idle' | 'loading' | 'done';

type Props = {
  productId: number;
  outOfStock?: boolean;
};

/** Icon quick-add on the trailing side of the card info. */
export function QuickAddButton({ productId, outOfStock }: Props) {
  const [state, setState] = useState<State>('idle');
  const increment = useCartCountStore(s => s.incrementProductsCount);
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (state !== 'idle' || outOfStock) return;

    setState('loading');
    try {
      const result = await addToCartAction({
        product_id: productId,
        quantity: 1,
      });
      if (result !== 'success') {
        if (result === ADD_TO_CART_AUTH_REQUIRED) {
          router.push(getLoginUrlWithCallback(pathname || '/'));
        } else {
          toast.error(result);
        }
        setState('idle');
        return;
      }
      increment(1);
      setState('done');
      setTimeout(() => setState('idle'), 2200);
    } catch {
      toast.error(t('cart.add-failed'));
      setState('idle');
    }
  };

  return (
    <button
      type='button'
      onClick={handleAdd}
      disabled={!!outOfStock || state === 'loading'}
      aria-label={t('cart.add-to-cart-button')}
      title={t('cart.add-to-cart-button')}
      className={cn(
        'inline-flex h-9 shrink-0 items-center justify-center rounded-full px-3.5 transition-all duration-200',
        'disabled:pointer-events-none disabled:opacity-40',
        'focus-visible:ring-primary/40 focus-visible:ring-2 focus-visible:outline-none',
        state === 'done'
          ? 'bg-primary text-white shadow-sm'
          : cn(
              'border-border/80 bg-background text-foreground border shadow-sm',
              'hover:border-primary hover:text-primary hover:shadow-md',
              'active:scale-[0.97]'
            )
      )}
    >
      {state === 'loading' ? (
        <Loader2 className='size-4 animate-spin' />
      ) : state === 'done' ? (
        <Check className='size-4' strokeWidth={2.5} />
      ) : (
        <ShoppingCart className='size-4' strokeWidth={1.8} />
      )}
    </button>
  );
}
