import { AccountOrderDetailPage } from '@/features/orders';
import { FC } from 'react';

type PropsType = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

const Page: FC<PropsType> = async props => {
  return <AccountOrderDetailPage params={props.params} />;
};

export default Page;
