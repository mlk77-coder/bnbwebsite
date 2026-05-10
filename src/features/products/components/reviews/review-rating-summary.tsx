import { Star } from 'lucide-react';
import { GetReviewsResponse } from '@/types/reviews';
import { cn } from '@/lib/utils';

interface ReviewRatingSummaryProps {
  reviewData: GetReviewsResponse;
  averageRating?: number;
  totalReviews?: number;
}

export default function ReviewRatingSummary({
  reviewData,
  averageRating,
  totalReviews,
}: ReviewRatingSummaryProps) {
  const countedReviews = reviewData.reviews_rate_count.reduce(
    (acc, curr) => acc + curr.count,
    0
  );
  const reviewTotal = totalReviews ?? countedReviews;
  const displayRating = averageRating ?? reviewData.avg;

  const getRatingPercentage = (rate: number) => {
    const ratingCount =
      reviewData.reviews_rate_count.find(r => r.rate === rate)?.count || 0;
    return countedReviews > 0 ? (ratingCount / countedReviews) * 100 : 0;
  };

  return (
    <div className='grid w-full gap-4 sm:grid-cols-[120px_1fr]'>
      <div className='flex items-center gap-3 sm:flex-col sm:items-start sm:justify-center'>
        <div className='flex items-center gap-2'>
          <span className='text-foreground text-4xl font-bold tracking-tight'>
            {displayRating.toFixed(1)}
          </span>
          <Star className='size-6 fill-amber-400 text-amber-400' />
        </div>
        <p className='text-muted-foreground text-sm'>{reviewTotal} reviews</p>
      </div>

      <div className='space-y-2'>
        {[5, 4, 3, 2, 1].map(rate => {
          const percentage = getRatingPercentage(rate);

          return (
            <div
              key={rate}
              className='grid grid-cols-[18px_1fr_48px] items-center gap-2'
            >
              <span className='text-muted-foreground text-sm'>{rate}</span>
              <div className='bg-secondary h-2 overflow-hidden rounded-full'>
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-500',
                    percentage > 0 ? 'bg-amber-400' : 'bg-transparent'
                  )}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className='text-muted-foreground text-end text-xs'>
                {percentage.toFixed(0)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
