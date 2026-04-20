'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, LayoutGrid } from 'lucide-react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { HomePageCategory } from '@/types/home';

const IMAGE_FALLBACK =
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80';

function categoryHref(category: HomePageCategory): string {
  if (category.parents_slugs.length > 0) {
    return `/category/${[...category.parents_slugs].reverse().join('/')}`;
  }
  return `/category/${category.slug}`;
}

export type OurCollectionsCardProps = {
  categories: HomePageCategory[];
};

export function OurCollectionsCard({ categories }: OurCollectionsCardProps) {
  const t = useTranslations();
  const slice = categories.slice(0, 4);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className={cn(
        'border-border bg-card flex h-full flex-col border p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6'
      )}
    >
      <div className='mb-4 flex gap-3.5'>
        <div
          className='flex size-11 shrink-0 items-center justify-center rounded-2xl bg-neutral-100'
          aria-hidden
        >
          <LayoutGrid
            className='size-[22px] text-neutral-800'
            strokeWidth={1.5}
          />
        </div>
        <div className='min-w-0 flex-1 pt-0.5'>
          <h3 className='text-[1.35rem] leading-tight font-bold tracking-tight text-neutral-900 sm:text-xl'>
            {t('hero-our-collections')}
          </h3>
          <p className='text-primary mt-2 text-[10px] font-semibold tracking-[0.28em] uppercase sm:text-[11px]'>
            {t('hero-our-collections-tag')}
          </p>
        </div>
      </div>

      {slice.length === 0 ? (
        <p className='text-muted-foreground flex-1 text-sm'>
          {t('hero-our-collections-empty')}
        </p>
      ) : (
        <div className='grid flex-1 grid-cols-2 gap-2.5 sm:gap-3'>
          {slice.map(category => (
            <Link
              key={category.id}
              href={categoryHref(category)}
              className='group relative aspect-square overflow-hidden rounded-xl ring-1 ring-black/6 transition-[box-shadow,transform] duration-300 hover:shadow-md hover:ring-black/10'
            >
              <Image
                src={category.image || IMAGE_FALLBACK}
                alt={category.name}
                fill
                className='object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]'
                sizes='(max-width: 768px) 50vw, 200px'
              />
              <div className='absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent' />
              <div className='absolute inset-x-0 bottom-0 px-2.5 pt-8 pb-2.5 sm:px-3 sm:pb-3'>
                <p className='line-clamp-2 text-start text-[11px] leading-snug font-medium text-white/95 sm:text-xs'>
                  {category.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <Link
        href='/#explore-categories'
        className='group/link hover:text-primary mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-700 underline-offset-4 transition-colors'
      >
        {t('hero-view-all-categories')}

        <ArrowRight className='size-3.5 opacity-70 transition-transform group-hover/link:translate-x-0.5 rtl:rotate-180' />
      </Link>
    </motion.div>
  );
}
