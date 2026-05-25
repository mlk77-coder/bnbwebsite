import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export default async function ProfilePageMetaData(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("my-profile"),
    robots: {
      index: false,
    },
  };
}
