import {
  isColorAttributeName,
  resolveSwatchColor,
} from '@/features/products/lib/variant-utils';
import { cn } from '@/lib/utils';
import type { CartVariantAttribute } from '@/types/cart';
import { FC } from 'react';

type PropsType = {
  attributes: CartVariantAttribute[];
  className?: string;
  /** Tighter chips for header popover */
  compact?: boolean;
};

/** Selected variant options — color as swatch, others as chips (Shein/Amazon). */
const CartItemVariants: FC<PropsType> = ({
  attributes,
  className,
  compact = false,
}) => {
  if (!attributes.length) return null;

  return (
    <ul className={cn('flex flex-wrap items-center gap-1.5', className)}>
      {attributes.map(attr => {
        const isColor = isColorAttributeName(attr.attribute_name);
        const swatch = isColor ? resolveSwatchColor(attr.value) : null;

        return (
          <li
            key={`${attr.attribute_name}-${attr.value}`}
            className={cn(
              'border-border/60 bg-secondary/50 inline-flex max-w-full items-center gap-1.5 rounded-full border',
              compact ? 'px-2 py-0.5' : 'px-2.5 py-1'
            )}
            title={`${attr.attribute_name}: ${attr.value}`}
          >
            {isColor ? (
              <span
                className={cn(
                  'shrink-0 rounded-full border border-black/10 shadow-sm',
                  compact ? 'size-3' : 'size-3.5',
                  !swatch && 'bg-muted'
                )}
                style={swatch ? { backgroundColor: swatch } : undefined}
                aria-hidden
              />
            ) : null}
            <span
              className={cn(
                'text-muted-foreground truncate',
                compact ? 'text-[10px]' : 'text-xs'
              )}
            >
              {!isColor ? (
                <>
                  <span className='text-foreground/60'>
                    {attr.attribute_name}
                  </span>
                  {': '}
                </>
              ) : null}
              <span className='text-foreground font-medium'>{attr.value}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default CartItemVariants;
