'use client';

import { horizontalRailClassName } from '@/components/horizontal-rail.constants';
import { cn } from '@/lib/utils';
import {
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

export { horizontalRailClassName } from '@/components/horizontal-rail.constants';

type HorizontalRailProps = {
  children: ReactNode;
  className?: string;
  railRef?: RefObject<HTMLDivElement | null>;
};

export function HorizontalRail({
  children,
  className,
  railRef,
}: HorizontalRailProps) {
  return (
    <div ref={railRef} className={cn(horizontalRailClassName, className)}>
      {children}
    </div>
  );
}

export function useHorizontalRailControls(isRtl: boolean) {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const update = useCallback(() => {
    const el = railRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 2) {
      setCanScrollPrev(false);
      setCanScrollNext(false);
      return;
    }

    const left = Math.abs(el.scrollLeft);
    setCanScrollPrev(left > 2);
    setCanScrollNext(left < maxScroll - 2);
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    update();
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, [update]);

  const scrollPrev = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const delta = Math.round(el.clientWidth * 0.75);
    el.scrollBy({ left: (isRtl ? 1 : -1) * delta, behavior: 'smooth' });
  }, [isRtl]);

  const scrollNext = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const delta = Math.round(el.clientWidth * 0.75);
    el.scrollBy({ left: (isRtl ? -1 : 1) * delta, behavior: 'smooth' });
  }, [isRtl]);

  return {
    railRef,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
  };
}
