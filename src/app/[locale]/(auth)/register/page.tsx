import PageWrapper from "@/components/page-wrapper";
import SectionWrapper from "@/components/section-wrapper";
import { Metadata } from "next";
import { FC } from "react";
import { RegisterPage } from "@/features/auth";
import { getTranslations } from "next-intl/server";

type PropsType = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PropsType): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("auth.sign-up"),
    description: t(
      "create-a-new-account-to-start-shopping-effortlessly-manage-your-orders-and-enjoy-a-personalized-and-secure-experience-on-our-platform"
    ),
    openGraph: {
      type: "website",
      title: "BNB Store",
      description: t(
        "create-a-new-account-to-start-shopping-effortlessly-manage-your-orders-and-enjoy-a-personalized-and-secure-experience-on-our-platform"
      ),
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
        ar: `${process.env.NEXT_PUBLIC_LOCAL_URL}/ar/register`,
        en: `${process.env.NEXT_PUBLIC_LOCAL_URL}/en/register`,
      },
    },

    twitter: {
      card: "summary_large_image",
      title: "BNB Store",
      description: t(
        "create-a-new-account-to-start-shopping-effortlessly-manage-your-orders-and-enjoy-a-personalized-and-secure-experience-on-our-platform"
      ),
      images: [`${process.env.NEXT_PUBLIC_LOCAL_URL}/logo-light.png`],
      creator: "@Ibrahim",
      site: "@Ibrahim",
    },
    icons: {
      icon: "/favicon/favicon.ico",
      apple: "/favicon/apple-touch-icon.png",
      shortcut: "/favicon/apple-touch-icon.png",
    },
    other: {
      rating: "General",
    },
  };
}

const Page: FC<PropsType> = () => {
  return (
    <PageWrapper className="flex-1 pb-8">
      <SectionWrapper className="max-w-screen-lg">
        <RegisterPage hardLink={true} />
      </SectionWrapper>
    </PageWrapper>
  );
};

export default Page;
