'use client';

import { useTranslations } from 'next-intl';

const BreadcrumbEllipsisLabel = () => {
  const t = useTranslations('accessibility');
  return <span className='sr-only'>{t('breadcrumb-more')}</span>;
};

export default BreadcrumbEllipsisLabel;
