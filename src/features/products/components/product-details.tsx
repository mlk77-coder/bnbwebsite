import { Separator } from '@/components/ui/separator';
import { getTranslations } from 'next-intl/server';
import { FC } from 'react';

type PropsType = {
  details: Record<string, string>;
};
const ProductDetails: FC<PropsType> = async ({ details }) => {
  const t = await getTranslations();
  if (details === null) return null;
  return (
    <div className='w-full space-y-4'>
      <h3 className='font-bold text-primary text-lg max-md:hidden'>
        {t('product-details')}
      </h3>
      <Separator className='max-md:hidden' />
      <div className='flex flex-col justify-start items-start gap-5'>
        {Object.entries(details).map(([key, value], index) => (
          <p
            key={index}
            className='w-full flex justify-between items-start gap-3'
          >
            <span>{key}:</span>
            <span className='text-end'>{value}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
