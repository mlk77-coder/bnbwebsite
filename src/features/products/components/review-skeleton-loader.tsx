import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export default function ReviewSkeletonLoader() {
  return (
    <div className='flex w-full flex-col items-start justify-start gap-4'>
      <div className='w-full space-y-1'>
        <Skeleton className='h-6 w-28' />
        <Skeleton className='h-4 w-24' />
      </div>
      <div className='grid w-full gap-4 sm:grid-cols-[120px_1fr]'>
        <div className='flex items-center gap-2 sm:flex-col sm:items-start'>
          <Skeleton className='h-10 w-16' />
          <Skeleton className='h-4 w-20' />
        </div>
        <div className='w-full space-y-2'>
          {[1, 2, 3, 4, 5].map(i => (
            <div
              key={i}
              className='grid grid-cols-[18px_1fr_42px] items-center gap-2'
            >
              <Skeleton className='h-3 w-3' />
              <Skeleton className='h-2 w-full' />
              <Skeleton className='h-3 w-8' />
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <div className='space-y-4 w-full'>
        <div className='w-full flex justify-between items-center gap-4'>
          <Skeleton className='h-5 w-32' />
          <Skeleton className='h-9 w-28' />
        </div>
        <div className='flex w-full flex-col items-start justify-start gap-4'>
          {[1, 2].map(i => (
            <div
              key={i}
              className='w-full border-b border-dashed border-border pb-4 last:border-b-0'
            >
              <div className='flex items-start gap-3'>
                <Skeleton className='size-9 rounded-full' />
                <div className='flex-1 space-y-2'>
                  <div className='flex items-center justify-between gap-3'>
                    <Skeleton className='h-4 w-28' />
                    <Skeleton className='h-3 w-24' />
                  </div>
                  <div className='flex gap-1'>
                    {[1, 2, 3, 4, 5].map(j => (
                      <Skeleton key={j} className='size-3' />
                    ))}
                  </div>
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-2/3' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
