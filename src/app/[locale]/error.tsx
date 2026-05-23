'use client';

import { ErrorBoundaryFallback } from '@/components/error-boundary-fallback';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorBoundaryFallback reset={reset} />;
}
