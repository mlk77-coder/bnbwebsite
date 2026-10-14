import PageWrapper from '@/components/page-wrapper';
import SectionWrapper from '@/components/section-wrapper';
import ProfileBreadcrumb from './_components/profile-breadcrumb';
import ProfileNavbar from './_components/profile-navbar';

const ProfileLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <PageWrapper className='from-secondary/50 bg-linear-to-b via-white to-white'>
      <SectionWrapper className='relative space-y-4 sm:space-y-6 lg:py-8!'>
        <ProfileBreadcrumb />
        <div className='grid w-full min-w-0 max-w-full gap-3 sm:gap-5 lg:grid-cols-[280px_1fr]'>
          <ProfileNavbar />
          <div className='border-primary/10 min-w-0 rounded-2xl border bg-white p-4 sm:rounded-3xl sm:p-6'>
            {children}
          </div>
        </div>
      </SectionWrapper>
    </PageWrapper>
  );
};

export default ProfileLayout;
