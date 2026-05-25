import { cn } from '@/lib/utils';
import type { OrderDetailSectionProps } from './types';

type Props = OrderDetailSectionProps & {
  label: string;
  children: React.ReactNode;
};

const MetaRow = ({ label, children, embedded = false }: Props) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-1 leading-relaxed',
        embedded
          ? 'text-sm sm:grid-cols-[minmax(7rem,9rem)_1fr] sm:items-start sm:gap-3'
          : 'text-base sm:grid-cols-[minmax(8rem,10rem)_1fr] sm:items-start sm:gap-4'
      )}
    >
      <dt className='text-muted-foreground/80 font-medium'>{label}</dt>
      <dd className='text-foreground min-w-0'>{children}</dd>
    </div>
  );
};

export default MetaRow;
