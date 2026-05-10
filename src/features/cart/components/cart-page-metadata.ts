import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export default async function CartPageMetaData(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("cart-title"),
    description: t("cart-description"),
    openGraph: {
      type: "website",
      title: "BNB Store",
      description: t("cart-description"),
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
        ar: `${process.env.NEXT_PUBLIC_LOCAL_URL}/ar/cart`,
        en: `${process.env.NEXT_PUBLIC_LOCAL_URL}/en/cart`,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: "BNB Store",
      description: t("cart-description"),
      images: [`${process.env.NEXT_PUBLIC_LOCAL_URL}/logo-light.png`],
      creator: "@Ibrahim",
      site: "@Ibrahim",
    },
  };
}
