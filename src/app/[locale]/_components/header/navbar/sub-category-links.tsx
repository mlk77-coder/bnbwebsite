import { SheetClose } from '@/components/ui/sheet';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';
import { SubCategory } from '@/types/categories';
import { Sparkles } from 'lucide-react';
import { FC } from 'react';

type PropsType = {
  subCategory: SubCategory | undefined;
  newArrivalsLabel: string;
};

const linkClass = cn(
  'flex w-full min-h-10 items-center gap-2.5 rounded-xl px-2.5 py-2',
  'text-start text-sm font-medium text-gray-700 transition-colors',
  'hover:bg-white/90 hover:text-gray-900 active:bg-white'
);

const SubCategoryLinks: FC<PropsType> = ({
  subCategory,
  newArrivalsLabel,
}) => {
  if (!subCategory) return null;
  return (
    <div className='mb-1 flex flex-col gap-0.5'>
      <SheetClose asChild>
        <Link
          className={cn(linkClass, 'text-amber-700')}
          href={`/new-arrivals/${subCategory.id}`}
        >
          <Sparkles className='size-3.5 shrink-0 text-amber-500' aria-hidden />
          {newArrivalsLabel}
        </Link>
      </SheetClose>
    </div>
  );
};

export default SubCategoryLinks;
