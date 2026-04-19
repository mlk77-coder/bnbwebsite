import CategoryBigCard from "@/components/category-big-card";
import SectionWrapper from "@/components/section-wrapper";
import { Link } from "@/navigation";
import { HomePageCategory } from "@/types/home";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { FC } from "react";

type PropsType = {
  categories: HomePageCategory[];
};

const NewArrivals: FC<PropsType> = async ({ categories }) => {
  const t = await getTranslations();
  return (
    <SectionWrapper className="space-y-4">
      <h2 className="text-lg sm:text-xl font-bold text-primary ltr:tracking-wider">
        {t("new-arrivals")}
      </h2>
      <p className="text-sm sm:text-base md:max-w-[75%]">
        {t("new-arrivals-description")}
      </p>
      <div className="w-full flex flex-col md:flex-row justify-center items-center overflow-hidden gap-4 md:gap-2 lg:gap-4">
        {categories.map((category) => {
          const categoryPath = category.parents_slugs.length
            ? `/category/${category.parents_slugs.reverse().join("/")}`
            : `/category/${category.slug}`;

          return (
            <CategoryBigCard
              key={category.id}
              href={categoryPath}
              image={category.image}
              name={category.name}
            />
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default NewArrivals;
