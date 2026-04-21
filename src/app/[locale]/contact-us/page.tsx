import PageWrapper from "@/components/page-wrapper";
import SectionWrapper, {
  sectionWrapperClassName,
} from "@/components/section-wrapper";
import ContactUsForm from "./_components/contact-us-form";
import getSession from "@/lib/get-session";
import { getTranslations } from "next-intl/server";
import RecentlyViewed from "../_components/recently-viewed";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("contact-us.title"),
    description: t("contact-us-description"),
    openGraph: {
      type: "website",
      title: "BNB Store",
      description: t("contact-us-description"),
      siteName: "BNB Store",
      locale: "en",
      url: process.env.NEXT_PUBLIC_LOCAL_URL,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_LOCAL_URL}/og.png`,
          width: 1200,
          height: 630,
          alt: "BNB Store Logo",
        },
      ],
    },
    alternates: {
      canonical: process.env.NEXT_PUBLIC_LOCAL_URL,
      languages: {
        ar: `${process.env.NEXT_PUBLIC_LOCAL_URL}/ar/contact-us`,
        en: `${process.env.NEXT_PUBLIC_LOCAL_URL}/en/contact-us`,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: "BNB Store",
      description: t("contact-us-description"),
      images: [`${process.env.NEXT_PUBLIC_LOCAL_URL}/logo-light.png`],
      creator: "@Ibrahim",
      site: "@Ibrahim",
    },
  };
}

const ContactPage = async () => {
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

export default ContactPage;
