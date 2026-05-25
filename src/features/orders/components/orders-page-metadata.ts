import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export default async function OrdersPageMetaData(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("my-orders"),
    robots: {
      index: false,
    },
  };
}
