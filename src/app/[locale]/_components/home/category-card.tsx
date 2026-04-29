import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Link } from '@/navigation';
import { HomePageCategory } from '@/types/home';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';
import { getLangDir } from 'rtl-detect';

type PropsType = {
  category: HomePageCategory;
};

const CategoryCard: FC<PropsType> = ({ category }) => {
  const locale = useLocale();
  const direction = getLangDir(locale);
  const categoryPath = `/category/${category.id}`;
  return (
    <Link dir={direction} href={categoryPath}>
      <Card className='group rounded-none border-0 p-0'>
        <CardContent className='aspect-152/187 size-full p-0'>
          <Image
            src={category.image ?? ''}
            alt={`${category.name} category image`}
            width={500}
            height={1000}
            className='size-full object-cover'
          />
        </CardContent>
        <CardFooter className='group-hover:text-orange clear-start flex-col items-start justify-start gap-1 px-0 pt-2 sm:pt-6'>
          <p className='text-sm font-bold sm:text-lg'>{category.name}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CategoryCard;
