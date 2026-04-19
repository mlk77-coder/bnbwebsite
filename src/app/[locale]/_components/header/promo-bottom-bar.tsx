import { HomePageContent } from "@/types/home";
import { getLocale } from "next-intl/server";
import { FC } from "react";
import Marquee from "react-fast-marquee";

type PropsType = {
  text: HomePageContent["text"];
};

const PromoBottomBar: FC<PropsType> = async ({ text }) => {
  const locale = await getLocale();
  if (text.length === 0) return null;
  return (
    <div className="w-full bg-orange py-1 h-7 text-background text-sm relative z-0">
      <Marquee>
        {text.map((item, index) => (
          <p key={index} className="px-8 border-s border-background">
            {locale === "en" ? item.en : item.ar}
          </p>
        ))}
      </Marquee>
    </div>
  );
};

export default PromoBottomBar;
