import { SheetClose } from '@/components/ui/sheet';
import { Link } from '@/navigation';
import { SubCategory } from '@/types/categories';
import { FC } from 'react';

type PropsType = {
  subCategory: SubCategory | undefined;
  allCategoryLabel: string;
  newArrivalsLabel: string;
};
const SubCategoryLinks: FC<PropsType> = ({
  subCategory,
  allCategoryLabel,
  newArrivalsLabel,
}) => {
  if (!subCategory) return null;
  return (
    <div className='flex flex-col flex-wrap items-start justify-start gap-4 px-5! py-4 text-lg font-bold sm:px-8!'>
      <SheetClose asChild>
        <Link className='font-medium' href={`/category/${subCategory.id}`}>
          {allCategoryLabel}
        </Link>
      </SheetClose>
      <SheetClose asChild>
        <Link
          className='text-orange font-medium'
          href={`/new-arrivals/${subCategory.id}`}
        >
          {newArrivalsLabel}
        </Link>
      </SheetClose>
    </div>
  );
};

export default SubCategoryLinks;
