import PageWrapper from "@/components/page-wrapper";
import SectionWrapper from "@/components/section-wrapper";
import { Separator } from "@/components/ui/separator";
import ProfileBreadcrumb from "./_components/profile-breadcrumb";
import ProfileNavbar from "./_components/profile-navbar";
import { getTranslations } from "next-intl/server";

const ProfileLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const t = await getTranslations();
  return (
    <PageWrapper>
      <SectionWrapper className="space-y-4">
        <ProfileBreadcrumb />
        <h1 className="text-4xl !mt-10">{t('my-account')}</h1>
        <Separator />
        <div className="w-full lg:grid lg:grid-cols-12">
          <ProfileNavbar />
          <Separator className="lg:hidden" />
          <div className="lg:col-span-10 max-lg:mt-5">{children}</div>
        </div>
      </SectionWrapper>
    </PageWrapper>
  );
};

export default ProfileLayout;
