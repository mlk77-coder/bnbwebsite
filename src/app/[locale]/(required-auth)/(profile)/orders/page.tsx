import { cachedGetOrders } from "@/api/order/get-orders";
import getSession from "@/lib/get-session";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { headers } from "next/headers";
import { PackageCheck } from "lucide-react";
import { notFound } from "next/navigation";
import { FC } from "react";
import InifinteOrders from "./_components/infinite-orders";

type PropsType = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("my-orders"),
    robots: {
      index: false,
    },
  };
}

const OrdersPage: FC<PropsType> = async (props) => {
  const params = await props.params;
  const { locale } = params;

  const t = await getTranslations();
  const session = await getSession();
  const headersList = await headers();
  const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
    headers: headersList,
  });
  if (!session?.user) return notFound();

  const ordersResponse = await cachedGetOrders(
    locale,
    session.user.access_token,
    request,
  );
  if (!ordersResponse.ok) return notFound();
  const body = ordersResponse.data;
  if (!body.success) return notFound();

  const firstPage = body.data;

  return (
    <div className="flex size-full flex-col items-start justify-start gap-6">
      <div className="flex w-full flex-col gap-3 rounded-3xl bg-secondary/40 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <PackageCheck className="size-5" />
          </span>
          <div>
            <h2 className="text-2xl font-bold text-primary">{t("orders")}</h2>
            <p className="text-sm text-muted-foreground">
              {t("orders-count", { count: firstPage.meta.total })}
            </p>
          </div>
        </div>
      </div>
      <InifinteOrders initialData={firstPage} token={session.user.access_token} />
    </div>
  );
};

export default OrdersPage;
