'use client';

import { GenericPageSkeleton } from '@/components/skeletons/page-skeletons';
// Imported by path: the feature index also exports server-only code.
import { HomeSkeleton } from '@/features/home/components/home-skeleton';
import { usePathname } from '@/navigation';

/** Fallback for every route without its own `loading.tsx`. */
const Loading = () => {
  const isHome = usePathname() === '/';
  return isHome ? <HomeSkeleton /> : <GenericPageSkeleton />;
};

export default Loading;
