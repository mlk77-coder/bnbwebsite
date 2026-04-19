"use client"
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import AutoPlay from "embla-carousel-autoplay";

const HeroCarousel = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        containScroll: "trimSnaps",
      }}
      plugins={[
        AutoPlay({
          delay: 5000,
        }),
      ]}
    >
      <CarouselContent>{children}</CarouselContent>
    </Carousel>
  );
};

export default HeroCarousel;
