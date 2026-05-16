import type { OrderDetail } from '@/types/order';

export const parseOrderMoney = (value: string) => {
  const n = Number.parseFloat(value);
  return Number.isFinite(n) ? n : 0;
};

export const getOrderItemQty = (order: OrderDetail) =>
  order.items.reduce((acc, line) => acc + line.quantity, 0);

export const formatOrderAddressLine = (order: OrderDetail) =>
  [
    order.address.area,
    order.address.street_address,
    order.address.building_number,
  ]
    .filter(Boolean)
    .join(', ');
