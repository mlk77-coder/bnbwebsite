"use client";

import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import { FC, useEffect, useRef } from "react";
import { PhotoView } from "react-photo-view";
import { useZoomImageMove } from "@zoom-image/react";

type PropsType = {
  image: string;
  isMobile: boolean;
  alt: string;
};

const ImageSlide: FC<PropsType> = ({ image, isMobile, alt }) => {
  const { createZoomImage: createZoomImageMove } = useZoomImageMove();
  const imageMoveContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (imageMoveContainerRef.current) {
      const imageContainer = imageMoveContainerRef.current;
      createZoomImageMove(imageContainer, {
        zoomImageSource: image,
        zoomFactor: 2,
        disabledContextMenu: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PhotoView src={image}>
      {isMobile ? (
        <CarouselItem
          key="mobile"
          className="size-full overflow-hidden relative aspect-square ps-0"
        >
          <div className="relative size-full group">
            <Image
              priority
              src={image ?? ""}
              alt={alt}
              width={1000}
              height={1000}
              className="size-full object-cover overflow-hidden transition-transform duration-300 group-hover:scale-105"
            />
            {/* Overlay للتحكم */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        </CarouselItem>
      ) : (
        <CarouselItem
          ref={imageMoveContainerRef}
          key="desktop"
          className="size-full overflow-hidden relative aspect-square ps-0"
        >
          <div className="relative size-full group">
            <Image
              src={image ?? ""}
              priority
              alt={alt}
              width={1000}
              height={1000}
              className="size-full object-cover overflow-hidden transition-transform duration-300 group-hover:scale-105"
            />
            {/* Overlay للتحكم */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        </CarouselItem>
      )}
    </PhotoView>
  );
};

export default ImageSlide;
