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
