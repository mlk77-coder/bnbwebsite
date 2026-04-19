import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "@/navigation";
import { HomePageDiscount } from "@/types/home";
import Image from "next/image";
import { FC } from "react";

type PropsType = {
  discount: HomePageDiscount;
};

const DiscountCard: FC<PropsType> = ({ discount }) => {
  return (
    <Link href={`/sales/${discount.id}`}>
      <Card className="p-0 group shadow-none rounded-none border-0">
        <CardContent className="p-0 size-full aspect-[152/187]">
          <Image
            src={discount.image ?? ""}
            alt={discount.name}
            width={2000}
            height={2000}
            className="size-full object-cover"
          />
        </CardContent>
        <CardFooter className="px-0 group-hover:text-orange pt-2 sm:pt-5 clear-start flex-col justify-start items-start gap-1">
          <p className="font-bold text-xs sm:text-lg line-clamp-2">
            {discount.name}
          </p>
          <p
            title={discount.description}
            className="capitalize text-xs sm:text-base line-clamp-1"
          >
            {discount.description}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default DiscountCard;
