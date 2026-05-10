import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export default async function RecentItemsPageMetaData(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("recently-viewed"),
    robots: {
      index: false,
    },
  };
}
