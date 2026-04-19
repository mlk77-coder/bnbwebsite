import Image from "next/image";
import { FC } from "react";
import LoginForm from "./login-form";
import { useTranslations } from "next-intl";

type PropsType = {
  hardLink?: boolean;
  userToken: string;
};

const LoginPage: FC<PropsType> = ({ hardLink = false, userToken }) => {
  const t = useTranslations();
  return (
    <div className="flex flex-col gap-2 justify-center items-center max-w-lg mx-auto">
      <Image
        src="/logo-light.png"
        priority
        width={150}
        height={150}
        // className="size-20"
        alt="BNB Store logo"
      />

      <h2 className="text-4xl font-bold">{t("auth.sign-in")}</h2>
      <p className="max-w-md text-center">
        {t('sign-in-to-your-account-to-manage-your-orders-and-continue-shopping')}
      </p>
      <LoginForm hardLink={hardLink} userToken={userToken} />
    </div>
  );
};

export default LoginPage;
