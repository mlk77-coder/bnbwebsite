import CarouselWithProgressBar from "@/components/carousel-with-progress-bar";
import SectionWrapper from "@/components/section-wrapper";
import { CarouselItem } from "@/components/ui/carousel";
import { HomePageCategory } from "@/types/home";
import { FC } from "react";
import CategoryCard from "./category-card";
import { getTranslations } from "next-intl/server";

type PropsType = {
  categories: HomePageCategory[];
};

const ExploreOurSelection: FC<PropsType> = async ({ categories }) => {
  const t = await getTranslations();
  return (
    <SectionWrapper className="space-y-4">
      <h2 className="text-base sm:text-xl font-bold text-primary ltr:tracking-wider">
        {t("explore-our-selection")}
      </h2>
      <p className="text-sm sm:text-base md:max-w-[75%]">
        {t("explore-our-selection-description")}
      </p>
      <CarouselWithProgressBar>
        {categories.map((category) => (
          <CarouselItem
            key={category.id}
            className="w-full basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <CategoryCard category={category} />
          </CarouselItem>
        ))}
      </CarouselWithProgressBar>
    </SectionWrapper>
  );
};

export default ExploreOurSelection;
