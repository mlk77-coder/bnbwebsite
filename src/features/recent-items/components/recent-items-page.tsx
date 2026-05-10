import RecentItemsGrid from "@/features/recent-items/client/recent-items-grid";
import { cachedGetRecentlyViewed } from "@/features/recent-items/api/get-recently-viewed";
import getSession from "@/lib/get-session";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { FC } from "react";

type PropsType = {
  params: Promise<{ locale: string }>;
};

const RecentItemsPage: FC<PropsType> = async (props) => {
  const params = await props.params;
  const { locale } = params;

  const session = await getSession();
  const t = await getTranslations();
  if (!session || !session.user) return notFound();
  const wishListResponse = await cachedGetRecentlyViewed(
    locale,
    session.user.access_token
  );

  if (!wishListResponse.ok) return <>error</>;
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-3xl bg-secondary/40 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Clock className="size-5" />
          </span>
          <div>
            <h2 className="text-2xl font-bold text-primary">
              {t("recently-viewed")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("product-count", {
                count: wishListResponse.data.products.length,
              })}
            </p>
          </div>
        </div>
      </div>
      <RecentItemsGrid
        initialData={wishListResponse.data}
        token={session?.user?.access_token || ""}
      />
    </div>
  );
};

export default RecentItemsPage;
