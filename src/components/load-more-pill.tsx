'use client';

import { Link } from '@/navigation';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';

export { loadMorePillRowClassName } from '@/components/load-more-pill.constants';

const pillClassName = cn(
  'group border-border/80 inline-flex items-center gap-3 rounded-xl border',
  'bg-background/80 px-6 py-3 shadow-sm backdrop-blur-sm',
  'text-foreground text-[11px] font-semibold tracking-[0.2em] uppercase',
  'transition-[box-shadow,border-color,background-color,transform] duration-300',
  'hover:border-primary/50 hover:bg-primary/5 hover:shadow-primary/15 hover:shadow-md',
  'hover:scale-[1.02] active:scale-[0.98]',
  'disabled:pointer-events-none disabled:opacity-50'
);

const iconWrapClassName = cn(
  'flex size-8 items-center justify-center rounded-xl',
  'bg-foreground/6 text-foreground transition-all duration-300',
  'group-hover:bg-primary group-hover:text-primary-foreground',
  'group-hover:shadow-sm'
);

const arrowClassName = cn(
  'size-3.5 transition-transform duration-300',
  'group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5'
);

type BaseProps = {
  label: ReactNode;
  className?: string;
};

export type LoadMorePillLinkProps = BaseProps &
  { href: string } & Omit<ComponentProps<typeof Link>, 'className' | 'children' | 'href'>;

export type LoadMorePillButtonProps = BaseProps &
  Omit<ComponentProps<'button'>, 'className' | 'children'>;

export type LoadMorePillProps = LoadMorePillLinkProps | LoadMorePillButtonProps;

export function LoadMorePill(props: LoadMorePillProps) {
  const trailing = (
    <span className={iconWrapClassName}>
      <ArrowRight className={arrowClassName} />
    </span>
  );

  if ('href' in props) {
    const { label: linkLabel, className: linkClassName, href, ...linkProps } =
      props;
    return (
      <Link
        href={href}
        className={cn(pillClassName, linkClassName)}
        {...linkProps}
      >
        <span>{linkLabel}</span>
        {trailing}
      </Link>
    );
  }

  const {
    label: buttonLabel,
    className: buttonClassName,
    type = 'button',
    ...buttonProps
  } = props;
  return (
    <button
      type={type}
      className={cn(pillClassName, buttonClassName)}
      {...buttonProps}
    >
      <span>{buttonLabel}</span>
      {trailing}
    </button>
  );
}
