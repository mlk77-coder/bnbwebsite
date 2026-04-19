"use client";
import { Separator } from "@/components/ui/separator";
import axiosInstance from "@/lib/axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import AddReview from "./add-reviews";
import { GetReviewsResponse } from "@/types/reviews";
import { format } from "date-fns";
import { Pagination } from "@/components/pagination";
import ReviewRatingSummary from "./review-rating-summary";
import ReviewSkeletonLoader from "../review-skeleton-loader";

type PropsType = {
  slug: string;
  token: string;
};

const ReviewsContainer: FC<PropsType> = ({ slug, token }) => {
  const t = useTranslations();
  const [page, setPage] = useState(1);
  const itemsPerPage = 3; // You can adjust this value as needed

  const {
    data: reviews,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["reviews", slug, page],
    staleTime: Infinity,
    queryFn: async () => {
      const { data } = await axiosInstance.get<GetReviewsResponse>(
        `/products/reviews/${slug}?count=${itemsPerPage}&page=${page}`
      );
      return data;
    },
    placeholderData: keepPreviousData,
  });

  if (isPending) return <ReviewSkeletonLoader />;
  if (isError) return <div>Error loading reviews</div>;

  const totalReviews = reviews.reviews_rate_count.reduce(
    (acc, curr) => acc + curr.count,
    0
  );
  const totalPages = Math.ceil(totalReviews / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="w-full flex flex-col gap-4 justify-start items-start">
      <h2 className="text-2xl capitalize">{t("reviews.title")}</h2>
      <ReviewRatingSummary reviewData={reviews} />
      <Separator />
      <div className="space-y-4 w-full">
        <div className="w-full flex justify-between items-center gap-4">
          <h3>
            {t("reviews.all-reviews")} {totalReviews}
          </h3>
          <AddReview slug={slug} token={token} />
        </div>
        <div className="flex flex-col justify-start items-start gap-1">
          {reviews.reviews.length > 0 ? (
            reviews.reviews.map((review) => (
              <div
                key={review.id}
                className="border-b w-full border-dashed border-gray py-2"
              >
                <h4 className="capitalize">{review.name}</h4>
                <div className="flex justify-start items-center gap-2">
                  <div className="flex justify-start items-center">
                    {Array(review.rate)
                      .fill("")
                      .map((_, index) => (
                        <Star
                          key={index}
                          className="size-3 fill-yellow-500 text-yellow-500"
                        />
                      ))}
                  </div>
                  {format(new Date(review.created_at), "dd/MM/yyyy hh:mm aa")}
                </div>
                <p>{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-center bg-gray/20 py-2 px-4 rounded-lg w-full">
              {t("empty-reviews")}
            </p>
          )}
        </div>

        {totalPages > 1 && reviews.reviews.length > 0 && (
          <div dir="ltr" className="mt-4">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsContainer;
