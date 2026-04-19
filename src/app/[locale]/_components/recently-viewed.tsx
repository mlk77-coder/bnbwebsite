"use client";

import ProductCard from "@/components/product-card/product-card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Loader from "@/components/ui/loader";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useRecentlyViewed } from "../_hooks/use-recently-viewed";

type PropsType = {
  className?: string;
  token: string;
  isLoggedIn: boolean;
};

const RecentlyViewed: FC<PropsType> = ({ className, token, isLoggedIn }) => {
  const locale = useLocale();
  const t = useTranslations();
  const observerTarget = useRef(null);

  const { products, loading, error, hasMore, loadMore } = useRecentlyViewed(
    locale,
    token,
    isLoggedIn
  );
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
    return (current / (count - 2)) * 100;
  }, [current, count]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.5 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, loadMore]);

  if (loading && products.length === 0) {
    return (
      <div className={cn("space-y-10", className)}>
        <h2 className="w-full border-t pt-12 text-xl font-bold text-primary ltr:tracking-wider">
          {t("recently-viewed")}
        </h2>
        <div className="flex justify-center items-center pt-4">
          <Loader variant="bars" className="text-primary" size="lg" />
        </div>
      </div>
    );
  }

  if (error) return null;
  if (products.length === 0) {
    return null;
  }

  return (
    <section className={cn("space-y-10", className)}>
      <h2 className="w-full border-t pt-12 text-xl font-bold text-primary ltr:tracking-wider">
        {t("recently-viewed")}
      </h2>
      <Carousel setApi={setApi} opts={{ align: "start" }}>
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
          {hasMore && (
            <CarouselItem
              ref={observerTarget}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              {loading ? (
                <div className="size-full flex justify-center items-center">
                  <Loader className="text-primary" variant="ring" size="xl" />
                </div>
              ) : null}
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div
        dir="ltr"
        className="mt-4 relative w-full h-0.5 bg-gray-200 rounded-full overflow-hidden"
      >
        <div
          className="absolute top-0 h-full bg-foreground transition-all duration-300 ease-in-out"
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
    </section>
  );
};

export default RecentlyViewed;
