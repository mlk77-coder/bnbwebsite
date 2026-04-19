import { distributeSubCategories } from "@/lib/navbar-split-categories";
import { Link as IntlLink } from "@/navigation";
import { Category } from "@/types/categories";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useMemo } from "react";
import { getLangDir } from "rtl-detect";

type NavSubMenuProps = {
  onLinkClick: () => void;
  sales: Category[];
};

export default function SaleSubMenu({ onLinkClick, sales }: NavSubMenuProps) {
  const locale = useLocale();
  const dir = getLangDir(locale);
  const t = useTranslations();

  return (
    <div dir={dir} className="w-screen pb-6 relative h-[500px] overflow-y-auto">
      <div className="mx-auto h-full max-w-screen-2xl start-0 p-4 flex justify-between items-stretch gap-5">
        <div className="flex h-fit justify-start items-stretch gap-4 rtl:divide-x-reverse divide-x w-2/5">
          <div className="flex-1 flex-wrap ps-3 flex flex-col justify-start items-start gap-6">
            <IntlLink
              className="hover:text-[#757575] uppercase font-medium"
              href={`/sale`}
              onClick={onLinkClick}
            >
              {t("all-sale")}
            </IntlLink>
            {sales.map((sale) => (
              <IntlLink
                key={sale.id}
                className="hover:text-[#757575] uppercase font-medium"
                href={`/sale/${sale.slug}`}
                onClick={onLinkClick}
              >
                {sale.name}
              </IntlLink>
            ))}
          </div>
        </div>

       
      </div>
    </div>
  );
}
