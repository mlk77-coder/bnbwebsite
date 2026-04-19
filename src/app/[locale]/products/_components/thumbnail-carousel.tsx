"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNextWithoutHover,
  CarouselPreviousWithoutHover,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react";
import { Play } from "lucide-react";

type ThumbnailCarouselProps = {
  images: string[];
  name: string;
  setThumbnailApi: (api: CarouselApi) => void;
  mainApi: CarouselApi | undefined;
};

const ThumbnailCarousel: FC<ThumbnailCarouselProps> = ({
  images,
  setThumbnailApi,
  mainApi,
  name,
}) => {
  // تحديد نوع الملف من امتداده
  const isVideo = (url: string): boolean => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];
    const lowerUrl = url.toLowerCase();
    return videoExtensions.some(ext => lowerUrl.endsWith(ext));
  };

  return (
    <Carousel
      opts={{ loop: true, align: "start" }}
      setApi={setThumbnailApi}
      className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto relative px-8"
    >
      <CarouselContent className="-ml-2">
        {images.map((src, index) => (
          <CarouselItem
            key={index}
            className="pl-2 shrink-0 basis-1/4 sm:basis-1/5 md:basis-1/6 lg:basis-1/7 xl:basis-1/8"
          >
            <Button
              variant="ghost"
              onClick={() => mainApi?.scrollTo(index)}
              className={cn("aspect-square p-0 relative overflow-hidden rounded-lg border-2 border-transparent transition-all duration-200 min-h-[80px] min-w-[80px]")}
              aria-label={`Go to slide ${index + 1}`}
            >
              {isVideo(src) ? (
                <div className="relative w-full h-full aspect-square">
                  <video
                    src={src}
                    className="w-full h-full object-cover rounded-md"
                    preload="metadata"
                    muted
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-md">
                    <Play className="w-4 h-4 text-white fill-white" />
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full aspect-square">
                  <Image
                    src={src ?? ""}
                    alt={`${name} Thumbnail ${index + 1}`}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              )}
            </Button>
          </CarouselItem>
        ))}
      </CarouselContent>
      {images.length > 3 && (
        <>
          <CarouselPreviousWithoutHover className="-left-4"/>
          <CarouselNextWithoutHover className="-right-4"/>
        </>
      )}
    </Carousel>
  );
};

export default ThumbnailCarousel;