import getSession from "@/lib/get-session";
import { redirect } from "next/navigation";
import { Fragment } from "react";

const AuthLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return <Fragment>{children}</Fragment>;
};

export default AuthLayout;
