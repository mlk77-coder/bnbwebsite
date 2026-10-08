import CartItemVariants from '@/features/cart/client/cart-item-variants';
import CheckoutProductPrice from '@/features/checkout/client/checkout-product-price';
import OrderDeliveryLabel from '@/features/orders/client/order-delivery-label';
import OrderSubtotalLabel from '@/features/orders/client/order-subtotal-label';
import OrderTotalLabel from '@/features/orders/client/order-total-label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { OrderDetail } from '@/types/order';
import { Package } from 'lucide-react';
import Image from 'next/image';
import type { OrderDetailSectionProps, OrderDetailTFunc } from './types';
import { parseOrderMoney } from './utils';

type Props = OrderDetailSectionProps & {
  order: OrderDetail;
  t: OrderDetailTFunc;
  itemQty: number;
};

const OrderSummaryCard = ({ order, t, itemQty, embedded = false }: Props) => {
  return (
    <div
      className={cn(
        'border-primary/10 overflow-hidden rounded-2xl border bg-white',
        !embedded && 'shadow-primary/10 shadow-lg ring-1 ring-black/5'
      )}
    >
      <div
        className={cn(
          'border-primary/10 border-b px-4 py-3.5',
          embedded
            ? ''
            : 'from-primary/12 relative bg-linear-to-br via-white to-transparent px-6 py-5'
        )}
      >
        <div className='text-primary flex items-center gap-2'>
          <Package className='size-4 shrink-0' aria-hidden />
          <h3
            className={cn(
              'text-primary font-semibold',
              embedded
                ? 'text-sm'
                : 'font-serif text-lg tracking-[0.12em] uppercase md:text-xl'
            )}
          >
            {t('order-summary')}
          </h3>
        </div>
      </div>

      <div className='space-y-4 px-4 py-4'>
        <p className='text-muted-foreground text-sm font-medium'>
          {t('product-count', { count: itemQty })}
        </p>

        <ul className='space-y-3'>
          {order.items.map(line => (
            <li
              key={line.id}
              className='border-primary/10 bg-primary/5 hover:border-primary/20 rounded-2xl border p-3 transition-colors'
            >
              <div className='flex gap-3'>
                <div className='relative size-16 shrink-0 overflow-hidden rounded-xl border border-white bg-white shadow-sm'>
                  <Image
                    src={line.product.image ?? '/no-product.svg'}
                    alt={line.product.name}
                    fill
                    className='object-cover'
                    sizes='64px'
                  />
                </div>
                <div className='min-w-0 flex-1 space-y-1.5 pt-0.5'>
                  <div className='flex items-start justify-between gap-3'>
                    <span className='font-body text-sm leading-snug font-medium tracking-normal capitalize'>
                      {line.quantity}&nbsp;&times;&nbsp;
                      <span>{line.product.name}</span>
                    </span>
                    <CheckoutProductPrice
                      price={parseOrderMoney(line.price)}
                      quantity={line.quantity}
                    />
                  </div>
                  {line.variant?.attributes?.length ? (
                    <CartItemVariants
                      attributes={line.variant.attributes}
                      compact
                    />
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Separator className='bg-primary/10' />

      <div className='space-y-3 px-4 py-4'>
        <OrderSubtotalLabel
          invoice_value={parseOrderMoney(order.subtotal)}
          tax={parseOrderMoney(order.tax)}
          coupon={null}
        />
        <OrderDeliveryLabel delivery={parseOrderMoney(order.shipping)} />
      </div>

      <Separator className='bg-primary/10' />

      <div className='bg-secondary/30 px-2 py-3'>
        <OrderTotalLabel total={parseOrderMoney(order.total)} />
      </div>
    </div>
  );
};

export default OrderSummaryCard;
