import {
  ProductDetailPage,
  ProductPageMetaData,
} from '@/features/products';
import { Metadata } from 'next';
import { FC } from 'react';

type PropsType = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata(
  props: PropsType
): Promise<Metadata> {
  const params = await props.params;
  return ProductPageMetaData(params);
}

const Page: FC<PropsType> = async props => {
  return <ProductDetailPage params={props.params} />;
};

export default Page;
