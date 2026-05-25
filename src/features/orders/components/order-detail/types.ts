import type { OrderDetail } from '@/types/order';
import { ReactNode } from 'react';

export type OrderDetailTFunc = (
  key: string,
  values?: Record<string, string | number>
) => string;

export type OrderDetailContentProps = {
  order: OrderDetail;
  t: OrderDetailTFunc;
  cancelAction?: ReactNode;
};

export type OrderDetailSectionProps = {
  embedded?: boolean;
};
