"use client";

import { FC, Fragment, useEffect, useState, useCallback } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

type CarouselWithProgressBarProps = {
  children: React.ReactNode;
  loop?: boolean;
  align?: "start" | "center" | "end";
  progressBarClassName?: string;
  progressFillClassName?: string;
};

const CarouselWithProgressBar: FC<CarouselWithProgressBarProps> = ({
  children,
  loop = true,
  align = "start",
  progressBarClassName = "mt-4 relative w-full h-0.5 bg-gray-200 rounded-full overflow-hidden",
  progressFillClassName = "absolute top-0 h-full bg-foreground transition-all duration-300 ease-in-out",
}) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    const snapList = api.scrollSnapList();
    setCount(snapList.length);

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);

    // Set the initial selected scroll snap when api is available
    setCurrent(api.selectedScrollSnap());

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const calculateProgress = useCallback((): number => {
    if (count <= 1) return 0;
    return (current / (count - 1)) * 100;
  }, [current, count]);

  return (
    <Fragment>
      <Carousel
        dir="ltr"
        setApi={setApi}
        opts={{
          loop,
          align,
        }}
      >
        <CarouselContent>{children}</CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div dir="ltr" className={progressBarClassName}>
        <div
          className={progressFillClassName}
          style={{
            left: `${calculateProgress()}%`,
            transform: `translateX(-${calculateProgress()}%`,
            width: `${100 / count}%`,
          }}
          role="progressbar"
          aria-valuenow={((current + 1) / count) * 100}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progress: ${((current + 1) / count) * 100}%`}
        />
      </div>
    </Fragment>
  );
};

export default CarouselWithProgressBar;
