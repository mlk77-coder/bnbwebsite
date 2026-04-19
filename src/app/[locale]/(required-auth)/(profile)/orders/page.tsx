import { cachedGetOrders } from "@/api/order/get-orders";
import getSession from "@/lib/get-session";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { FC } from "react";
import InifinteOrders from "./_components/infinite-orders";
import { Metadata } from "next";
import { headers } from "next/headers";

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

const OrdersPage: FC<PropsType> = async props => {
  const params = await props.params;

  const {
    locale
  } = params;

  const t = await getTranslations();
  const session = await getSession();
  const headersList = await headers();
  const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
    headers: headersList,
  });
  if (!session || !session.user) return notFound();

  const ordersResponse = await cachedGetOrders(
    locale,
    session.user.access_token,
    request
  );
  if (!ordersResponse.ok) return notFound();

  return (
    <div className="size-full flex-col gap-4 flex justify-start items-start">
      <h2 className="text-2xl font-bold ">{t("orders")}</h2>
      <InifinteOrders
        initialData={ordersResponse.data}
        token={session?.user?.access_token || ""}
      />
    </div>
  );
};

export default OrdersPage;
