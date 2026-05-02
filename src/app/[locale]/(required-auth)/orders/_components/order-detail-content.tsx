import CheckoutProductPrice from "@/app/[locale]/checkout/_components/checkout-product-price";
import PageWrapper from "@/components/page-wrapper";
import SectionWrapper from "@/components/section-wrapper";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { OrderDetail } from "@/types/order";
import { format } from "date-fns";
import { MapPin, Package, Receipt, User } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";
import OrderDeliveryLabel from "./checkout-deliver-Label";
import OrderSubtotalLabel from "./order-subtotal-label";
import OrderTotalLabel from "./order-total-label";

type TFunc = (key: string, values?: Record<string, string | number>) => string;

type Props = {
  order: OrderDetail;
  t: TFunc;
  cancelAction?: ReactNode;
};

const parseMoney = (value: string) => {
  const n = Number.parseFloat(value);
  return Number.isFinite(n) ? n : 0;
};

function DetailSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof Package;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-3xl border border-primary/10 bg-white p-5 shadow-sm shadow-primary/5",
        "transition-shadow duration-300 hover:shadow-md hover:shadow-primary/10",
      )}
    >
      <div className="mb-4 flex items-center gap-2.5 border-b border-primary/10 pb-3">
        <span className="flex size-9 items-center justify-center rounded-2xl bg-primary/8 text-primary">
          <Icon className="size-4" aria-hidden />
        </span>
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function MetaRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-1 text-base leading-relaxed sm:grid-cols-[minmax(8rem,10rem)_1fr] sm:items-start sm:gap-4">
      <dt className="font-medium text-primary">{label}</dt>
      <dd className="min-w-0 text-foreground">{children}</dd>
    </div>
  );
}

export default function OrderDetailContent({ order, t, cancelAction }: Props) {
  const itemQty = order.items.reduce((acc, line) => acc + line.quantity, 0);
  const addressLine = [
    order.address.area,
    order.address.street_address,
    order.address.building_number,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <PageWrapper>
      <SectionWrapper className="max-w-screen-2xl flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
        <div className="w-full shrink-0 space-y-8 lg:max-w-lg xl:max-w-xl">
          <header className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">
              {t("my-orders")}
            </p>
            <h1 className="font-serif text-4xl font-normal uppercase leading-tight tracking-wide text-primary md:text-5xl">
              {t("order-details")}
            </h1>
            <div className="h-px max-w-[4.5rem] bg-primary/35" aria-hidden />
          </header>

          <div className="space-y-5">
            <DetailSection title={t("general-information")} icon={Receipt}>
              <dl className="space-y-4">
                <MetaRow label={`${t("order-id")}:`}>
                  <span className="font-semibold tracking-tight">
                    {order.order_number}
                  </span>
                </MetaRow>
                <MetaRow label={`${t("order-date")}:`}>
                  <time dateTime={order.created_at}>
                    {format(new Date(order.created_at), "PP pp")}
                  </time>
                </MetaRow>
                <MetaRow label={`${t("order-status")}:`}>
                  <Badge
                    className="rounded-full bg-primary/12 px-3 py-1 text-xs font-medium capitalize text-primary hover:bg-primary/18"
                    variant="secondary"
                  >
                    {order.status}
                  </Badge>
                </MetaRow>
                <MetaRow label={`${t("estimated-delivery")}:`}>
                  <time dateTime={order.estimated_delivery}>
                    {format(new Date(order.estimated_delivery), "PP")}
                  </time>
                </MetaRow>
                <MetaRow label={`${t("payment")}:`}>
                  <span className="capitalize">
                    {order.payment_method.replace(/_/g, " ")}
                  </span>
                </MetaRow>
                <MetaRow label={`${t("payment-status")}:`}>
                  <span className="capitalize">{order.payment_status}</span>
                </MetaRow>
              </dl>
            </DetailSection>

            <DetailSection title={t("contact-information")} icon={User}>
              <dl className="space-y-4">
                <MetaRow label={`${t("name")}:`}>
                  {order.address.address_name}
                </MetaRow>
                <MetaRow label={`${t("phone")}:`}>
                  <a
                    className="text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
                    href={`tel:${order.address.phone.replace(/\s/g, "")}`}
                  >
                    {order.address.phone}
                  </a>
                </MetaRow>
              </dl>
            </DetailSection>

            <DetailSection title={t("address-details")} icon={MapPin}>
              <dl className="space-y-4">
                <MetaRow label={`${t("country")}:`}>
                  {order.address.country}
                </MetaRow>
                <MetaRow label={`${t("city")}:`}>{order.address.city}</MetaRow>
                <MetaRow label={`${t("adderess")}:`}>{addressLine}</MetaRow>
                {order.address.details ? (
                  <MetaRow label={`${t("address-fields.details")}:`}>
                    <span className="text-muted-foreground">
                      {order.address.details}
                    </span>
                  </MetaRow>
                ) : null}
                {order.notes ? (
                  <MetaRow label={`${t("order-notes")}:`}>
                    <span className="whitespace-pre-wrap text-muted-foreground">
                      {order.notes}
                    </span>
                  </MetaRow>
                ) : null}
              </dl>
            </DetailSection>

            {cancelAction ? (
              <div className="rounded-3xl border border-dashed border-primary/25 bg-secondary/25 p-5">
                {cancelAction}
              </div>
            ) : null}
          </div>
        </div>

        <aside className="sticky top-24 w-full min-w-0 flex-1">
          <div
            className={cn(
              "overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-lg shadow-primary/10",
              "ring-1 ring-black/5",
            )}
          >
            <div className="relative border-b border-primary/10 bg-linear-to-br from-primary/12 via-white to-transparent px-6 py-5">
              <div className="flex items-center gap-2 text-primary">
                <Package className="size-5 shrink-0" aria-hidden />
                <h3 className="font-serif text-lg uppercase tracking-[0.12em] text-primary md:text-xl">
                  {t("order-summary")}
                </h3>
              </div>
            </div>

            <div className="space-y-5 px-6 py-5">
              <p className="text-sm font-medium text-muted-foreground">
                {t("product-count", { count: itemQty })}
              </p>

              <ul className="space-y-4">
                {order.items.map((line) => (
                  <li
                    key={line.id}
                    className="rounded-2xl border border-primary/10 bg-secondary/25 p-3 transition-colors hover:border-primary/20"
                  >
                    <div className="flex gap-4">
                      <div className="relative size-[4.75rem] shrink-0 overflow-hidden rounded-2xl border border-white bg-white shadow-sm">
                        <Image
                          src={line.product.image ?? "/no-product.svg"}
                          alt={line.product.name}
                          fill
                          className="object-cover"
                          sizes="76px"
                        />
                      </div>
                      <div className="min-w-0 flex-1 pt-0.5">
                        <div className="flex items-start justify-between gap-3">
                          <span className="text-sm leading-snug font-medium capitalize">
                            {line.quantity}&nbsp;&times;&nbsp;
                            <span>{line.product.name}</span>
                          </span>
                          <CheckoutProductPrice
                            price={parseMoney(line.price)}
                            quantity={line.quantity}
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <Separator className="bg-primary/10" />

            <div className="space-y-3 px-6 py-5">
              <OrderSubtotalLabel
                invoice_value={parseMoney(order.subtotal)}
                tax={parseMoney(order.tax)}
                coupon={null}
              />
              <OrderDeliveryLabel delivery={parseMoney(order.shipping)} />
            </div>

            <Separator className="bg-primary/10" />

            <div className="bg-secondary/30 px-2 py-4">
              <OrderTotalLabel total={parseMoney(order.total)} />
            </div>
          </div>
        </aside>
      </SectionWrapper>
    </PageWrapper>
  );
}
