import RecentlyViewed from "@/app/[locale]/_components/recently-viewed";
import PageWrapper from "@/components/page-wrapper";
import SectionWrapper, {
  sectionWrapperClassName,
} from "@/components/section-wrapper";
import ContactUsForm from "@/features/contact-us/client/contact-us-form";
import getSession from "@/lib/get-session";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { FC } from "react";

const ContactUsPage: FC = async () => {
  const cookieStore = await cookies();
  const session = await getSession();
  const userToken = cookieStore.get("x-user-session")?.value || "";
  const isLoggedIn = Boolean(session && session.user);
  const t = await getTranslations();
  return (
    <PageWrapper>
      <SectionWrapper className="max-w-screen-xl space-y-8">
        <h1 className="text-center text-3xl font-bold">
          {t("contact-us.title")}
        </h1>
        <ContactUsForm session={session} />
      </SectionWrapper>
      <RecentlyViewed
        className={cn(sectionWrapperClassName)}
        isLoggedIn={isLoggedIn}
        token={session && session.user ? session.user.access_token : userToken}
      />
    </PageWrapper>
  );
};

export default ContactUsPage;
