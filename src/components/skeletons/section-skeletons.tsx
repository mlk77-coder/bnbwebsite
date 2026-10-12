import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { FC } from 'react';

/** Mirrors `SectionHeading`: title + description. */
export const SectionHeadingSkeleton: FC = () => (
  <div className='mb-6 space-y-2 sm:mb-8' aria-hidden>
    <Skeleton className='h-7 w-48 sm:h-8' />
    <Skeleton className='h-4 w-72 max-w-full' />
  </div>
);

type CategoryCirclesSkeletonProps = {
  showHeading?: boolean;
};

/** Mirrors `CategoryCirclesCarousel`. */
export const CategoryCirclesSkeleton: FC<CategoryCirclesSkeletonProps> = ({
  showHeading = true,
}) => (
  <div aria-hidden>
    {showHeading ? <SectionHeadingSkeleton /> : null}
    <div className='flex gap-3 overflow-hidden sm:gap-5'>
      {Array.from({ length: 10 }, (_, index) => (
        <div
          key={index}
          className={cn(
            'flex shrink-0 flex-col items-center gap-3',
            'w-[28%] sm:w-[20%] md:w-[16%] lg:w-[12.5%] xl:w-[10%]'
          )}
        >
          <Skeleton className='aspect-square w-full rounded-full' />
          <Skeleton className='h-3.5 w-3/4' />
        </div>
      ))}
    </div>
  </div>
);
