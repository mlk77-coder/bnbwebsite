import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export default async function WishlistPageMetaData(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("wishlist"),
    robots: {
      index: false,
    },
  };
}
