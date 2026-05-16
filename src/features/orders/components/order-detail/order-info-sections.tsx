import { getOrderStatusClassName } from '@/features/orders/lib/order-status';
import { cn } from '@/lib/utils';
import type { OrderDetail } from '@/types/order';
import { format } from 'date-fns';
import { MapPin, Receipt, User } from 'lucide-react';
import { ReactNode } from 'react';
import DetailSection from './detail-section';
import MetaRow from './meta-row';
import type { OrderDetailSectionProps, OrderDetailTFunc } from './types';
import { formatOrderAddressLine } from './utils';

type Props = OrderDetailSectionProps & {
  order: OrderDetail;
  t: OrderDetailTFunc;
  cancelAction?: ReactNode;
};

const OrderInfoSections = ({
  order,
  t,
  embedded = false,
  cancelAction,
}: Props) => {
  const addressLine = formatOrderAddressLine(order);

  return (
    <>
      <DetailSection
        title={t('general-information')}
        icon={Receipt}
        embedded={embedded}
      >
        <dl className='space-y-3'>
          <MetaRow label={`${t('order-id')}:`} embedded={embedded}>
            <span className='font-semibold tracking-tight'>
              {order.order_number}
            </span>
          </MetaRow>
          <MetaRow label={`${t('order-date')}:`} embedded={embedded}>
            <time dateTime={order.created_at}>
              {format(new Date(order.created_at), 'PP pp')}
            </time>
          </MetaRow>
          <MetaRow label={`${t('order-status')}:`} embedded={embedded}>
            <span
              className={cn(
                'inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium capitalize',
                getOrderStatusClassName(order.status)
              )}
            >
              {order.status}
            </span>
          </MetaRow>
          <MetaRow label={`${t('estimated-delivery')}:`} embedded={embedded}>
            <time dateTime={order.estimated_delivery}>
              {format(new Date(order.estimated_delivery), 'PP')}
            </time>
          </MetaRow>
          <MetaRow label={`${t('payment')}:`} embedded={embedded}>
            <span className='capitalize'>
              {order.payment_method.replace(/_/g, ' ')}
            </span>
          </MetaRow>
          <MetaRow label={`${t('payment-status')}:`} embedded={embedded}>
            <span className='capitalize'>{order.payment_status}</span>
          </MetaRow>
        </dl>
      </DetailSection>

      <DetailSection
        title={t('contact-information')}
        icon={User}
        embedded={embedded}
      >
        <dl className='space-y-3'>
          <MetaRow label={`${t('name')}:`} embedded={embedded}>
            {order.address.address_name}
          </MetaRow>
          <MetaRow label={`${t('phone')}:`} embedded={embedded}>
            <a
              className='text-primary decoration-primary/30 hover:decoration-primary underline underline-offset-4 transition-colors'
              href={`tel:${order.address.phone.replace(/\s/g, '')}`}
            >
              {order.address.phone}
            </a>
          </MetaRow>
        </dl>
      </DetailSection>

      <DetailSection
        title={t('address-details')}
        icon={MapPin}
        embedded={embedded}
      >
        <dl className='space-y-3'>
          <MetaRow label={`${t('country')}:`} embedded={embedded}>
            {order.address.country}
          </MetaRow>
          <MetaRow label={`${t('city')}:`} embedded={embedded}>
            {order.address.city}
          </MetaRow>
          <MetaRow label={`${t('adderess')}:`} embedded={embedded}>
            {addressLine}
          </MetaRow>
          {order.address.details ? (
            <MetaRow
              label={`${t('address-fields.details')}:`}
              embedded={embedded}
            >
              <span className='text-muted-foreground'>
                {order.address.details}
              </span>
            </MetaRow>
          ) : null}
          {order.notes ? (
            <MetaRow label={`${t('order-notes')}:`} embedded={embedded}>
              <span className='text-muted-foreground whitespace-pre-wrap'>
                {order.notes}
              </span>
            </MetaRow>
          ) : null}
        </dl>
      </DetailSection>

      {cancelAction ? (
        <div className='border-primary/25 bg-secondary/25 rounded-2xl border border-dashed p-4'>
          {cancelAction}
        </div>
      ) : null}
    </>
  );
};

export default OrderInfoSections;
