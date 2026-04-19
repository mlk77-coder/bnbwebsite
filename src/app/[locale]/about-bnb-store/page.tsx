import PageWrapper from "@/components/page-wrapper";
import SectionWrapper from "@/components/section-wrapper";
import { fetcher } from "@/lib/fetcher";
import { SITE_BRAND_NAME } from "@/lib/site-branding";
import { cleanDescription } from "@/lib/utils";
import { GetPolicyResponse } from "@/types/policies";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("about-bnb-store"),
    description: t("about-bnb-store-description"),
    openGraph: {
      type: "website",
      title: SITE_BRAND_NAME,
      description: t("about-bnb-store-description"),
      siteName: SITE_BRAND_NAME,
      locale: "en",
      url: process.env.NEXT_PUBLIC_LOCAL_URL,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_LOCAL_URL}/og.png`,
          width: 1200,
          height: 630,
          alt: `${SITE_BRAND_NAME} logo`,
        },
      ],
    },
    alternates: {
      canonical: process.env.NEXT_PUBLIC_LOCAL_URL,
      languages: {
        ar: `${process.env.NEXT_PUBLIC_LOCAL_URL}/ar/about-bnb-store`,
        en: `${process.env.NEXT_PUBLIC_LOCAL_URL}/en/about-bnb-store`,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_BRAND_NAME,
      description: t("about-bnb-store-description"),
      images: [`${process.env.NEXT_PUBLIC_LOCAL_URL}/logo-light.png`],
      creator: "@R-Link",
      site: "@R-Link",
    },
  };
}

const Page = async () => {
  const locale = await getLocale();
  const response = await fetcher<GetPolicyResponse>(`policy?type=4`, locale);

  if (!response.ok) return <>error</>;
  return (
    <PageWrapper className="flex-1 h-full">
      <SectionWrapper>
        <article
          className="prose mx-auto max-w-screen-xl"
          dangerouslySetInnerHTML={{
            __html: cleanDescription(response.data.policies[0].text),
          }}
        />
      </SectionWrapper>
    </PageWrapper>
  );
};

export default Page;
