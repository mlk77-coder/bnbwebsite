import EmbeddedOrderDetail from '@/features/orders/components/order-detail/embedded-order-detail';
import StandaloneOrderDetail from '@/features/orders/components/order-detail/standalone-order-detail';
import type { OrderDetailContentProps } from '@/features/orders/components/order-detail/types';

const OrderDetailContent = ({
  order,
  t,
  embedded = false,
  cancelAction,
}: OrderDetailContentProps) => {
  if (embedded) {
    return (
      <EmbeddedOrderDetail
        order={order}
        t={t}
        cancelAction={cancelAction}
      />
    );
  }

  return (
    <StandaloneOrderDetail
      order={order}
      t={t}
      cancelAction={cancelAction}
    />
  );
};

export default OrderDetailContent;
