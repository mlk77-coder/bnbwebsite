import PageWrapper from '@/components/page-wrapper';
import SectionWrapper from '@/components/section-wrapper';
import OrderInfoSections from './order-info-sections';
import OrderSummaryCard from './order-summary-card';
import type { OrderDetailContentProps } from './types';
import { getOrderItemQty } from './utils';

const StandaloneOrderDetail = ({
  order,
  t,
  cancelAction,
}: OrderDetailContentProps) => {
  const itemQty = getOrderItemQty(order);

  return (
    <PageWrapper>
      <SectionWrapper className='max-w-screen-2xl flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12 xl:gap-16'>
        <div className='w-full shrink-0 space-y-8 lg:max-w-lg xl:max-w-xl'>
          <header className='space-y-3'>
            <p className='text-primary/70 text-xs font-semibold tracking-[0.35em] uppercase'>
              {t('my-orders')}
            </p>
            <h1 className='text-primary font-serif text-4xl leading-tight font-normal tracking-wide uppercase md:text-5xl'>
              {t('order-details')}
            </h1>
            <div className='bg-primary/35 h-px max-w-18' aria-hidden />
          </header>

          <div className='space-y-5'>
            <OrderInfoSections
              order={order}
              t={t}
              cancelAction={cancelAction}
            />
          </div>
        </div>

        <aside className='sticky top-24 w-full min-w-0 flex-1'>
          <OrderSummaryCard order={order} t={t} itemQty={itemQty} />
        </aside>
      </SectionWrapper>
    </PageWrapper>
  );
};

export default StandaloneOrderDetail;
