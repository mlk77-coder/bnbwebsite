import Image from "next/image";
import { FC } from "react";
import RegisterForm from "./register-form";
import { getTranslations } from "next-intl/server";
import { ShieldCheck } from "lucide-react";

type PropsType = {
  hardLink?: boolean;
};

const RegisterPage: FC<PropsType> = async ({ hardLink = false }) => {
  const t = await getTranslations();

  return (
    <div className="relative mx-auto max-w-lg overflow-hidden rounded-xl border border-border/50 bg-white shadow-2xl shadow-black/10">
      {/* Top gradient bar */}
      <div className="h-1.5 w-full bg-linear-to-r from-primary via-amber-300 to-primary" />

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -inset-e-20 size-52 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -inset-s-20 size-56 rounded-full bg-amber-200/25 blur-3xl" />

      <div className="relative flex w-full flex-col items-center px-6 py-8 sm:px-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/15 blur-2xl" />
            <Image
              src="/logo-light.png"
              priority
              width={300}
              height={300}
              className="relative h-auto w-[88px] object-contain drop-shadow-sm"
              alt="BNB Store logo"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {t("auth.sign-up")}
            </h1>
            <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">
              {t(
                "create-your-account-now-to-start-shopping-manage-your-orders-and-enjoy-a-personalized-and-secure-experience"
              )}
            </p>
          </div>

          {/* Security badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-medium text-primary">
            <ShieldCheck className="size-3.5" />
            {t("auth.otp-secure-signup")}
          </div>
        </div>

        {/* Form */}
        <div className="w-full">
          <RegisterForm hardLink={hardLink} />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
