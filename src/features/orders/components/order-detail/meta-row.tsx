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
        'flex items-start justify-between gap-3 leading-relaxed',
        embedded ? 'text-sm' : 'text-base'
      )}
    >
      <dt className='text-muted-foreground/80 shrink-0 font-medium'>{label}</dt>
      <dd className='text-foreground min-w-0 flex-1 text-end break-words [overflow-wrap:anywhere]'>
        {children}
      </dd>
    </div>
  );
};

export default MetaRow;
