'use client';

import redirectHard from '@/app/actions/redirect-hard-action';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

type PropsType = {
  hardLink: boolean;
};

const handleRedirect = async (
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) => {
  e.preventDefault();
  await redirectHard('/login');
};

const AlreadyHaveAnAccount: FC<PropsType> = ({ hardLink }) => {
  const t = useTranslations();

  return (
    <p className='text-muted-foreground pt-2 text-center text-sm'>
      {t.rich('auth.already-have-an-account', {
        login: chunks => {
          if (hardLink)
            return (
              <a
                className='text-primary font-semibold underline-offset-4 transition-colors hover:underline'
                onClick={handleRedirect}
                href='/login'
              >
                {chunks}
              </a>
            );
          return (
            <Link
              className='text-primary font-semibold underline-offset-4 transition-colors hover:underline'
              scroll={false}
              href='/login'
              replace
            >
              {chunks}
            </Link>
          );
        },
      })}
    </p>
  );
};

export default AlreadyHaveAnAccount;
