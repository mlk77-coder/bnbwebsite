"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
} from "@/components/ui/carousel";
import MediaSlide from "./media-slide";
import PhotoProvider from "./photo-provider";
import ThumbnailCarousel from "./thumbnail-carousel";
import { useMediaQuery } from "@/app/hooks/use-media-query";

type ProductImagesSliderProps = {
  images: string[];
  name: string;
  mainImage: string;
};

const ProductImagesSlider: React.FC<ProductImagesSliderProps> = ({
  images,
  mainImage,
  name,
}) => {
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbnailApi, setThumbnailApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const media = images.length > 0 ? images : [mainImage];

  const syncSliders = useCallback((api: CarouselApi, index: number) => {
    if (!api) return;
    api.scrollTo(index);
  }, []);

  useEffect(() => {
    if (!mainApi || !thumbnailApi) return;

    mainApi.on("select", () => {
      const index = mainApi.selectedScrollSnap();
      setCurrentSlide(index);
      syncSliders(thumbnailApi, index);
    });

    thumbnailApi.on("select", () => {
      const index = thumbnailApi.selectedScrollSnap();
      setCurrentSlide(index);
      syncSliders(mainApi, index);
    });
  }, [mainApi, thumbnailApi, syncSliders]);

  return (
    <div className="space-y-5 overflow-hidden">
      <div className="relative">
        <PhotoProvider>
          <Carousel 
            opts={{ loop: media.length > 1 }} 
            setApi={setMainApi}
            className="w-full"
          >
            <CarouselContent className="ml-0">
              {media.length !== 0 ? (
                media.map((item, index) => (
                  <MediaSlide
                    alt={`${name} media preview ${index + 1}`}
                    key={`${item}-${index}-${isMobile ? "mobile" : "desktop"}`}
                    media={item}
                    isMobile={isMobile}
                  />
                ))
              ) : (
                <MediaSlide
                  key={`main-media-${isMobile ? "mobile" : "desktop"}`}
                  alt={`${name} media preview`}
                  isMobile={isMobile}
                  media={mainImage}
                />
              )}
            </CarouselContent>
          </Carousel>
        </PhotoProvider>
      </div>
      {media.length > 1 && (
        <ThumbnailCarousel
          images={media}
          name={name}
          setThumbnailApi={setThumbnailApi}
          mainApi={mainApi}
        />
      )}
    </div>
  );
};

export default ProductImagesSlider;
