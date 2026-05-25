'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Loader from '@/components/ui/loader';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ComponentProps, FC, ReactNode } from 'react';

export type ConfirmationIconTone = 'destructive' | 'warning' | 'primary';

const iconToneClassName: Record<ConfirmationIconTone, string> = {
  destructive: 'bg-red-100 text-red-600',
  warning: 'bg-orange-100 text-orange-600',
  primary: 'bg-primary/10 text-primary',
};

type ConfirmVariant = NonNullable<ComponentProps<typeof Button>['variant']>;

export type ConfirmationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  icon: LucideIcon;
  iconTone?: ConfirmationIconTone;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  isPending?: boolean;
  confirmVariant?: ConfirmVariant;
  trigger?: ReactNode;
  children?: ReactNode;
};

const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  icon: Icon,
  iconTone = 'destructive',
  confirmLabel,
  cancelLabel,
  onConfirm,
  isPending = false,
  confirmVariant = 'destructive',
  trigger,
  children,
}) => {
  const t = useTranslations();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent className='overflow-hidden'>
        <DialogHeader className='flex! flex-row items-center gap-4 px-0!'>
          <div
            className={cn(
              'mt-1 flex size-10 shrink-0 items-center justify-center rounded-lg',
              iconToneClassName[iconTone]
            )}
          >
            <Icon className='size-4.5' />
          </div>
          <div className='min-w-0'>
            <DialogTitle className='text-start text-xl'>{title}</DialogTitle>
            {description ? (
              <DialogDescription className='text-start'>
                {description}
              </DialogDescription>
            ) : null}
          </div>
        </DialogHeader>
        {children}
        <DialogFooter className='gap-2'>
          <Button
            type='button'
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className='rounded-lg'
          >
            {cancelLabel ?? t('global.cancel')}
          </Button>
          <Button
            type='button'
            variant={confirmVariant}
            onClick={onConfirm}
            disabled={isPending}
            className='gap-2 rounded-lg'
          >
            {isPending ? <Loader size='xs' /> : null}
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
