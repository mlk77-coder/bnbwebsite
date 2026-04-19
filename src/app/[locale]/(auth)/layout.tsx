import getSession from "@/lib/get-session";
import { redirect } from "@/navigation";
import { getLocale } from "next-intl/server";
import { Fragment } from "react";

const AuthLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getSession();
  if (session) redirect({ href: "/", locale: await getLocale() });
  return <Fragment>{children}</Fragment>;
};

export default AuthLayout;
