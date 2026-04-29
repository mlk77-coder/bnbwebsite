import CategoryBigCard from '@/components/category-big-card';
import SectionWrapper from '@/components/section-wrapper';
import { HomePageCategory } from '@/types/home';
import { getTranslations } from 'next-intl/server';
import { FC } from 'react';

type PropsType = {
  categories: HomePageCategory[];
};

const NewArrivals: FC<PropsType> = async ({ categories }) => {
  const t = await getTranslations();
  return (
    <SectionWrapper className='space-y-4'>
      <h2 className='text-primary text-lg font-bold sm:text-xl ltr:tracking-wider'>
        {t('new-arrivals')}
      </h2>
      <p className='text-sm sm:text-base md:max-w-[75%]'>
        {t('new-arrivals-description')}
      </p>
      <div className='flex w-full flex-col items-center justify-center gap-4 overflow-hidden md:flex-row md:gap-2 lg:gap-4'>
        {categories.map(category => {
          const categoryPath = `/category/${category.id}`;

          return (
            <CategoryBigCard
              key={category.id}
              href={categoryPath}
              image={category.image ?? ''}
              name={category.name}
            />
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default NewArrivals;
