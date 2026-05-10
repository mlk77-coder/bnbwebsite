import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export default async function HomePageMetaData(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: "Welcome to BNB Store",
    description: t("meta-description"),
    openGraph: {
      type: "website",
      title: "BNB Store",
      description: t("meta-description"),
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

    twitter: {
      card: "summary_large_image",
      title: "BNB Store",
      description: t("meta-description"),
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
