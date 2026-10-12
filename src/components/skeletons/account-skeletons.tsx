import { ProductGridSkeleton } from '@/components/skeletons/product-skeletons';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { FC } from 'react';

export type AccountSkeletonVariant =
  | 'list'
  | 'grid'
  | 'cards'
  | 'form'
  | 'detail';

const repeat = (count: number) => Array.from({ length: count }, (_, i) => i);

/** Mirrors an order card in `InfiniteOrders`: number + status, date, items count + total. */
const OrdersListSkeleton: FC = () => (
  <ul className='grid w-full gap-3 sm:grid-cols-2' aria-hidden>
    {repeat(6).map(index => (
      <li
        key={index}
        className='border-primary/10 flex items-center gap-3 rounded-2xl border bg-white p-3.5 sm:p-4'
      >
        <div className='min-w-0 flex-1 space-y-1.5'>
          <div className='flex items-start justify-between gap-2'>
            <Skeleton className='h-5 w-28' />
            <Skeleton className='h-[22px] w-16 rounded-full' />
          </div>
          <Skeleton className='h-4 w-24' />
          <div className='flex items-center justify-between gap-2'>
            <Skeleton className='h-6 w-20 rounded-full' />
            <Skeleton className='h-5 w-16' />
          </div>
        </div>
      </li>
    ))}
  </ul>
);

const CardsSkeleton: FC = () => (
  <div className='grid w-full gap-4 sm:grid-cols-2'>
    {repeat(2).map(index => (
      <div key={index} className='space-y-3 rounded-2xl border p-5'>
        <Skeleton className='h-5 w-1/2' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-3/4' />
        <div className='flex gap-2 pt-2'>
          <Skeleton className='h-9 w-20' />
          <Skeleton className='h-9 w-20' />
        </div>
      </div>
    ))}
  </div>
);

const FormSkeleton: FC = () => (
  <div className='w-full space-y-6'>
    <Skeleton className='size-24 rounded-full' />
    <div className='grid gap-4 sm:grid-cols-2'>
      {repeat(4).map(index => (
        <div key={index} className='space-y-2'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-11 w-full' />
        </div>
      ))}
    </div>
    <Skeleton className='h-11 w-40' />
  </div>
);

type InfoSectionSkeletonProps = {
  rows: number;
};

/** Mirrors `DetailSection` + `MetaRow` (label column, value column). */
const InfoSectionSkeleton: FC<InfoSectionSkeletonProps> = ({ rows }) => (
  <section className='border-primary/10 rounded-2xl border p-4'>
    <div className='border-primary/10 mb-3 flex items-center gap-2.5 border-b pb-2.5'>
      <Skeleton className='size-8 rounded-xl' />
      <Skeleton className='h-4 w-32' />
    </div>
    <div className='space-y-3'>
      {repeat(rows).map(index => (
        <div
          key={index}
          className='grid grid-cols-1 gap-1 sm:grid-cols-[minmax(7rem,9rem)_1fr] sm:items-start sm:gap-3'
        >
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-4 w-40 max-w-full' />
        </div>
      ))}
    </div>
  </section>
);

/** Mirrors `OrderSummaryCard`: header, item lines, subtotal/delivery, total. */
const OrderSummarySkeleton: FC = () => (
  <div className='border-primary/10 overflow-hidden rounded-2xl border bg-white'>
    <div className='border-primary/10 flex items-center gap-2 border-b px-4 py-3.5'>
      <Skeleton className='size-4' />
      <Skeleton className='h-4 w-28' />
    </div>

    <div className='space-y-4 px-4 py-4'>
      <Skeleton className='h-4 w-20' />
      <ul className='space-y-3'>
        {repeat(2).map(index => (
          <li
            key={index}
            className='border-primary/10 flex gap-3 rounded-2xl border p-3'
          >
            <Skeleton className='size-16 shrink-0 rounded-xl' />
            <div className='min-w-0 flex-1 space-y-2 pt-0.5'>
              <div className='flex items-start justify-between gap-3'>
                <Skeleton className='h-4 w-2/3' />
                <Skeleton className='h-4 w-14' />
              </div>
              <Skeleton className='h-3.5 w-1/3' />
            </div>
          </li>
        ))}
      </ul>
    </div>

    <Separator className='bg-primary/10' />

    <div className='space-y-3 px-4 py-4'>
      {repeat(2).map(index => (
        <div key={index} className='flex items-center justify-between gap-3'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-4 w-16' />
        </div>
      ))}
    </div>

    <Separator className='bg-primary/10' />

    <div className='bg-secondary/30 flex items-center justify-between gap-3 px-4 py-3'>
      <Skeleton className='h-5 w-16' />
      <Skeleton className='h-6 w-24' />
    </div>
  </div>
);

/** Mirrors `EmbeddedOrderDetail` below its header: three info sections next to the summary. */
const OrderDetailSkeleton: FC = () => (
  <div className='grid w-full gap-6 xl:grid-cols-2 xl:items-start xl:gap-8'>
    <div className='space-y-4'>
      <InfoSectionSkeleton rows={7} />
      <InfoSectionSkeleton rows={2} />
      <InfoSectionSkeleton rows={4} />
    </div>
    <OrderSummarySkeleton />
  </div>
);

const CONTENT: Record<AccountSkeletonVariant, FC> = {
  list: OrdersListSkeleton,
  grid: () => <ProductGridSkeleton count={8} className='w-full xl:grid-cols-4' />,
  cards: CardsSkeleton,
  form: FormSkeleton,
  detail: OrderDetailSkeleton,
};

type AccountPageSkeletonProps = {
  variant: AccountSkeletonVariant;
};

/**
 * Content of a profile page (rendered inside the profile layout card):
 * icon + title header, separator, then a variant-specific body.
 */
export const AccountPageSkeleton: FC<AccountPageSkeletonProps> = ({
  variant,
}) => {
  const Content = CONTENT[variant];

  return (
    <div
      className='flex size-full flex-col items-start justify-start gap-6'
      aria-busy
    >
      <div className='flex w-full flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
        <div className='flex items-center gap-3'>
          <Skeleton className='size-12 rounded-2xl' />
          <div className='space-y-2'>
            <Skeleton className='h-7 w-40' />
            <Skeleton className='h-4 w-24' />
          </div>
        </div>
        {variant === 'detail' ? (
          <Skeleton className='h-[34px] w-24 self-start rounded-full' />
        ) : null}
      </div>
      <Separator />
      <Content />
    </div>
  );
};
