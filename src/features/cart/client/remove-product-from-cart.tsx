'use client';

import ConfirmationDialog from '@/components/confirmation-dialog';
import { Button } from '@/components/ui/button';
import { X, ShoppingCart } from 'lucide-react';
import { FC } from 'react';
import useRemoveProductFromCart from '@/features/cart/client/hooks/use-remove-product-from-cart';
import { CartItem } from '@/types/cart';
import { useTranslations } from 'next-intl';

type PropsType = {
  item: CartItem;
  /** When true, renders inline (e.g. mobile cart row) instead of absolute positioning. */
  inline?: boolean;
};

const RemoveProductFromCart: FC<PropsType> = ({ item, inline = false }) => {
  const { quantity } = item;
  const { name } = item.product;
  const { isOpenDialog, setIsOpenDialog, mutate, isPending } =
    useRemoveProductFromCart(item.id, quantity);
  const t = useTranslations();

  return (
    <ConfirmationDialog
      open={isOpenDialog}
      onOpenChange={setIsOpenDialog}
      title={t('global.remove')}
      description={t(
        'are-you-sure-you-want-to-remove-this-product-from-your-cart'
      )}
      icon={ShoppingCart}
      confirmLabel={t('global.remove')}
      onConfirm={() => mutate()}
      isPending={isPending}
      trigger={
        <Button
          className={
            inline
              ? 'text-muted-foreground -me-1 size-8 shrink-0 rounded-full hover:bg-red-50 hover:text-red-500'
              : 'border-primary/10 text-muted-foreground absolute inset-e-4 top-4 z-10 size-8 rounded-full border bg-white/90 shadow-sm backdrop-blur transition-colors hover:bg-red-50 hover:text-red-500'
          }
          variant={inline ? 'ghost' : 'outline'}
          size='icon'
        >
          <span className='sr-only'>
            {t('cart.remove-from-cart-sr', { name })}
          </span>
          <X className='size-4' />
        </Button>
      }
    />
  );
};

export default RemoveProductFromCart;
