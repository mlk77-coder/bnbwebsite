import PageWrapper from "@/components/page-wrapper";
import SectionWrapper from "@/components/section-wrapper";
import { fetcher } from "@/lib/fetcher";
import { cleanDescription } from "@/lib/utils";
import { GetPolicyResponse } from "@/types/policies";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("cookies-policy"),
    description: t("cookies-policy-description"),
    openGraph: {
      type: "website",
      title: "BNB Store",
      description: t("cookies-policy-description"),
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
        ar: `${process.env.NEXT_PUBLIC_LOCAL_URL}/ar/cookies-policy`,
        en: `${process.env.NEXT_PUBLIC_LOCAL_URL}/en/cookies-policy`,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: "BNB Store",
      description: t("cookies-policy-description"),
      images: [`${process.env.NEXT_PUBLIC_LOCAL_URL}/logo-light.png`],
      creator: "@R-Link",
      site: "@R-Link",
    },
  };
}

const Page = async () => {
  const locale = await getLocale();
  const response = await fetcher<GetPolicyResponse>(`policy?type=3`, locale);

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
