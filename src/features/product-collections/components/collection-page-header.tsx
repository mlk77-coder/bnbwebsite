'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = {
  title: string;
  description?: string;
  className?: string;
};

export function CollectionPageHeader({ title, description, className }: Props) {
  return (
    <div className={cn('w-full space-y-1', className)}>
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className='text-foreground text-lg font-bold tracking-wide sm:text-xl lg:text-2xl'
      >
        {title}
      </motion.h1>
      {description ? (
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className='text-muted-foreground max-w-3xl text-xs sm:text-sm'
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
