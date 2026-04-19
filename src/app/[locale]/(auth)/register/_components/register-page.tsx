import Image from "next/image";
import { FC, Fragment } from "react";
import RegisterForm from "./register-form";
import { getTranslations } from "next-intl/server";

type PropsType = {
  hardLink?: boolean;
};

const RegisterPage: FC<PropsType> = async ({ hardLink = false }) => {
  const t = await getTranslations();
  return (
    <Fragment>
      <div className="flex flex-col gap-2 justify-center items-center max-w-lg mx-auto">
        <Image
          src="/logo-light.png"
          priority
          width={300}
          height={300}
          className="size-20"
          alt="BNB Store logo"
        />

        <h2 className="text-4xl uppercase font-bold">{t("auth.sign-up")}</h2>
        <p className="max-w-md text-center">
          {t(
            "create-your-account-now-to-start-shopping-manage-your-orders-and-enjoy-a-personalized-and-secure-experience"
          )}
        </p>
        <RegisterForm hardLink={hardLink} />
      </div>
    </Fragment>
  );
};

export default RegisterPage;
