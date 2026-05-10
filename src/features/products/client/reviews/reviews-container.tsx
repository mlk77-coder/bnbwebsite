'use client';
import { Separator } from '@/components/ui/separator';
import axiosInstance from '@/lib/axios';
import { mapReviewsResponse } from '@/lib/api-mappers';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Star, UserRound } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import AddReview from '@/features/products/client/reviews/add-reviews';
import { GetApiReviewsResponse } from '@/types/reviews';
import { format } from 'date-fns';
import { Pagination } from '@/components/pagination';
import ReviewRatingSummary from '@/features/products/components/reviews/review-rating-summary';
import ReviewSkeletonLoader from '@/features/products/components/review-skeleton-loader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type PropsType = {
  productId: number;
  averageRating?: number;
  reviewsCount?: number;
  token: string;
};

const ReviewsContainer: FC<PropsType> = ({
  productId,
  averageRating,
  reviewsCount,
  token,
}) => {
  const t = useTranslations();
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const {
    data: reviews,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['reviews', productId, page],
    staleTime: Infinity,
    queryFn: async () => {
      const path = `/products/${productId}/reviews?per_page=${itemsPerPage}&page=${page}`;
      const { data } = await axiosInstance.get<GetApiReviewsResponse>(path);
      return mapReviewsResponse(data.data.data, data.data.meta, path);
    },
    placeholderData: keepPreviousData,
  });

  if (isPending) return <ReviewSkeletonLoader />;
  if (isError) return <div>Error loading reviews</div>;

  const totalReviews = reviewsCount ?? reviews.pagination.total;
  const totalPages = Math.ceil(totalReviews / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <section className='border-border w-full border-t pt-5'>
      <div className='space-y-5'>
        <div className='flex w-full items-start justify-between gap-4'>
          <div>
            <h2 className='text-foreground text-xl font-semibold capitalize'>
              {t('reviews.title')}
            </h2>
            <p className='text-muted-foreground text-sm'>
              {t('reviews.all-reviews')} {totalReviews}
            </p>
          </div>
          <AddReview slug={String(productId)} token={token} />
        </div>

        <ReviewRatingSummary
          reviewData={reviews}
          averageRating={averageRating}
          totalReviews={totalReviews}
        />

        <Separator />

        <div className='space-y-3'>
          {reviews.reviews.length > 0 ? (
            reviews.reviews.map(review => (
              <div
                key={review.id}
                className='border-border border-b border-dashed pb-4 last:border-b-0'
              >
                <div className='flex items-start gap-3'>
                  <Avatar className='border-border/70 size-9 border'>
                    {review.avatar ? (
                      <AvatarImage alt={review.name} src={review.avatar} />
                    ) : null}
                    <AvatarFallback className='bg-primary/10 text-primary'>
                      {review.name ? (
                        review.name.slice(0, 1).toUpperCase()
                      ) : (
                        <UserRound className='size-4' />
                      )}
                    </AvatarFallback>
                  </Avatar>

                  <div className='min-w-0 flex-1 space-y-1.5'>
                    <div className='flex flex-wrap items-center justify-between gap-2'>
                      <h4 className='text-foreground text-sm font-medium capitalize'>
                        {review.name}
                      </h4>
                      <span className='text-muted-foreground text-xs'>
                        {format(
                          new Date(review.created_at),
                          'dd/MM/yyyy hh:mm aa'
                        )}
                      </span>
                    </div>

                    <div className='flex items-center gap-1'>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={
                            index < review.rate
                              ? 'size-3.5 fill-amber-400 text-amber-400'
                              : 'text-muted fill-muted size-3.5'
                          }
                        />
                      ))}
                    </div>

                    <p className='text-muted-foreground text-sm leading-relaxed'>
                      {review.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className='bg-muted/60 text-muted-foreground w-full rounded-xl px-4 py-5 text-center text-sm'>
              {t('empty-reviews')}
            </p>
          )}
        </div>

        {totalPages > 1 && reviews.reviews.length > 0 && (
          <div dir='ltr' className='mt-4'>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsContainer;
