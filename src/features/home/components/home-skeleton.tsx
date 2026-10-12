import PageWrapper from '@/components/page-wrapper';
import SectionWrapper from '@/components/section-wrapper';
import { ProductGridSkeleton } from '@/components/skeletons/product-skeletons';
import {
  CategoryCirclesSkeleton,
  SectionHeadingSkeleton,
} from '@/components/skeletons/section-skeletons';
import { Skeleton } from '@/components/ui/skeleton';
import {
  HOME_LAST_SECTION_SPACING,
  HOME_SECTION_SPACING,
} from '@/features/home/constants';
import { cn } from '@/lib/utils';
import { FC } from 'react';

const PanelSkeleton: FC = () => (
  <div className='bg-card border-border/50 space-y-4 rounded-xl border p-4 sm:p-5'>
    <div className='space-y-2'>
      <Skeleton className='h-6 w-32' />
      <Skeleton className='h-3.5 w-44' />
    </div>
    <div className='grid h-[280px] grid-cols-2 gap-2.5 sm:h-[320px] lg:h-[340px]'>
      <Skeleton className='rounded-lg' />
      <div className='grid grid-rows-2 gap-2.5'>
        <Skeleton className='rounded-lg' />
        <Skeleton className='rounded-lg' />
      </div>
    </div>
  </div>
);

/** Mirrors the home page: hero, collection panels, categories, deals, featured grid. */
export const HomeSkeleton: FC = () => (
  <PageWrapper aria-busy>
    <SectionWrapper className='space-y-4 pt-3 pb-0 md:pt-4 md:pb-0 lg:space-y-5 lg:pt-5 lg:pb-0'>
      <Skeleton className='h-[420px] w-full rounded-2xl sm:h-[460px] lg:h-[540px] lg:rounded-3xl' />
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5'>
        <PanelSkeleton />
        <PanelSkeleton />
        <div className='max-lg:hidden'>
          <PanelSkeleton />
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper className={HOME_SECTION_SPACING}>
      <CategoryCirclesSkeleton />
    </SectionWrapper>

    <SectionWrapper className={HOME_SECTION_SPACING}>
      <SectionHeadingSkeleton />
      <ProductGridSkeleton
        count={5}
        className='sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5'
      />
    </SectionWrapper>

    <SectionWrapper
      className={cn(HOME_SECTION_SPACING, HOME_LAST_SECTION_SPACING)}
    >
      <SectionHeadingSkeleton />
      <ProductGridSkeleton
        count={10}
        className='gap-y-8 sm:grid-cols-3 md:grid-cols-4 md:gap-x-5 md:gap-y-10 lg:grid-cols-4 xl:grid-cols-5'
      />
    </SectionWrapper>
  </PageWrapper>
);
