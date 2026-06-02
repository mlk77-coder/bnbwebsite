import { ProductCollectionPage } from '@/features/product-collections';
import { FC } from 'react';

type PropsType = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<Record<string, string>>;
};

const SaleRootPage: FC<PropsType> = async props => {
  await props.searchParams;
  const params = await props.params;
  const { locale } = params;

  return (
    <ProductCollectionPage
      params={Promise.resolve({ locale })}
      collection='on-sale'
      titleKey='sale'
      descriptionKey='sale-description'
      listParams={{ sort_by: 'discount' }}
    />
  );
};

export default SaleRootPage;
