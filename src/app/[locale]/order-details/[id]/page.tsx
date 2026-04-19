import { cachedGetOrder } from "@/api/order/get-orders";
import NotFoundUi from "@/components/not-found-ui";
import PageWrapper from "@/components/page-wrapper";
import SectionWrapper from "@/components/section-wrapper";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import Image from "next/image";
import OrderDeliveryLabel from "../../(required-auth)/orders/_components/checkout-deliver-Label";
import OrderSubtotalLabel from "../../(required-auth)/orders/_components/order-subtotal-label";
import OrderTotalLabel from "../../(required-auth)/orders/_components/order-total-label";
import CheckoutProductPrice from "../../checkout/_components/checkout-product-price";
import { Badge } from "@/components/ui/badge";

type PropsType = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

export default async function page(props: PropsType) {
  const params = await props.params;

  const {
    id,
    locale
  } = params;

  try {
    const cookieStore = await cookies();
    const softNavigationToken = cookieStore.get("softNavigationToken");
    const t = await getTranslations();
    const user_token = cookieStore.get("x-user-session")?.value || "";

    const ordersResponse = await cachedGetOrder(locale, user_token, id, false);
    if (!ordersResponse.ok) return <>error</>;
    const order = ordersResponse.data.order_products;

    if (!softNavigationToken) {
      return <NotFoundUi />;
    }
    return (
      <PageWrapper>
        <SectionWrapper className="max-w-screen-2xl w-full relative border-t flex-col md:flex-row flex justify-strat gap-4 items-start flex-1">
          <div className="w-full md:w-6/12 lg:w-5/12 sm:me-4 space-y-8 lg:me-10">
            <h1 className="uppercase text-2xl lg:text-4xl text-primary">
              {t("order-details")}
            </h1>
            <div className="space-y-6 pt-4">
              <div className="space-y-4">
                <h2 className="uppercase font-medium text-xl">
                  {t("general-information")}
                </h2>
                <p className="text-lg grid grid-cols-[150px_1fr]">
                  <span>{t("order-id")}:</span>
                  {order.order_id}
                </p>
                <p className="text-lg grid grid-cols-[150px_1fr]">
                  <span>{t("order-date")}:</span>
                  <span>{format(new Date(order.created_at), "PP pp")}</span>
                </p>
                <p className="text-lg grid grid-cols-[150px_1fr]">
                  <span>{t("order-status")}:</span>
                  <Badge className="w-fit text-sm" variant="secondary">
                    {order.status}
                  </Badge>
                </p>
              </div>
            </div>
            <div className="space-y-6 pt-4">
              <div className="space-y-4">
                <h2 className="uppercase font-medium text-xl">
                  {t("contact-information")}
                </h2>
                <p className="text-lg grid grid-cols-[150px_1fr]">
                  <span>{t("name")}:</span>
                  {order.name}
                </p>
                <p className="text-lg grid grid-cols-[150px_1fr]">
                  <span>{t("email")}:</span>
                  {order.email}
                </p>
                <p className="text-lg grid grid-cols-[150px_1fr]">
                  <span>{t("phone")}:</span>
                  {order.phone}
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col justify-start items-start gap-5">
                  <h2 className="uppercase font-medium text-xl">
                    {t("address-details")}
                  </h2>
                  <p className="text-lg grid grid-cols-[150px_1fr]">
                    <span>{t("country")}:</span>
                    {order.address_name.split("/")[0]}
                  </p>
                  <p className="text-lg grid grid-cols-[150px_1fr]">
                    <span>{t("city")}:</span>
                    {order.address_name.split("/")[1]}
                  </p>
                  <p className="text-lg grid grid-cols-[150px_1fr]">
                    <span>{t("adderess")}:</span>
                    {order.address_name.split("/")[2]}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full border md:w-6/12 rounded-lg shadow space-y-4 static md:sticky top-16 py-4 lg:w-7/12">
            <div className="w-full flex justify-between items-center">
              <h3 className="text-lg px-4 uppercase font-bold">
                {t("order-summary")}
              </h3>
            </div>
            <Separator />
            <div className="space-y-4 px-4">
              <p>
                {t("product-count", {
                  count: order.order_products.reduce(
                    (acc, product) => acc + product.quantity,
                    0
                  ),
                })}
              </p>
              {order.order_products.map((product, index) => (
                <div
                  key={index}
                  className="w-full flex flex-col justify-start items-start relative"
                >
                  <div className="w-full grid grid-cols-[auto_1fr] justify-between gap-4">
                    <Image
                      className="size-20 shrink-0 object-cover"
                      src={product.image ?? ""}
                      width={300}
                      height={300}
                      alt={product.name}
                    />
                    <div className="size-full gap-2 flex flex-col justify-between items-start">
                      <div className="flex w-full justify-between items-start gap-2">
                        <h2
                          title={product.name}
                          className="ltr:tracking-wide max-w-[70%] text-sm"
                        >
                          {`${product.quantity} X`} <span>{product.name}</span>
                        </h2>
                        <CheckoutProductPrice
                          price={+product.price}
                          quantity={product.quantity}
                        />
                      </div>
                      <div className="w-full max-sm:space-y-2 h-full">
                        <div className="size-full justify-start items-start flex flex-col text-xs md:text-sm capitalize">
                          {Object.entries(product.attributes || {}).map(
                            ([key, value], index) => (
                              <span key={index}>
                                {key}: {value}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Separator />
            <div className="space-y-2 px-4">
              <OrderSubtotalLabel
                invoice_value={order.invoice_value}
                coupon={order.coupon_value}
              />
              <OrderDeliveryLabel delivery={order.shipment_fees} />
            </div>
            <Separator />
            <OrderTotalLabel total={order.total} />
          </div>
        </SectionWrapper>
      </PageWrapper>
    );
  } catch (error) {
    console.log(error);
    return <>error</>;
  }
}
