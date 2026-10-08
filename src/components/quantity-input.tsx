'use client';

import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { Button } from './ui/button';

type PropsType = {
  value: number;
  setValue: (quantity: number) => void;
  size?: 'default' | 'sm';
};

const QuantityInput: FC<PropsType> = ({
  setValue,
  value,
  size = 'default',
}) => {
  const t = useTranslations();
  const isSm = size === 'sm';

  return (
    <div
      className={cn(
        'flex items-center justify-start',
        isSm ? 'gap-1' : 'gap-2'
      )}
    >
      <Button
        onClick={() => setValue(value - 1)}
        disabled={value === 1}
        className={cn(isSm && 'size-6 rounded-md')}
        type='button'
        size='icon'
      >
        <span className='sr-only'>{t('decrease')}</span>
        <Minus className={cn(isSm ? 'size-3' : undefined)} />
      </Button>
      <p
        className={cn(
          'border-foreground/80 flex items-center justify-center border select-none',
          isSm ? 'size-6 rounded-md text-xs' : 'size-10 rounded'
        )}
      >
        {value}
      </p>
      <Button
        onClick={() => {
          if (value < 10) setValue(value + 1);
        }}
        disabled={value === 10}
        className={cn(isSm && 'size-6 rounded-md')}
        size='icon'
        type='button'
      >
        <span className='sr-only'>{t('increase')}</span>
        <Plus className={cn(isSm ? 'size-3' : undefined)} />
      </Button>
    </div>
  );
};

export default QuantityInput;
