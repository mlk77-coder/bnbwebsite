import PageWrapper from "@/components/page-wrapper";
import SectionWrapper from "@/components/section-wrapper";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import ForgotPasswordForm from "./_components/forgot-password-form";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("auth.reset-password"),
    description: t(
      "reset-your-account-password-easily-and-securely-to-regain-access-and-continue-shopping"
    ),
    openGraph: {
      type: "website",
      title: "BNB Store",
      description: t(
        "reset-your-account-password-easily-and-securely-to-regain-access-and-continue-shopping"
      ),
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
        ar: `${process.env.NEXT_PUBLIC_LOCAL_URL}/ar/forgot-password`,
        en: `${process.env.NEXT_PUBLIC_LOCAL_URL}/en/forgot-password`,
      },
    },

    twitter: {
      card: "summary_large_image",
      title: "BNB Store",
      description: t(
        "reset-your-account-password-easily-and-securely-to-regain-access-and-continue-shopping"
      ),
      images: [`${process.env.NEXT_PUBLIC_LOCAL_URL}/logo-light.png`],
      creator: "@Ibrahim",
      site: "@Ibrahim",
    },
    icons: {
      icon: "/favicon/favicon.ico",
      apple: "/favicon/apple-touch-icon.png",
      shortcut: "/favicon/apple-touch-icon.png",
    },
    other: {
      rating: "General",
    },
  };
}

const ForgotPasswordPage = async () => {
  const t = await getTranslations();
  return (
    <PageWrapper className="flex-1">
      <SectionWrapper className="max-w-screen-lg flex-1 flex justify-center items-center">
        <div className="flex flex-col gap-2 justify-center items-center max-w-lg mx-auto">
          <Image
            src="/logo-light.png"
            priority
            width={300}
            height={300}
            className="size-20"
            alt="BNB Store logo"
          />
          <h2 className="text-3xl my-4 uppercase ltr:tracking-widest font-bold">
            {t("auth.reset-password")}
          </h2>
          <p className="max-w-lg text-center text-base">
            {t("auth.reset-password-desc")}
          </p>
          <ForgotPasswordForm />
        </div>
      </SectionWrapper>
    </PageWrapper>
  );
};

export default ForgotPasswordPage;
