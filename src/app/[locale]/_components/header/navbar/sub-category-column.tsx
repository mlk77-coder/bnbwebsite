import { Link as IntlLink } from "@/navigation";
import Link from "@/components/client-link";
import { FC } from "react";
import { SubCategory } from "@/types/categories";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

type SubCategoryColumnProps = {
  column: SubCategory[];
  categorySlug: string;
  onLinkClick: () => void;
};

const SubCategoryColumn: FC<SubCategoryColumnProps> = ({
  column,
  categorySlug,
  onLinkClick,
}) => {
  return (
    <div className="space-y-5">
      {column.map((subCategory) => (
        <div
          key={subCategory.id}
          className="group"
        >
          {/* Main SubCategory Link */}
            <IntlLink
            href={`/category/${categorySlug}/${subCategory.slug}`}
            className="group/link flex items-center gap-1 text-sm font-semibold text-gray-900 hover:text-primary transition-colors duration-200 mb-2.5"
            onClick={onLinkClick}
          >
            <span className="capitalize">{subCategory.name}</span>
            <ChevronRight
              className={cn(
                "w-3.5 h-3.5 opacity-0 transition-all duration-200",
                "ltr:-translate-x-1 ltr:group-hover/link:translate-x-0",
                "rtl:translate-x-1 rtl:group-hover/link:translate-x-0 rtl:rotate-180",
                "group-hover/link:opacity-100"
              )}
            />
          </IntlLink>

          {/* Sub-sub categories */}
          {subCategory.sub_categories.length > 0 && (
            <ul className="space-y-1.5 border-s-2 border-gray-100 ps-3 group-hover:border-primary/20 transition-colors duration-300">
              {subCategory.sub_categories.slice(0, 5).map((subSubCategory) => (
                <li key={subSubCategory.id}>
                  <Link
                    slug={subSubCategory.slug}
                    activeClassName="text-primary font-medium"
                    href={`/category/${categorySlug}/${subCategory.slug}/${subSubCategory.slug}`}
                    className={cn(
                      "block text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200",
                      "relative ps-0 hover:ps-2 transition-all duration-200",
                      "before:absolute before:start-0 before:top-1/2 before:-translate-y-1/2",
                      "before:w-1 before:h-1 before:rounded-full before:bg-gray-300",
                      "hover:before:bg-primary"
                    )}
                    onClick={onLinkClick}
                  >
                    <span className="capitalize ps-3">{subSubCategory.name}</span>
                  </Link>
                </li>
              ))}
              {subCategory.sub_categories.length > 5 && (
                <li>
                  <IntlLink
                    href={`/category/${categorySlug}/${subCategory.slug}`}
                    className="text-xs text-primary hover:text-primary/80 font-medium ps-3"
                    onClick={onLinkClick}
                  >
                    +{subCategory.sub_categories.length - 5} more
                  </IntlLink>
                </li>
              )}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default SubCategoryColumn;

