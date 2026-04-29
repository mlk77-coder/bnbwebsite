import { Link as IntlLink } from '@/navigation';
import Link from '@/components/client-link';
import { FC } from 'react';
import { SubCategory } from '@/types/categories';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

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
    <div className='space-y-5'>
      {column.map(subCategory => (
        <div key={subCategory.id} className='group'>
          {/* Main SubCategory Link */}
          <IntlLink
            href={`/category/${categorySlug}/${subCategory.id}`}
            className='group/link hover:text-primary mb-2.5 flex items-center gap-1 text-sm font-semibold text-gray-900 transition-colors duration-200'
            onClick={onLinkClick}
          >
            <span className='capitalize'>{subCategory.name}</span>
            <ChevronRight
              className={cn(
                'h-3.5 w-3.5 opacity-0 transition-all duration-200',
                'ltr:-translate-x-1 ltr:group-hover/link:translate-x-0',
                'rtl:translate-x-1 rtl:rotate-180 rtl:group-hover/link:translate-x-0',
                'group-hover/link:opacity-100'
              )}
            />
          </IntlLink>

          {/* Sub-sub categories */}
          {subCategory.subcategories.length > 0 && (
            <ul className='group-hover:border-primary/20 space-y-1.5 border-s-2 border-gray-100 ps-3 transition-colors duration-300'>
              {subCategory.subcategories.slice(0, 5).map(subSubCategory => (
                <li key={subSubCategory.id}>
                  <Link
                    slug={String(subSubCategory.id)}
                    activeClassName='text-primary font-medium'
                    href={`/category/${categorySlug}/${subCategory.id}/${subSubCategory.id}`}
                    className={cn(
                      'block text-sm text-gray-500 transition-colors duration-200 hover:text-gray-700',
                      'relative ps-0 transition-all duration-200 hover:ps-2',
                      'before:absolute before:inset-s-0 before:top-1/2 before:-translate-y-1/2',
                      'before:h-1 before:w-1 before:rounded-full before:bg-gray-300',
                      'hover:before:bg-primary'
                    )}
                    onClick={onLinkClick}
                  >
                    <span className='ps-3 capitalize'>
                      {subSubCategory.name}
                    </span>
                  </Link>
                </li>
              ))}
              {subCategory.subcategories.length > 5 && (
                <li>
                  <IntlLink
                    href={`/category/${categorySlug}/${subCategory.id}`}
                    className='text-primary hover:text-primary/80 ps-3 text-xs font-medium'
                    onClick={onLinkClick}
                  >
                    +{subCategory.subcategories.length - 5} more
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
