"use client";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../../../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { HomePageLinks } from "@/types/home";
import { FC } from "react";
import { Sparkles, Truck, Gift, Percent } from "lucide-react";

const icons = [Sparkles, Truck, Gift, Percent];

type PropsType = {
  links: HomePageLinks["home_page_links"]["links"];
  locale: string;
};

const PromoSlider: FC<PropsType> = ({ links, locale }) => {
  return (
    <Carousel
      opts={{
        loop: true,
        startIndex: 1,
        align: "center",
      }}
      plugins={[
        Autoplay({
          delay: 4000,
          stopOnInteraction: false,
        }),
      ]}
      className="relative z-0 w-full"
    >
      <CarouselContent className="m-0">
        {links.map((link, index) => {
          const IconComponent = icons[index % icons.length];
          return (
            <CarouselItem 
              key={index} 
              className="basis-full md:basis-1/2 lg:basis-1/3 pl-0"
            >
              <Link
                className="group inline-flex size-full justify-center items-center gap-2 px-4 py-1 text-xs md:text-sm transition-all duration-300 hover:text-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
                href={link.url}
              >
                <IconComponent className="w-3.5 h-3.5 md:w-4 md:h-4 opacity-80 group-hover:scale-110 transition-transform duration-300" />
                <span className="tracking-wide">
                  {locale === "en" ? link.name.en : link.name.ar}
                </span>
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};

export default PromoSlider;
