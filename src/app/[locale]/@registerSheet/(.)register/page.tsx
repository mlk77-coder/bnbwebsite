import { RegisterPage, RegisterSheet } from '@/features/auth';
import { FC } from 'react';

type PropsType = {
  params: Promise<{ locale: string }>;
};

const Page: FC<PropsType> = () => {
  return (
    <RegisterSheet>
      <RegisterPage />
    </RegisterSheet>
  );
};

export default Page;
