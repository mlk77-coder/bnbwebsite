'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Category } from '@/types/categories';
import { FC, Fragment, useState } from 'react';
import MobileSubCategory from './mobile-sub-category';
import SubCategoryLinks from './sub-category-links';
import { Link, usePathname } from '@/navigation';
import { SheetClose } from '@/components/ui/sheet';

type PropsType = {
  categories: Category[];
  sales: Category[];
  labels: {
    sale: string;
    allSale: string;
    newArrivals: string;
    allCategoryById: Record<number, string>;
  };
};

const MobileCategories: FC<PropsType> = ({ categories, sales, labels }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(-1);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const pathname = usePathname();

  const selectedCategory = categories.find(
    category => category.id === selectedCategoryId
  );

  const handleClick = (id: number, name: string) => {
    if (selectedCategoryId === id) {
      setSelectedCategoryName('');
      setSelectedCategoryId(-1);
    } else {
      setSelectedCategoryId(id);
      setSelectedCategoryName(name);
    }
  };
  return (
    <Fragment>
      <div
        className={cn(
          selectedCategoryId !== -1 ? 'pb-3' : 'pb-0',
          'flex flex-wrap items-center justify-center px-5! pt-5 sm:px-8!'
        )}
      >
        <Button
          onClick={() => handleClick(0, 'sale')}
          className={cn(
            'text-foreground mb-5 h-fit px-4 py-0 text-base uppercase',
            pathname.includes('sale') ? 'text-orange' : ''
          )}
          variant='link'
        >
          {labels.sale}
        </Button>
        {categories.map(category => (
          <Button
            key={category.id}
            onClick={() => handleClick(category.id, category.name)}
            className={cn(
              'text-foreground mb-5 h-fit px-4 py-0 text-base',
              pathname.includes(String(category.id)) &&
                !pathname.includes('sale/')
                ? 'text-orange'
                : ''
            )}
            variant='link'
          >
            {category.name}
          </Button>
        ))}
      </div>
      {selectedCategoryId === 0 ? (
        <Fragment>
          <Separator />
          <div className='flex flex-col flex-wrap items-start justify-start gap-4 px-5! py-4 text-lg font-bold uppercase sm:px-8!'>
            <SheetClose asChild>
              <Link className='font-medium' href={`/sale`}>
                {labels.allSale}
              </Link>
            </SheetClose>
          </div>
          {sales.map(sale => (
            <div
              key={sale.id}
              className='flex flex-col flex-wrap items-start justify-start gap-4 px-5! py-4 text-lg font-bold uppercase sm:px-8!'
            >
              <SheetClose asChild>
                <Link className='font-medium' href={`/sale/${sale.slug}`}>
                  {sale.name}
                </Link>
              </SheetClose>
            </div>
          ))}
        </Fragment>
      ) : null}
      {selectedCategoryId !== -1 ? (
        <Fragment>
          <Separator />
          <SubCategoryLinks
            subCategory={selectedCategory}
            allCategoryLabel={
              labels.allCategoryById[selectedCategoryId] || selectedCategoryName
            }
            newArrivalsLabel={labels.newArrivals}
          />
          <MobileSubCategory
            subCategory={selectedCategory}
            mainCategorySlug={
              selectedCategory ? String(selectedCategory.id) : ''
            }
          />
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default MobileCategories;
