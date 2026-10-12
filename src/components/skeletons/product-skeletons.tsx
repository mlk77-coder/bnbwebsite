import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { FC } from 'react';

/** Mirrors the layout of `ProductCard`: square image, name, price. */
export const ProductCardSkeleton: FC = () => (
  <div className='flex flex-col gap-2.5'>
    <Skeleton className='aspect-square w-full rounded-xl' />
    <div className='space-y-2'>
      <Skeleton className='h-4 w-3/4' />
      <Skeleton className='h-4 w-1/3' />
    </div>
  </div>
);

type ProductGridSkeletonProps = {
  count?: number;
  className?: string;
};

/** Defaults to the grid used by every product listing page. */
export const ProductGridSkeleton: FC<ProductGridSkeletonProps> = ({
  count = 10,
  className,
}) => (
  <div
    className={cn('grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5', className)}
    aria-hidden
  >
    {Array.from({ length: count }, (_, index) => (
      <ProductCardSkeleton key={index} />
    ))}
  </div>
);
