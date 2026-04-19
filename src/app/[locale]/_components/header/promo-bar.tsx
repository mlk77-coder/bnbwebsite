import { fetcher } from "@/lib/fetcher";
import PromoSlider from "./promo-slider";
import { HomePageLinks } from "@/types/home";
import { getLocale } from "next-intl/server";

const PromoBar = async () => {
  const locale = await getLocale();
  const response = await fetcher<HomePageLinks>(`home-page-links`);
  if (!response.ok) return null;
  const links = response.data.home_page_links.links;
  if (!links) return null;
  return (
    <div className="w-full bg-gradient-to-r from-primary via-primary/95 to-primary/90 py-1.5 h-8 text-background relative z-50 text-sm font-medium overflow-hidden">
      {/* Subtle animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
      <PromoSlider links={links} locale={locale} />
    </div>
  );
};

export default PromoBar;
