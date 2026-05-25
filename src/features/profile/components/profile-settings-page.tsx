import SettingsForm from '@/features/profile/client/settings-form';
import { cachedGetProfile } from '@/features/profile/api/get-profile';
import getSession from '@/lib/get-session';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { Settings } from 'lucide-react';
import { FC } from 'react';
import { Separator } from '@/components/ui/separator';

type PropsType = {
  params: Promise<{ locale: string }>;
};

const ProfileSettingsPage: FC<PropsType> = async props => {
  const params = await props.params;
  const { locale } = params;

  const session = await getSession();
  const t = await getTranslations();

  const headersList = await headers();
  const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
    headers: headersList,
  });
  if (!session?.user) return notFound();

  const profileResponse = await cachedGetProfile(
    locale,
    session.user.access_token,
    request
  );
  if (!profileResponse.ok) return notFound();

  return (
    <div className='flex size-full flex-col items-start justify-start gap-6'>
      <div className='flex items-center gap-3'>
        <span className='bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl'>
          <Settings className='size-5' />
        </span>
        <div>
          <h2 className='text-primary text-2xl font-bold'>
            {t('account-settings')}
          </h2>
          <p className='text-muted-foreground text-sm'>{t('my-profile')}</p>
        </div>
      </div>
      <Separator />
      <SettingsForm
        userDetails={profileResponse.data.data}
        session={session}
      />
    </div>
  );
};

export default ProfileSettingsPage;
