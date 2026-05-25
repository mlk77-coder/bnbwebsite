import { Separator } from '@/components/ui/separator';
import { Link } from '@/navigation';
import { ArrowLeft, PackageCheck } from 'lucide-react';
import OrderInfoSections from './order-info-sections';
import OrderSummaryCard from './order-summary-card';
import type { OrderDetailContentProps } from './types';
import { getOrderItemQty } from './utils';

const EmbeddedOrderDetail = ({
  order,
  t,
  cancelAction,
}: OrderDetailContentProps) => {
  const itemQty = getOrderItemQty(order);

  return (
    <div className='flex size-full flex-col items-start justify-start gap-6'>
      <div className='flex w-full flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
        <div className='flex items-center gap-3'>
          <span className='bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl'>
            <PackageCheck className='size-5' />
          </span>
          <div>
            <h2 className='text-primary text-2xl font-bold'>
              {t('order-details')}
            </h2>
            <p className='text-muted-foreground text-sm'>
              {order.order_number}
            </p>
          </div>
        </div>
        <Link
          href='/orders'
          className='text-primary hover:bg-primary/5 border-primary/15 inline-flex items-center gap-1.5 self-start rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors'
        >
          <ArrowLeft className='size-4' aria-hidden />
          {t('orders')}
        </Link>
      </div>

      <Separator />

      <div className='grid w-full gap-6 xl:grid-cols-2 xl:items-start xl:gap-8'>
        <div className='space-y-4'>
          <OrderInfoSections
            order={order}
            t={t}
            embedded
            cancelAction={cancelAction}
          />
        </div>
        <OrderSummaryCard order={order} t={t} itemQty={itemQty} embedded />
      </div>
    </div>
  );
};

export default EmbeddedOrderDetail;
