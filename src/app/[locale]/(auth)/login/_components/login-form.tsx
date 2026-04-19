"use client";

import FormInput from "@/components/form-input";
import PasswordInput from "@/components/password-input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import Image from "next/image";
import { FC, Fragment } from "react";
import useLogin from "../../hooks/use-login";
import { useTranslations } from "next-intl";
import { VerifyAccountDialog } from "../../_components/verify-account-dialog";
import { signIn } from "next-auth/react";

type PropsType = {
  hardLink?: boolean;
  userToken: string;
};

const LoginForm: FC<PropsType> = ({ hardLink = false, userToken }) => {
  const t = useTranslations();
  const {
    form,
    handleRedirect,
    onSubmit,
    isPending,
    openVerifyDialog,
    setOpenVerifyDialog,
  } = useLogin(userToken);
  return (
    <Fragment>
      <Form {...form}>
        <form
          className="w-full mt-6 space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput
            control={form.control}
            name="email"
            label={t("form.fields.email")}
          />
          <div className="flex justify-start items-start flex-col">
            <PasswordInput
              control={form.control}
              name="password"
              label={t("form.fields.password")}
            />
            <Link
              className={cn(buttonVariants({ variant: "link" }), "self-end")}
              href="/forgot-password"
            >
              {t("auth.forgot-password-link")}
            </Link>
          </div>
          <Button
            disabled={isPending}
            size="lg"
            className="w-full text-xl rounded-lg"
          >
            {t("auth.sign-in")}
          </Button>
        </form>

        <p className="w-full pt-5">
          {t("auth.dont-have-an-account")}{" "}
          {hardLink ? (
            <a
              className={cn(
                buttonVariants({ variant: "link" }),
                "text-base text-orange py-0 h-fit px-0.5"
              )}
              onClick={handleRedirect}
              href="/register"
            >
              {t("auth.sign-up")}
            </a>
          ) : (
            <Link
              className={cn(
                buttonVariants({ variant: "link" }),
                "ext-base text-orange py-0 h-fit px-0.5"
              )}
              scroll={false}
              href="/register"
              replace
            >
              {t("auth.sign-up")}
            </Link>
          )}
        </p>
        <p className="py-2 uppercase text-lg w-full text-center relative before:absolute before:top-1/2 before:left-0 before:w-full before:-z-10 before:h-[1px] before:bg-foreground">
          <span className="bg-background inline-block px-3">{t("or")}</span>
        </p>
        <div className="w-full space-y-2">
          <Button
            onClick={() => signIn("google")}
            variant="outline"
            className="w-full h-auto gap-2 py-1 rounded-xl"
          >
            <Image
              src="/google.svg"
              width={30}
              height={30}
              className="size-10"
              alt="google icon"
            />
            <span className="italic font-bold text-lg">
              {t("continue-with-google")}
            </span>
          </Button>
          <Button
            variant="outline"
            onClick={() => signIn("apple")}
            className="w-full h-auto gap-4 py-2 rounded-xl"
          >
            <Image
              src="/apple.svg"
              width={30}
              height={30}
              className="size-8"
              alt="google icon"
            />
            <span className="italic font-bold text-lg">
              {t("continue-with-apple")}
            </span>
          </Button>
        </div>
      </Form>
      <VerifyAccountDialog
        email={form.getValues("email")}
        password={form.getValues("password")}
        fromLogin
        open={openVerifyDialog}
        setOpen={setOpenVerifyDialog}
      />
    </Fragment>
  );
};

export default LoginForm;
