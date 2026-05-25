import { LoginDialog, LoginPage } from '@/features/auth';
import { cookies } from 'next/headers';
import { FC } from 'react';

type PropsType = {
  params: Promise<{ locale: string }>;
};

const Page: FC<PropsType> = async () => {
  const cookieStore = await cookies();
  const userToken = cookieStore.get('x-user-session')?.value || '';
  return (
    <LoginDialog>
      <LoginPage userToken={userToken} />
    </LoginDialog>
  );
};

export default Page;
