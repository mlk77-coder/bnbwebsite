import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export default async function ContactUsPageMetaData(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("contact-us.title"),
    description: t("contact-us-description"),
    openGraph: {
      type: "website",
      title: "BNB Store",
      description: t("contact-us-description"),
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
        ar: `${process.env.NEXT_PUBLIC_LOCAL_URL}/ar/contact-us`,
        en: `${process.env.NEXT_PUBLIC_LOCAL_URL}/en/contact-us`,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: "BNB Store",
      description: t("contact-us-description"),
      images: [`${process.env.NEXT_PUBLIC_LOCAL_URL}/logo-light.png`],
      creator: "@Ibrahim",
      site: "@Ibrahim",
    },
  };
}
