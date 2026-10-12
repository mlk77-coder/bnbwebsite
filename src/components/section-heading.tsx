import { cn } from '@/lib/utils';
import { Link } from '@/navigation';
import { ArrowRight } from 'lucide-react';
import { FC, ReactNode } from 'react';

type SectionHeadingProps = {
  title: string;
  description?: string;
  action?: { href: string; label: string };
  children?: ReactNode;
  className?: string;
};

export const SectionHeading: FC<SectionHeadingProps> = ({
  title,
  description,
  action,
  children,
  className,
}) => (
  <div
    className={cn(
      'mb-6 flex items-end justify-between gap-4 sm:mb-8',
      className
    )}
  >
    <div className='min-w-0 space-y-1.5'>
      <h2 className='flex items-center gap-3 text-xl font-bold tracking-wide sm:text-2xl lg:text-3xl'>
        <span className='bg-primary h-6 w-1 shrink-0 rounded-full sm:h-7' />
        {title}
      </h2>
      {description ? (
        <p className='text-muted-foreground ps-4 text-sm'>{description}</p>
      ) : null}
    </div>

    {action || children ? (
      <div className='flex shrink-0 items-center gap-3'>
        {action ? (
          <Link
            href={action.href}
            className='group/action hover:text-primary inline-flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap transition-colors'
          >
            {action.label}
            <ArrowRight className='size-4 transition-transform group-hover/action:translate-x-0.5 rtl:rotate-180 rtl:group-hover/action:-translate-x-0.5' />
          </Link>
        ) : null}
        {children}
      </div>
    ) : null}
  </div>
);

export default SectionHeading;
