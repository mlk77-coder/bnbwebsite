import { SheetClose } from '@/components/ui/sheet';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';
import { SubCategory } from '@/types/categories';
import { Sparkles } from 'lucide-react';
import { FC } from 'react';

type PropsType = {
  subCategory: SubCategory | undefined;
  allCategoryLabel: string;
  newArrivalsLabel: string;
};

const linkClass = cn(
  'flex w-full min-h-11 items-center gap-2 rounded-lg px-3 py-2.5',
  'text-start text-sm font-medium text-gray-800 transition-colors',
  'hover:bg-white/80 active:bg-white'
);

const SubCategoryLinks: FC<PropsType> = ({
  subCategory,
  allCategoryLabel,
  newArrivalsLabel,
}) => {
  if (!subCategory) return null;
  return (
    <div className="flex flex-col gap-0.5">
      <SheetClose asChild>
        <Link className={linkClass} href={`/category/${subCategory.id}`}>
          {allCategoryLabel}
        </Link>
      </SheetClose>
      <SheetClose asChild>
        <Link
          className={cn(linkClass, 'text-orange')}
          href={`/new-arrivals/${subCategory.id}`}
        >
          <Sparkles className="size-4 shrink-0 text-amber-500" aria-hidden />
          {newArrivalsLabel}
        </Link>
      </SheetClose>
    </div>
  );
};

export default SubCategoryLinks;
