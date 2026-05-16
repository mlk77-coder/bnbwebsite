'use client';

import CustomBreadcrumb from '@/components/custom-breadcrumb';
import { usePathname } from '@/navigation';
import { profileLinks } from '../_constant/profile-links';
import { useTranslations } from 'next-intl';

const ProfileBreadcrumb = () => {
  const pathname = usePathname();
  const normalizedPathname = pathname.replace(/^\/(ar|en)(?=\/|$)/, '') || '/profile';
  const t = useTranslations();

  const isOrderDetail = /^\/orders\/[^/]+$/.test(normalizedPathname);
  if (isOrderDetail) {
    return (
      <CustomBreadcrumb
        activeLink={t('order-details')}
        links={[
          { name: t('my-account'), slug: '/profile' },
          { name: t('orders'), slug: '/orders' },
        ]}
      />
    );
  }

  const activeLink = profileLinks.find(link => link.href === normalizedPathname);
  if (!activeLink) return null;
  return (
    <CustomBreadcrumb
      activeLink={t(activeLink?.label) || ''}
      links={[{ name: t('my-account'), slug: '/profile' }]}
    />
  );
};

export default ProfileBreadcrumb;
