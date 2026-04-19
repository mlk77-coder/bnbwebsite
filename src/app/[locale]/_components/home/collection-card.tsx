import ProductCard from "@/components/product-card/product-card";
import SectionWrapper from "@/components/section-wrapper";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { HomePageCategoryWithProducts } from "@/types/home";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

type PropsType = {
  category: HomePageCategoryWithProducts;
  index: number;
};

const CollectionCard: FC<PropsType> = async ({ category, index }) => {
  const categoryPath = category.parents_slugs.length
    ? `/category/${category.parents_slugs.reverse().join("/")}`
    : `/category/${category.slug}`;
  return (
    <SectionWrapper
      key={category.id}
      className={cn(
        "gap-x-3 lg:gap-x-8",
        index % 2 === 0 ? "md:collection" : "md:collection-invert"
      )}
    >
      <div className="space-y-4 mb-4 lg:mb-8 [grid-area:header] [grid-column:span_2]">
        <h2 className="text-lg font-bold">{category.name}</h2>
        <Link
          className="inline-flex justify-start items-end gap-2 over:text-orange duration-100 group"
          href={categoryPath}
        >
          Explore more
          <MoveRight className="size-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 duration-100 rtl:rotate-180" />
        </Link>
      </div>
      <Link
        className="size-full [grid-area:promo-image] aspect-[387/346]"
        href={categoryPath}
      >
        <Image
          src={category.image ?? ""}
          alt={category.name}
          width={1000}
          height={1000}
          className="size-full hover:opacity-85 object-cover"
        />
      </Link>
      <Carousel
        className={cn(
          "h-full w-11/12 mx-auto md:w-full max-md:-mt-44 [grid-area:carousel]"
        )}
        opts={{ loop: true, align: "start" }}
      >
        <CarouselContent className="-ms-4 md:-ms-7">
          {category.products.map((product, index) => (
            <CarouselItem key={index} className="sm:basis-1/2 ps-4 md:ps-7">
              <div className="bg-background p-4">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </SectionWrapper>
  );
};

export default CollectionCard;
