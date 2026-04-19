import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { useLocale } from "next-intl";
import Image from "next/image";
import { FC } from "react";

type PropsType = {
  href: string;
  name: string;
  image: string;
  className?: string;
};
const CategoryBigCard: FC<PropsType> = ({ image, name, href, className }) => {
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";
  return (
    <Link
      href={href}
      dir={dir}
      className={cn(
        "flex-1 aspect-square hover:opacity-85 relative group",
        className
      )}
    >
      <Image
        src={image ?? ""}
        alt={`${name} category image`}
        width={2500}
        height={2500}
        style={{ objectPosition: "50% 50%" }}
        className="size-full aspect-square object-cover"
      />
      <p className="absolute shadow text-center min-w-[50%] start-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 font-medium top-[80%] max-md:top-1/2 z-[1] bg-background p-2.5 md:p-4 text-base lg:text-lg text-primary flex justify-center items-center group-hover:underline">
        {name}
      </p>
    </Link>
  );
};

export default CategoryBigCard;
