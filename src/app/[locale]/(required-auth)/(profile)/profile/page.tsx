import { cachedGetProfile } from "@/api/profile/get-profile";
import getSession from "@/lib/get-session";
import { notFound } from "next/navigation";
import { FC } from "react";
import SettingsForm from "./_components/settings-form";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";

type PropsType = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("my-profile"),
    robots: {
      index: false,
    },
  };
}

const Page: FC<PropsType> = async props => {
  const params = await props.params;

  const {
    locale
  } = params;

  const session = await getSession();

  const headersList = await headers();
  const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
    headers: headersList,
  });
  if (!session || !session.user) return notFound();

  const profileResponse = await cachedGetProfile(
    locale,
    session.user.access_token,
    request
  );
  if (!profileResponse.ok) return notFound();

  return (
    <div className="space-y-6">
      <SettingsForm
        userDetails={profileResponse.data.data}
        session={session}
      />
    </div>
  );
};

export default Page;
