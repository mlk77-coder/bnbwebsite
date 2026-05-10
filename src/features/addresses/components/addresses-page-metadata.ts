import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export default async function AddressesPageMetaData(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("my-addresses"),
    robots: {
      index: false,
    },
  };
}
