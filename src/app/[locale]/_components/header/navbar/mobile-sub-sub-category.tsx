'use client';

import ClientLink from '@/components/client-link';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { SubCategory } from '@/types/categories';
import { ChevronDown } from 'lucide-react';
import { FC, useState } from 'react';

type PropsType = {
  subCategory: SubCategory;
  mainCategorySlug: string;
  isLast: boolean;
};

const rowLinkClass = cn(
  'flex min-h-10 flex-1 items-center rounded-xl px-2.5 py-2',
  'text-start text-sm font-medium text-gray-700 transition-colors',
  'hover:bg-white/90 hover:text-gray-900 active:bg-white'
);

const MobileSubSubCategory: FC<PropsType> = ({
  subCategory,
  mainCategorySlug,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = subCategory.subcategories.length > 0;

  return (
    <Collapsible className='w-full' open={isOpen} onOpenChange={setIsOpen}>
      <div className='flex w-full items-center gap-1'>
        <SheetClose asChild>
          <ClientLink
            activeClassName='text-primary font-semibold'
            slug={String(subCategory.id)}
            className={rowLinkClass}
            href={`/category/${mainCategorySlug}/${subCategory.id}`}
          >
            {subCategory.name}
          </ClientLink>
        </SheetClose>
        {hasChildren ? (
          <CollapsibleTrigger asChild>
            <button
              type='button'
              className={cn(
                'flex size-8 shrink-0 items-center justify-center rounded-full transition-colors',
                isOpen
                  ? 'bg-primary/15 text-primary'
                  : 'bg-black/[0.04] text-gray-500 hover:bg-black/[0.07]'
              )}
              aria-expanded={isOpen}
            >
              <span className='sr-only'>Toggle subcategories</span>
              <ChevronDown
                className={cn(
                  'size-3.5 transition-transform duration-300',
                  isOpen && 'rotate-180'
                )}
              />
            </button>
          </CollapsibleTrigger>
        ) : null}
      </div>
      {hasChildren ? (
        <CollapsibleContent>
          <div className='mb-1 flex flex-col gap-0.5 border-s border-black/10 py-1 ps-2.5'>
            {subCategory.subcategories.map(subSubCategory => (
              <SheetClose asChild key={subSubCategory.id}>
                <ClientLink
                  activeClassName='text-primary font-semibold'
                  slug={String(subSubCategory.id)}
                  className={cn(
                    rowLinkClass,
                    'py-1.5 text-[13px] text-gray-600'
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
