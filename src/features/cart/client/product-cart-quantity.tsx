'use client';

import useDebounceValue from '@/app/hooks/use-debounce-value';
import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/loader';
import { cn } from '@/lib/utils';
import { CartItem } from '@/types/cart';
import { Minus, Plus } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import useUpdateCartItem from '@/features/cart/client/hooks/use-update-cart-item';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

type PropsType = {
  item: CartItem;
  size?: 'default' | 'compact';
  className?: string;
};

const ProductCartQuantity: FC<PropsType> = ({
  item,
  size = 'default',
  className,
}) => {
  const [value, setValue] = useState(item.quantity);
  const [debouncedValue] = useDebounceValue(value, 500);
  const t = useTranslations();
  const isCompact = size === 'compact';

  const { mutate, isPending } = useUpdateCartItem(item);

  useEffect(() => {
    if (debouncedValue !== item.quantity) {
      mutate(debouncedValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  useEffect(() => {
    setValue(item.quantity);
  }, [item.quantity]);

  const handleChange = (newValue: number) => {
    if (newValue < 1) return;

    if (item.product.stock_quantity && newValue > item.product.stock_quantity) {
      toast.warning(t('you-cant-add-more-than-the-available-quantity'));
    } else {
      setValue(newValue);
    }
  };

  const buttonClass = isCompact
    ? 'size-8 rounded-none shadow-none'
    : 'size-8 rounded-full shadow-none';

  return (
    <div
      className={cn(
        'flex items-center',
        isCompact
          ? 'h-9 overflow-hidden rounded-lg border border-gray-200 bg-white'
          : 'gap-2 rounded-full border border-primary/15 bg-white p-1 shadow-sm',
        className
      )}
    >
      <Button
        onClick={() => handleChange(value - 1)}
        disabled={value === 1 || isPending}
        className={cn(
          buttonClass,
          isCompact
            ? 'text-gray-600 hover:bg-gray-50 disabled:opacity-40'
            : 'bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-60'
        )}
        type='button'
        size='icon'
        variant='ghost'
      >
        <span className='sr-only'>{t('decrease')}</span>
        <Minus className='size-3.5' />
      </Button>

      <div
        className={cn(
          'relative flex items-center justify-center font-semibold select-none',
          isCompact
            ? 'min-w-9 border-x border-gray-200 px-2 text-sm text-foreground'
            : 'bg-secondary/70 text-foreground size-9 rounded-full text-sm'
        )}
      >
        <span className={isPending ? 'opacity-0' : undefined}>{value}</span>
        {isPending ? (
          <Loader
            size='xs'
            variant='spinner'
            className='text-primary absolute'
          />
        ) : null}
      </div>

      <Button
        disabled={isPending}
        onClick={() => handleChange(value + 1)}
        className={cn(
          buttonClass,
          isCompact
            ? 'text-gray-600 hover:bg-gray-50 disabled:opacity-40'
            : 'bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60'
        )}
        size='icon'
        type='button'
        variant={isCompact ? 'ghost' : 'default'}
      >
        <span className='sr-only'>{t('increase')}</span>
        <Plus className='size-3.5' />
      </Button>
    </div>
  );
};

export default ProductCartQuantity;
