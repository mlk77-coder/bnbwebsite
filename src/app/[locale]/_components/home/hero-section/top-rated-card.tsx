'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import type { ProductCard } from '@/types/products';

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=90';

export type TopRatedCardProps = {
  product: ProductCard | null;
};

export function TopRatedCard({ product }: TopRatedCardProps) {
  const t = useTranslations();
  const image = product?.image || FALLBACK_IMG;
  const name = product?.name ?? '—';
  const href = product ? `/product/${product.slug}` : '/';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-card border border-border p-5 sm:p-6 h-full flex flex-col shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-center gap-2 mb-4">
        <Star className="w-5 h-5 text-primary fill-primary" />
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-sans">{t('hero-top-rated-for-you')}</h3>
      </div>

      <Link href={href} className="relative flex-1 min-h-[180px] sm:min-h-[220px] rounded-xl overflow-hidden group block">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 320px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
          <Star className="w-3 h-3 text-primary fill-primary" />
          <span className="text-xs font-bold text-gray-900">4.9</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-white font-semibold text-sm sm:text-base drop-shadow-lg line-clamp-2">{name}</p>
          {product?.price ? (
            <p className="text-white/80 text-xs sm:text-sm mt-1 drop-shadow">{product.price}</p>
          ) : null}
        </div>
      </Link>

      <div className="mt-4 flex items-center justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500">{t('hero-starting-from')}</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{product?.price ?? '—'}</p>
        </div>
        <Link
          href={href}
          className="group/link inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors shrink-0"
        >
          {t('shop-now')}
          <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform rtl:rotate-180" />
        </Link>
      </div>
    </motion.div>
  );
}
