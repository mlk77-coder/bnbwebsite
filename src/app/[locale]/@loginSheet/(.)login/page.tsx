import { FC } from 'react';
import LoginDialog from './login-dialog';
import LoginPage from '../../(auth)/login/_components/login-page';
import { cookies } from 'next/headers';
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
