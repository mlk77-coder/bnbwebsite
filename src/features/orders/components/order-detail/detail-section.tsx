import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import type { OrderDetailSectionProps } from './types';

type Props = OrderDetailSectionProps & {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
};

const DetailSection = ({
  title,
  icon: Icon,
  children,
  embedded = false,
}: Props) => {
  return (
    <section
      className={cn(
        embedded
          ? 'border-primary/10 rounded-2xl border p-4'
          : 'border-primary/10 shadow-primary/5 hover:shadow-primary/10 rounded-3xl border bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md'
      )}
    >
      <div
        className={cn(
          'border-primary/10 mb-3 flex items-center gap-2.5 border-b pb-2.5',
          !embedded && 'mb-4 pb-3'
        )}
      >
        <span
          className={cn(
            'text-primary bg-primary/8 flex items-center justify-center',
            embedded ? 'size-8 rounded-xl' : 'size-9 rounded-2xl'
          )}
        >
          <Icon className='size-4' aria-hidden />
        </span>
        <h3
          className={cn(
            'text-primary font-semibold',
            embedded ? 'text-sm' : 'text-xs tracking-[0.18em] uppercase'
          )}
        >
          {title}
        </h3>
      </div>
      {children}
    </section>
  );
};

export default DetailSection;
