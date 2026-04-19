import CustomBreadcrumb from "@/components/custom-breadcrumb";
import PageWrapper from "@/components/page-wrapper";
import SectionWrapper from "@/components/section-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTranslations } from "next-intl/server";
import Women from "./_components/women/women";
import Men from "./_components/men/men";
import Newborn from "./_components/newborn/newborn";
import Girl from "./_components/girl/girl";
import Boys from "./_components/boys/boys";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("size-chart"),
    description: t("size-chart-description"),
    openGraph: {
      type: "website",
      title: "BNB Store",
      description: t("size-chart-description"),
      siteName: "BNB Store",
      locale: "en",
      url: process.env.NEXT_PUBLIC_LOCAL_URL,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_LOCAL_URL}/og.png`,
          width: 1200,
          height: 630,
          alt: "BNB Store Logo",
        },
      ],
    },
    alternates: {
      canonical: process.env.NEXT_PUBLIC_LOCAL_URL,
      languages: {
        ar: `${process.env.NEXT_PUBLIC_LOCAL_URL}/ar/size-chart`,
        en: `${process.env.NEXT_PUBLIC_LOCAL_URL}/en/size-chart`,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: "BNB Store",
      description: t("size-chart-description"),
      images: [`${process.env.NEXT_PUBLIC_LOCAL_URL}/logo-light.png`],
      creator: "@R-Link",
      site: "@R-Link",
    },
  };
}

const SizeChartPage = async () => {
  const t = await getTranslations();
  return (
    <PageWrapper>
      <SectionWrapper>
        <CustomBreadcrumb activeLink={t("size-chart")} links={[]} />
        <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-medium py-12">
          {t("size-chart")}
        </h1>
        <Tabs defaultValue="women">
          <TabsList className="w-full rounded-none border-b border-foreground h-fit flex-wrap gap-6 py-4 bg-background">
            <TabsTrigger
              className="text-black capitalize text-base font-semibold data-[state=active]:text-orange data-[state=active]:shadow-none"
              value="women"
            >
              {t("women")}
            </TabsTrigger>
            <TabsTrigger
              className="text-black capitalize text-base font-semibold data-[state=active]:text-orange data-[state=active]:shadow-none"
              value="men"
            >
              {t("men")}
            </TabsTrigger>
            <TabsTrigger
              className="text-black capitalize text-base font-semibold data-[state=active]:text-orange data-[state=active]:shadow-none"
              value="newborn"
            >
              {t("newborn")}
            </TabsTrigger>
            <TabsTrigger
              className="text-black capitalize text-base font-semibold data-[state=active]:text-orange data-[state=active]:shadow-none"
              value="girl"
            >
              {t("girls")}
            </TabsTrigger>
            <TabsTrigger
              className="text-black capitalize text-base font-semibold data-[state=active]:text-orange data-[state=active]:shadow-none"
              value="boys"
            >
              {t("boys")}
            </TabsTrigger>
          </TabsList>
          <TabsContent className="pt-10" value="women">
            <Women />
          </TabsContent>
          <TabsContent className="pt-10" value="men">
            <Men />
          </TabsContent>
          <TabsContent className="pt-10" value="newborn">
            <Newborn />
          </TabsContent>
          <TabsContent className="pt-10" value="girl">
            <Girl />
          </TabsContent>
          <TabsContent className="pt-10" value="boys">
            <Boys />
          </TabsContent>
        </Tabs>
      </SectionWrapper>
    </PageWrapper>
  );
};

export default SizeChartPage;
