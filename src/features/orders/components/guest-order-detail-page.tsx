import { cachedGetOrder } from "@/features/orders/api/get-orders";
import OrderDetailContent from "@/features/orders/components/order-detail-content";
import NotFoundUi from "@/components/not-found-ui";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { FC } from "react";

type PropsType = {
  params: Promise<{ locale: string; id: string }>;
};

const GuestOrderDetailPage: FC<PropsType> = async (props) => {
  const params = await props.params;

  try {
    const { id, locale } = params;
    const cookieStore = await cookies();
    const softNavigationToken = cookieStore.get("softNavigationToken");
    const t = await getTranslations();
    const user_token = cookieStore.get("x-user-session")?.value ?? "";

    if (!softNavigationToken) return <NotFoundUi />;

    const ordersResponse = await cachedGetOrder(
      locale,
      user_token,
      id,
      false,
    );
    if (!ordersResponse.ok || !ordersResponse.data.success) return <NotFoundUi />;

    const order = ordersResponse.data.data;
    return <OrderDetailContent order={order} t={t} />;
  } catch (error) {
    console.error(error);
    return <NotFoundUi />;
  }
};

export default GuestOrderDetailPage;
