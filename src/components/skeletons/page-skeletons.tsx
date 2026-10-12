import PageWrapper from '@/components/page-wrapper';
import SectionWrapper from '@/components/section-wrapper';
import { ProductGridSkeleton } from '@/components/skeletons/product-skeletons';
import { CategoryCirclesSkeleton } from '@/components/skeletons/section-skeletons';
import { Skeleton } from '@/components/ui/skeleton';
import { FC } from 'react';

const BreadcrumbSkeleton: FC = () => <Skeleton className='h-4 w-48' />;

type ListingPageSkeletonProps = {
  /** Category pages show sub-category circles instead of a collection header. */
  showCircles?: boolean;
};

/** Category, sale and every other product listing page. */
export const ListingPageSkeleton: FC<ListingPageSkeletonProps> = ({
  showCircles = false,
}) => (
  <PageWrapper aria-busy>
    <SectionWrapper className='space-y-8! md:py-4 lg:py-8'>
      <BreadcrumbSkeleton />
      {showCircles ? (
        <CategoryCirclesSkeleton />
      ) : (
        <div className='space-y-3'>
          <Skeleton className='h-8 w-56' />
          <Skeleton className='h-4 w-80 max-w-full' />
        </div>
      )}
      <ProductGridSkeleton />
    </SectionWrapper>
  </PageWrapper>
);

/** Cart and checkout: a list of rows next to an order summary. */
export const SplitPageSkeleton: FC = () => (
  <PageWrapper aria-busy>
    <SectionWrapper className='space-y-8'>
      <Skeleton className='h-8 w-48' />
      <div className='grid gap-6 lg:grid-cols-3 lg:gap-10'>
        <div className='space-y-4 lg:col-span-2'>
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className='flex gap-4'>
              <Skeleton className='size-24 shrink-0 rounded-xl sm:size-28' />
              <div className='flex-1 space-y-3 py-1'>
                <Skeleton className='h-5 w-2/3' />
                <Skeleton className='h-4 w-1/3' />
                <Skeleton className='h-9 w-28' />
              </div>
            </div>
          ))}
        </div>
        <div className='space-y-4 self-start rounded-xl border p-5'>
          <Skeleton className='h-6 w-1/2' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-3/4' />
          <Skeleton className='h-11 w-full' />
        </div>
      </div>
    </SectionWrapper>
  </PageWrapper>
);

/** Login / register style pages: a centered form. */
export const AuthPageSkeleton: FC = () => (
  <PageWrapper aria-busy className='items-center justify-center'>
    <SectionWrapper className='w-full max-w-md space-y-6'>
      <Skeleton className='mx-auto h-10 w-40' />
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className='space-y-2'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-11 w-full' />
        </div>
      ))}
      <Skeleton className='h-11 w-full' />
    </SectionWrapper>
  </PageWrapper>
);

/** Fallback for any page that has no dedicated skeleton. */
export const GenericPageSkeleton: FC = () => (
  <PageWrapper aria-busy>
    <SectionWrapper className='space-y-8'>
      <div className='space-y-3'>
        <Skeleton className='h-8 w-56' />
        <Skeleton className='h-4 w-80 max-w-full' />
      </div>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 3 }, (_, index) => (
          <Skeleton key={index} className='h-40 w-full rounded-xl' />
        ))}
      </div>
      <Skeleton className='h-64 w-full rounded-xl' />
    </SectionWrapper>
  </PageWrapper>
);
