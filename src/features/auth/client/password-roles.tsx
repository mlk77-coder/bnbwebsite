'use client';

import { Dot } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { Fragment } from 'react';

const PasswordRoles = () => {
  const t = useTranslations();
  return (
    <Fragment>
      <p className='flex justify-start items-center gap-0'>
        <Dot /> {t('auth.password-roles.1')}
      </p>
      <p className='flex justify-start items-center gap-0'>
        <Dot /> {t('auth.password-roles.2')}
      </p>
      <p className='flex justify-start items-center gap-0'>
        <Dot /> {t('auth.password-roles.3')}
      </p>
      <p className='flex justify-start items-center gap-0'>
        <Dot /> {t('auth.password-roles.4')}
      </p>
    </Fragment>
  );
};

export default PasswordRoles;
