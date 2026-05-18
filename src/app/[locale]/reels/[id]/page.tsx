import { ReelDetailPage, ReelPageMetadata } from '@/features/reels';
import { Metadata } from 'next';
import { FC } from 'react';

type PropsType = {
  params: Promise<{ locale: string; id: string }>;
};

export async function generateMetadata(
  props: PropsType
): Promise<Metadata> {
  const params = await props.params;
  return ReelPageMetadata(params);
}

const Page: FC<PropsType> = async props => {
  return <ReelDetailPage params={props.params} />;
};

export default Page;
