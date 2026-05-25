'use client';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tooltip } from '@/components/ui/tooltip';
import { FetcherResponse } from '@/lib/fetcher';
import { cn } from '@/lib/utils';
import { GetCartResponse } from '@/types/cart';
import { ShoppingCart, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import CartCountBadge from './cart-count-badge';
import CartPopoverContent from './cart-popover-content';

type PropsType = {
  cartResponse: FetcherResponse<GetCartResponse>;
  userToken: string;
  isLoggedIn: boolean;
  insideSheet?: boolean;
};

const CartPopover: FC<PropsType> = ({
  cartResponse,
  userToken,
  isLoggedIn,
  insideSheet = false,
}) => {
  const t = useTranslations();
  const cart = cartResponse.data?.data;
  const items = cart?.items ?? [];
  const itemCount = items.reduce((a, b) => a + b.quantity, 0);
  const hasItems = itemCount > 0;

  return (
    <Popover>
      <Tooltip text={t('cart.title')}>
        <PopoverTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            className={cn(
              'group relative transition-all duration-300 hover:bg-gray-100/80',
              hasItems && 'hover:bg-primary/5'
            )}
          >
            <span className='sr-only'>{t('cart.title')}</span>
            <div className='relative'>
              <ShoppingCart
                className={cn(
                  'h-5 w-5 transition-all duration-300',
                  hasItems
                    ? 'text-primary'
                    : 'text-gray-700 group-hover:text-gray-900'
                )}
              />
              {/* Animated ring on hover */}
              <span className='bg-primary/10 absolute inset-0 scale-0 rounded-full opacity-0 transition-all duration-500 group-hover:scale-150 group-hover:opacity-100' />
            </div>
            <CartCountBadge key={itemCount} initialCount={itemCount} />
          </Button>
        </PopoverTrigger>
      </Tooltip>
      <PopoverContent
        alignOffset={8}
        align='end'
        className='shadow-primary/15 border-primary/10 max-h-[calc(100vh-7rem)] w-88 overflow-hidden rounded-3xl border bg-white p-0 shadow-2xl sm:w-108'
      >
        <div className='border-primary/10 relative overflow-hidden border-b px-5 py-4'>
          <div className='bg-primary/10 absolute -inset-e-8 -top-8 size-24 rounded-full blur-2xl' />
          <div className='relative flex items-center justify-between gap-3'>
            <div className='flex items-center gap-3'>
              <div className='text-primary bg-primary/5 border-primary/10 flex size-11 items-center justify-center rounded-lg border'>
                <ShoppingCart className='size-5' />
              </div>
              <div>
                <h3 className='text-primary font-bold'>{t('cart.title')}</h3>
                <p className='text-muted-foreground text-xs'>
                  {t('cart.products-count', { count: itemCount })}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='custom-scrollbar max-h-[calc(100vh-13rem)] overflow-y-auto'>
          {cart ? (
            <CartPopoverContent
              cart={cart}
              userToken={userToken}
              isLoggedIn={isLoggedIn}
              insideSheet={insideSheet}
            />
          ) : (
            <div className='p-8 text-center'>
              <div className='mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100'>
                <ShoppingCart className='h-8 w-8 text-gray-400' />
              </div>
              <p className='text-gray-500'>{t('cart-empty')}</p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CartPopover;
