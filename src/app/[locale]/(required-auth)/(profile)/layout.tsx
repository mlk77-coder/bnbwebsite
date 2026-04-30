import PageWrapper from '@/components/page-wrapper';
import SectionWrapper from '@/components/section-wrapper';
import { getTranslations } from 'next-intl/server';
import ProfileBreadcrumb from './_components/profile-breadcrumb';
import ProfileNavbar from './_components/profile-navbar';

const ProfileLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const t = await getTranslations();
  return (
    <PageWrapper className='from-secondary/50 bg-linear-to-b via-white to-white'>
      <SectionWrapper className='space-y-6'>
        <ProfileBreadcrumb />
        <div className='grid w-full gap-5 lg:grid-cols-[280px_1fr]'>
          <ProfileNavbar />
          <div className='border-primary/10 shadow-primary/5 min-w-0 rounded-3xl border bg-white p-4 shadow-xl sm:p-6'>
            {children}
          </div>
        </div>
      </SectionWrapper>
    </PageWrapper>
  );
};

export default ProfileLayout;
