import PageWrapper from '@/components/page-wrapper';
import SectionWrapper from '@/components/section-wrapper';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import ReviewSkeletonLoader from './_components/review-skeleton-loader';

const ProductInfoSkeleton = () => (
  <div className='space-y-5 md:col-span-5'>
    <div className='space-y-2'>
      <Skeleton className='h-7 w-3/4 max-w-md' />
    </div>

    <div className='flex items-center gap-3'>
      <Skeleton className='h-9 w-32' />
      <Skeleton className='h-6 w-14 rounded-full' />
    </div>

    <div className='space-y-2 max-md:hidden'>
      <Skeleton className='h-4 w-full' />
      <Skeleton className='h-4 w-11/12' />
      <Skeleton className='h-4 w-10/12' />
      <Skeleton className='h-4 w-2/3' />
    </div>

    <Separator />

    <div className='flex items-center gap-3'>
      <Skeleton className='h-5 w-20' />
      <Skeleton className='size-10' />
      <Skeleton className='h-6 w-10' />
      <Skeleton className='size-10' />
    </div>

    <div className='grid grid-cols-1 gap-3 lg:grid-cols-2'>
      <Skeleton className='h-11 w-full' />
      <Skeleton className='h-11 w-full' />
    </div>

    <div className='border-border border-t pt-5'>
      <ReviewSkeletonLoader />
    </div>

    <div className='space-y-2 md:hidden'>
      <Skeleton className='h-4 w-full' />
      <Skeleton className='h-4 w-11/12' />
      <Skeleton className='h-4 w-2/3' />
    </div>
  </div>
);

const ProductGallerySkeleton = () => (
  <div className='flex flex-col gap-6 md:sticky md:top-20 md:col-span-5'>
    <div className='space-y-4'>
      <Skeleton className='relative aspect-square w-full overflow-hidden rounded-xl' />
      <div className='flex items-center justify-center gap-3'>
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className='size-16 rounded-lg sm:size-20' />
        ))}
      </div>
    </div>
  </div>
);

const Loading = () => {
  return (
    <PageWrapper>
      <SectionWrapper className='size-full max-w-screen-2xl space-y-4 md:py-4 lg:py-6'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Skeleton className='h-6 w-32' />
            </BreadcrumbItem>
            <BreadcrumbSeparator>|</BreadcrumbSeparator>
            <BreadcrumbItem>
              <Skeleton className='h-6 w-28' />
            </BreadcrumbItem>
            <BreadcrumbSeparator>|</BreadcrumbSeparator>
            <BreadcrumbItem>
              <Skeleton className='h-6 w-20' />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className='relative grid size-full grid-cols-1 items-start gap-6 md:grid-cols-10 md:gap-12'>
          <ProductGallerySkeleton />
          <ProductInfoSkeleton />
        </div>
      </SectionWrapper>
    </PageWrapper>
  );
};

export default Loading;
