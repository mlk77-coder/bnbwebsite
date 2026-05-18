import EmbeddedOrderDetail from "@/features/orders/components/order-detail/embedded-order-detail";
import type { OrderDetailContentProps } from "@/features/orders/components/order-detail/types";

const OrderDetailContent = ({
  order,
  t,
  cancelAction,
}: OrderDetailContentProps) => (
  <EmbeddedOrderDetail order={order} t={t} cancelAction={cancelAction} />
);

export default OrderDetailContent;
