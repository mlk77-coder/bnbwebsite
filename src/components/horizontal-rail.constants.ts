/**
 * Native horizontal rail used on the home page (same bleed/snap as hero panels).
 * Negative margins cancel `SectionWrapper` padding so the track scrolls edge-to-edge.
 */
export const horizontalRailClassName = [
  'scrollbar-hide flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain pb-1',
  '-mx-2.5 scroll-px-2.5 gap-3 px-2.5',
  'md:-mx-4 md:scroll-px-4 md:gap-4 md:px-4',
  'lg:-mx-6 lg:scroll-px-6 lg:gap-5 lg:px-6',
  'xl:-mx-24 xl:scroll-px-24 xl:px-24',
].join(' ');
