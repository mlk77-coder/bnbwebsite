/** Page size for featured products on the home page (initial SSR load + each “load more”). */
export const FEATURED_PRODUCTS_PER_PAGE = 20;

/** On-sale products fetched for the home page; the hero "sale" card shows the first few, the deals rail shows all. */
export const HOME_DEALS_LIMIT = 12;

/** Vertical rhythm between home sections: space above each one, none below (so gaps never stack). */
export const HOME_SECTION_SPACING = 'pt-10 pb-0 md:pt-14 md:pb-0 lg:pt-16 lg:pb-0';

/** Extra breathing room under the last home section, before the footer. */
export const HOME_LAST_SECTION_SPACING = 'pb-12 md:pb-16 lg:pb-20';
