import { FC } from "react";
import RegisterSheet from "./register-sheet";
import RegisterPage from "../../(auth)/register/_components/register-page";

type PropsType = {
  params: Promise<{ locale: string }>;
};

const Page: FC<PropsType> = () => {
  return (
    <RegisterSheet>
      <RegisterPage />
    </RegisterSheet>
  );
};

export default Page;
