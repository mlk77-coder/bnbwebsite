import { cachedGetRecentlyViewed } from "@/api/recently-viewed/get-recently-viewed";
import getSession from "@/lib/get-session";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { FC } from "react";
import InifinteRecentViewed from "./_components/inifinte-recent-viewed";
import { Metadata } from "next";

type PropsType = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("recently-viewed"),
    robots: {
      index: false,
    },
  };
}

const RecentItemsPage: FC<PropsType> = async props => {
  const params = await props.params;

  const {
    locale
  } = params;

  const session = await getSession();
  const t = await getTranslations();
  if (!session || !session.user) return notFound();
  const wishListResponse = await cachedGetRecentlyViewed(
    locale,
    session.user.access_token
  );

  if (!wishListResponse.ok) return <>error</>;
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold ">{t("recently-viewed")}</h2>
      <InifinteRecentViewed
        initialData={wishListResponse.data}
        token={session?.user?.access_token || ""}
      />
    </div>
  );
};

export default RecentItemsPage;
