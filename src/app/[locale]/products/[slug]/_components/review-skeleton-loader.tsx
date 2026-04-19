import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export default function ReviewSkeletonLoader() {
  return (
    <div className="w-full flex flex-col gap-4 justify-start items-start">
      <Skeleton className="h-8 w-40" />
      <div className="w-full flex justify-start items-center space-x-8">
        <div className="flex items-center gap-1">
          <Skeleton className="h-12 w-16" />
          <Skeleton className="h-6 w-6" />
        </div>
        <div className="flex-grow space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center space-x-1">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-2 w-full" />
              <Skeleton className="h-4 w-10" />
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <div className="space-y-4 w-full">
        <div className="w-full flex justify-between items-center gap-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-9 w-28" />
        </div>
        <div className="flex flex-col justify-start items-start gap-4 w-full">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-b w-full border-dashed border-gray py-2">
              <Skeleton className="h-5 w-32 mb-2" />
              <div className="flex justify-start items-center gap-2 mb-2">
                <div className="flex justify-start items-center gap-1">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <Skeleton key={j} className="h-3 w-3" />
                  ))}
                </div>
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4 mt-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}