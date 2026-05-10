import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export default async function NewArrivalsCategoryPageMetaData(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("new-arrivals"),
  };
}
