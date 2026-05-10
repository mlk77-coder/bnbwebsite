import getCart from "@/features/cart/api/get-cart";
import CheckoutForm from "@/features/checkout/client/checkout-form";
import CheckoutFormProvider from "@/features/checkout/client/checkout-form-provider";
import CheckoutSummary from "@/features/checkout/components/checkout-summary";
import NotFoundUi from "@/components/not-found-ui";
import PageWrapper from "@/components/page-wrapper";
import SectionWrapper from "@/components/section-wrapper";
import getSession from "@/lib/get-session";
import { getTranslations } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { FC } from "react";

type PropsType = {
  params: Promise<{ locale: string }>;
};

const CheckoutPage: FC<PropsType> = async (props) => {
  const params = await props.params;

  const { locale } = params;

  try {
    const cookieStore = await cookies();
    const session = await getSession();
    const t = await getTranslations();
    const user_token = cookieStore.get("x-user-session")?.value || "";
    const isLoggedIn = Boolean(session && session.user);
    const token = isLoggedIn ? session?.user?.access_token || "" : user_token;
    const headersList = await headers();
    const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
      headers: headersList,
    });
    const response = await getCart(token, locale, isLoggedIn, request);

    if (!response.ok) return <>error</>;
    if (response.data.data.items.length === 0) return <NotFoundUi />;
    return (
      <CheckoutFormProvider
        initialCartShipping={response.data.data.summary.shipping}
      >
        <PageWrapper>
          <SectionWrapper className="flex w-full max-w-screen-2xl flex-col gap-6 border-t pt-2 lg:flex-row lg:items-start lg:gap-12">
            <div className="w-full max-w-xl shrink-0 space-y-6 lg:max-w-lg">
              <header className="space-y-3">
                <h1 className="text-primary font-serif text-4xl leading-tight font-normal tracking-wide uppercase md:text-5xl">
                  {t("checkout-form")}
                </h1>
                <div
                  className="bg-primary/35 h-px max-w-[4.5rem]"
                  aria-hidden
                />
              </header>
              <CheckoutForm session={session} />
            </div>
            <div className="flex w-full min-w-0 flex-1 lg:justify-end">
              <CheckoutSummary
                cart={response.data.data}
                isLoggedIn={isLoggedIn}
                token={token}
              />
            </div>
          </SectionWrapper>
        </PageWrapper>
      </CheckoutFormProvider>
    );
  } catch {
    return <>error</>;
  }
};

export default CheckoutPage;
