import { Star } from "lucide-react"
import { GetReviewsResponse } from "@/types/reviews"

interface ReviewRatingSummaryProps {
  reviewData: GetReviewsResponse
}

export default function ReviewRatingSummary({ reviewData }: ReviewRatingSummaryProps) {
  const totalReviews = reviewData.reviews_rate_count.reduce((acc, curr) => acc + curr.count, 0)

  const getRatingPercentage = (rate: number) => {
    const ratingCount = reviewData.reviews_rate_count.find(r => r.rate === rate)?.count || 0
    return totalReviews > 0 ? (ratingCount / totalReviews) * 100 : 0
  }

  return (
    <div className="flex w-full justify-start items-center gap-8">
      <div className="flex items-center gap-1">
        <span className="text-5xl font-bold">{reviewData.avg.toFixed(1)}</span>
        <div className="flex items-center mt-1">
          <Star className="size-7 text-yellow-400 fill-yellow-400" />
        </div>
      </div>
      <div className="flex-grow">
        {[5, 4, 3, 2, 1].map((rate) => (
          <div key={rate} className="flex items-center space-x-1">
            <span className="w-3 text-sm">{rate}</span>
            <div className="flex-grow h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400"
                style={{ width: `${getRatingPercentage(rate)}%` }}
              />
            </div>
            <span className="text-sm w-10 text-right">{getRatingPercentage(rate).toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}