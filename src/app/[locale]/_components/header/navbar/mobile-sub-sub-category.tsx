import ClientLink from '@/components/client-link';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { SubCategory } from '@/types/categories';
import { Minus, Plus } from 'lucide-react';
import { FC, useState } from 'react';

type PropsType = {
  subCategory: SubCategory;
  mainCategorySlug: string;
  isLast: boolean;
};

const rowLinkClass = cn(
  'flex w-full min-h-11 flex-1 items-center rounded-lg px-3 py-2.5',
  'text-start text-sm font-medium text-gray-800 transition-colors',
  'hover:bg-white/80 active:bg-white'
);

const MobileSubSubCategory: FC<PropsType> = ({
  subCategory,
  mainCategorySlug,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = subCategory.subcategories.length > 0;

  return (
    <Collapsible
      className="w-full"
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <div className="flex w-full items-center gap-1">
        <SheetClose asChild>
          <ClientLink
            activeClassName="text-orange font-semibold"
            slug={String(subCategory.id)}
            className={cn(rowLinkClass, isOpen && 'pb-1')}
            href={`/category/${mainCategorySlug}/${subCategory.id}`}
          >
            {subCategory.name}
          </ClientLink>
        </SheetClose>
        {hasChildren ? (
          <CollapsibleTrigger asChild>
            <Button
              className="size-8 shrink-0 rounded-lg border-gray-200"
              variant="outline"
              size="icon"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Toggle subcategories</span>
              {isOpen ? (
                <Minus className="size-4" />
              ) : (
                <Plus className="size-4" />
              )}
            </Button>
          </CollapsibleTrigger>
        ) : null}
      </div>
      {hasChildren ? (
        <CollapsibleContent>
          <div
            className={cn(
              'mb-1 flex flex-col gap-0.5 border-gray-200/80 py-1',
              'border-s ps-2'
            )}
          >
            {subCategory.subcategories.map(subSubCategory => (
              <SheetClose asChild key={subSubCategory.id}>
                <ClientLink
                  activeClassName="text-orange font-semibold"
                  slug={String(subSubCategory.id)}
                  className={cn(
                    rowLinkClass,
                    'py-2 text-sm text-gray-600 hover:text-gray-900'
                  )}
                  href={`/category/${mainCategorySlug}/${subCategory.id}/${subSubCategory.id}`}
                >
                  {subSubCategory.name}
                </ClientLink>
              </SheetClose>
            ))}
          </div>
        </CollapsibleContent>
      ) : null}
    </Collapsible>
  );
};

export default MobileSubSubCategory;
