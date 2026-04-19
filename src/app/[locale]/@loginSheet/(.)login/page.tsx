import { FC } from "react";
import LoginSheet from "./login-sheet";
import LoginPage from "../../(auth)/login/_components/login-page";
import { cookies } from "next/headers";
type PropsType = {
  params: Promise<{ locale: string }>;
};

const Page: FC<PropsType> = async () => {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("x-user-session")?.value || "";
  return (
    <LoginSheet>
      <LoginPage userToken={userToken} />
    </LoginSheet>
  );
};

export default Page;
