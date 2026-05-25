const KNOWN_ORDER_STATUSES = [
  'pending',
  'processing',
  'completed',
  'delivered',
  'cancelled',
  'canceled',
] as const;

const KNOWN_PAYMENT_STATUSES = ['paid', 'unpaid', 'pending', 'failed'] as const;

export const getOrderStatusLabel = (
  status: string,
  t: (key: string) => string,
) => {
  const normalized = status.toLowerCase().trim();
  if (
    (KNOWN_ORDER_STATUSES as readonly string[]).includes(normalized)
  ) {
    return t(`order-statuses.${normalized}`);
  }
  return status;
};

export const getOrderPaymentStatusLabel = (
  status: string,
  t: (key: string) => string,
) => {
  const normalized = status.toLowerCase().trim();
  if (
    (KNOWN_PAYMENT_STATUSES as readonly string[]).includes(normalized)
  ) {
    return t(`order-payment-statuses.${normalized}`);
  }
  return status;
};

export const getOrderStatusClassName = (status: string) => {
  const value = status.toLowerCase();

  if (value === 'cancelled' || value === 'canceled') {
    return 'bg-red-50 text-red-700';
  }
  if (value === 'completed' || value === 'delivered') {
    return 'bg-emerald-50 text-emerald-700';
  }
  if (value === 'pending' || value === 'processing') {
    return 'bg-primary/12 text-primary';
  }

  return 'bg-secondary text-muted-foreground';
};
