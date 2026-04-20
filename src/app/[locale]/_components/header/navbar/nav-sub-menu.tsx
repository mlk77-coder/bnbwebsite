import { Link as IntlLink } from "@/navigation";
import { Category } from "@/types/categories";
import Image from "next/image";
import { FC, useMemo } from "react";
import SubCategoryColumn from "./sub-category-column";
import { distributeSubCategories } from "@/lib/navbar-split-categories";
import { useLocale, useTranslations } from "next-intl";
import { getLangDir } from "rtl-detect";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles, Grid3X3, ChevronRight } from "lucide-react";

type NavSubMenuProps = {
  category: Category;
  onLinkClick: () => void;
};

const NavSubMenu: FC<NavSubMenuProps> = ({ category, onLinkClick }) => {
  const t = useTranslations();
  const locale = useLocale();
  const dir = getLangDir(locale);
  const isRTL = dir === "rtl";
  const columns = useMemo(
    () => distributeSubCategories(category.sub_categories, 3),
    [category.sub_categories]
  );

  return (
    <div
      dir={dir}
      className="w-screen bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-2xl shadow-gray-200/50"
    >
      <div className="mx-auto max-w-screen-2xl p-6 lg:p-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Grid3X3 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{category.name}</h2>
              <p className="text-sm text-gray-500">{t("explore-category")}</p>
            </div>
          </div>
          <IntlLink
            href={`/category/${category.slug}`}
            onClick={onLinkClick}
            className={cn(
              "group flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg",
              "hover:bg-gray-800 transition-all duration-300 text-sm font-medium"
            )}
          >
            {t("view-all-products")}
            <ChevronRight className={cn(
              "w-4 h-4 transition-transform duration-300",
              isRTL ? "group-hover:-translate-x-1 rotate-180" : "group-hover:translate-x-1"
            )} />
          </IntlLink>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Quick Links Sidebar */}
          <div className="col-span-12 lg:col-span-2 space-y-3">
            <IntlLink
              href={`/category/${category.slug}`}
              onClick={onLinkClick}
              className="group flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200"
            >
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Grid3X3 className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {t("all-products")}
              </span>
            </IntlLink>
            <IntlLink
              href={`/new-arrivals/${category.slug}`}
              onClick={onLinkClick}
              className="group flex items-center gap-3 p-3 rounded-xl hover:bg-amber-50 transition-all duration-200"
            >
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                <Sparkles className="w-4 h-4 text-amber-600" />
              </div>
              <span className="text-sm font-medium text-amber-700">
                {t("new-arrivals")}
              </span>
            </IntlLink>
          </div>

          {/* Categories Grid */}
          <div className="col-span-12 lg:col-span-7">
            <div className={cn(
              "grid gap-6",
              columns.length === 1 ? "grid-cols-1" :
              columns.length === 2 ? "grid-cols-2" : "grid-cols-3"
            )}>
              {columns.map((column, index) => (
                <SubCategoryColumn
                  key={index}
                  column={column}
                  categorySlug={category.slug}
                  onLinkClick={onLinkClick}
                />
              ))}
            </div>
          </div>

          {/* Featured Image Card */}
          <div className="col-span-12 lg:col-span-3">
            <IntlLink
              href={`/category/${category.slug}`}
              onClick={onLinkClick}
              className="group block relative overflow-hidden rounded-2xl aspect-[4/5] lg:aspect-auto lg:h-full min-h-[280px]"
            >
              {category.image ? (
                <Image
                  src={category.image}
                  alt={`${category.name} featured`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40" />
              )}
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-white/80 text-sm font-medium mb-1">{t("featured-collection")}</p>
                <h3 className="text-white text-xl font-bold mb-3">{category.name}</h3>
                <span className={cn(
                  "inline-flex items-center gap-2 text-white text-sm font-medium",
                  "group-hover:gap-3 transition-all duration-300"
                )}>
                  {t("shop-now")}
                  <ArrowRight className={cn(
                    "w-4 h-4",
                    isRTL && "rotate-180"
                  )} />
                </span>
              </div>
            </IntlLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavSubMenu;

