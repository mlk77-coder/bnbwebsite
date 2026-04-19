import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "@/navigation";
import { HomePageCategory } from "@/types/home";
import { useLocale } from "next-intl";
import Image from "next/image";
import { FC } from "react";
import { getLangDir } from "rtl-detect";

type PropsType = {
  category: HomePageCategory;
};

const CategoryCard: FC<PropsType> = ({ category }) => {
  const locale = useLocale();
  const direction = getLangDir(locale);
  const categoryPath = category.parents_slugs.length
    ? `/category/${category.parents_slugs.reverse().join("/")}`
    : `/category/${category.slug}`;
  return (
    <Link dir={direction} href={categoryPath}>
      <Card className="p-0 group rounded-none border-0">
        <CardContent className="p-0 size-full aspect-[152/187]">
          <Image
            src={category.image ?? ""}
            alt={`${category.name} category image`}
            width={500}
            height={1000}
            className="size-full object-cover"
          />
        </CardContent>
        <CardFooter className="px-0 group-hover:text-orange pt-2 sm:pt-6 clear-start flex-col justify-start items-start gap-1">
          <p className="font-bold text-sm sm:text-lg">{category.name}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CategoryCard;
