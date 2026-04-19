import redirectHard from "@/app/actions/redirect-hard-action";
import getSession from "@/lib/get-session";
import { Fragment } from "react";

const AuthLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getSession();

  if (!session) await redirectHard("/login");
  return <Fragment>{children}</Fragment>;
};

export default AuthLayout;
