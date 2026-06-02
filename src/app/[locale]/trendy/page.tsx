import { ProductCollectionPage } from '@/features/product-collections';
import { getTranslations } from 'next-intl/server';
import { FC } from 'react';

type PropsType = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata() {
  const t = await getTranslations();
  return { title: t('Trendy') };
}

const Page: FC<PropsType> = async props => {
  return (
    <ProductCollectionPage
      params={props.params}
      collection='featured'
      titleKey='Trendy'
      descriptionKey='Trendy-d'
    />
  );
};

export default Page;
