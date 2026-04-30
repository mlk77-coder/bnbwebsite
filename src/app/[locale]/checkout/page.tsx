import getCart from "@/api/cart/get-cart";
import NotFoundUi from "@/components/not-found-ui";
import PageWrapper from "@/components/page-wrapper";
import SectionWrapper from "@/components/section-wrapper";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import getSession from "@/lib/get-session";
import { Info } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { FC } from "react";
import CheckoutForm from "./_components/checkout-form";
import CheckoutFormProvider from "./_components/checkout-form-provider";
import CheckoutSummary from "./_components/checkout-summary";

type PropsType = {
  params: Promise<{ locale: string }>;
};

const CheckoutPage: FC<PropsType> = async props => {
  const params = await props.params;

  const {
    locale
  } = params;

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
      <CheckoutFormProvider session={session}>
        <PageWrapper>
          <SectionWrapper className="max-w-screen-2xl w-full relative border-t flex-col md:flex-row flex justify-start gap-4 items-start flex-1">
            <div className="w-full md:w-6/12 lg:w-5/12 sm:me-4 space-y-8 lg:me-10">
              <h1 className="uppercase text-2xl lg:text-4xl text-primary">
                {t("checkout-form")}
              </h1>
              <Alert className="bg-[#e5e2d1] text-primary border-0 shadow">
                <Info className="!text-primary size-5" />
                <AlertTitle className="leading-relaxed">
                  {t("checkout-confirmation-description")}
                </AlertTitle>
              </Alert>
              <CheckoutForm session={session} />
            </div>
            <CheckoutSummary
              cart={response.data.data}
              isLoggedIn={isLoggedIn}
              token={token}
            />
          </SectionWrapper>
        </PageWrapper>
      </CheckoutFormProvider>
    );
  } catch (err) {
    return <>error</>;
  }
};

export default CheckoutPage;
