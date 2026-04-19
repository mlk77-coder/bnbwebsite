import ProductCard from "@/components/product-card/product-card";
import SectionWrapper from "@/components/section-wrapper";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard as ProductCardType } from "@/types/products";
import { getTranslations } from "next-intl/server";
import { FC } from "react";

type PropsType = {
  products: ProductCardType[];
  title: string;
  description: string;
};

const BestSellers: FC<PropsType> = async ({ products, title, description }) => {
  const t = await getTranslations();
  return (
    <SectionWrapper className="space-y-10">
      <h2 className="w-full border-b pb-2 text-lg sm:text-xl font-bold text-primary ltr:tracking-wider">
        {title}
      </h2>
      <p className="text-sm sm:text-base md:max-w-[75%]">{description}</p>
      <Carousel opts={{ loop: true, align: "start" }}>
        <CarouselContent>
          {products.map((product, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </SectionWrapper>
  );
};

export default BestSellers;
