import PageWrapper from "@/components/page-wrapper";
import SectionWrapper from "@/components/section-wrapper";
import { Separator } from "@/components/ui/separator";
import { FC } from "react";
import FAQNavbar from "./_components/FAQNavbar";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

type PropsType = {
  children: React.ReactNode;
};
const FAQLayout: FC<PropsType> = async ({ children }) => {
  const t = await getTranslations();
  return (
    <PageWrapper>
      <div className="w-full grid grid-cols-1 md:grid-cols-7 justify-items-start-center items-center md:h-[350px]">
        <div className="size-full md:col-span-3 max-md:py-12 bg-[#e5e2d1] flex-col flex justify-center items-start ps-12 md:ps-24">
          <div className="flex flex-col justify-start gap-1 items-start md:max-w-80">
            <h1 className="max-md:text-sm text-orange">
              {t("bnb-store-customer-services")}
            </h1>
            <p className="text-xl md:text-3xl">
              {t("frequently-asked-questions")}
            </p>
          </div>
        </div>
        <div className="size-full min-h-[200px] md:col-span-4">
          <Image
            className="size-full object-cover"
            src="/FAQs3.png"
            alt="faq"
            width={1920}
            height={1080}
          />
        </div>
      </div>
      <SectionWrapper className="space-y-4">
        <div className="w-full md:grid items-start max-md:space-y-8 gap-20 md:grid-cols-12">
          <FAQNavbar />
          <Separator className="md:hidden" />
          <div className="md:col-span-9 max-md:py-10">{children}</div>
        </div>
      </SectionWrapper>
    </PageWrapper>
  );
};

export default FAQLayout;
