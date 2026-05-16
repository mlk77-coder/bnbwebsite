import getCart from "@/features/cart/api/get-cart";
import CheckoutForm from "@/features/checkout/client/checkout-form";
import CheckoutFormProvider from "@/features/checkout/client/checkout-form-provider";
import CheckoutSummary from "@/features/checkout/components/checkout-summary";
import NotFoundUi from "@/components/not-found-ui";
import PageWrapper from "@/components/page-wrapper";
import SectionWrapper from "@/components/section-wrapper";
import getSession from "@/lib/get-session";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { CreditCard } from "lucide-react";
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

    const cart = response.data.data;
    const itemCount = cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );

    return (
      <CheckoutFormProvider initialCartShipping={cart.summary.shipping}>
        <PageWrapper>
          <SectionWrapper className="relative flex w-full max-w-screen-2xl flex-1 flex-col items-start justify-start gap-4 border-t md:flex-row">
            <div className="w-full flex-1 space-y-4">
              <div className="flex flex-col gap-4 rounded-3xl border border-primary/10 bg-white p-5 shadow-sm shadow-primary/5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <CreditCard className="size-5" />
                  </span>
                  <div>
                    <h1 className="text-2xl font-bold text-primary sm:text-3xl">
                      {t("checkout-form")}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      {t("cart.products-count", { count: itemCount })}
                    </p>
                  </div>
                </div>
                <Link
                  href="/cart"
                  className={cn(
                    "text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary",
                  )}
                >
                  {t("global.edit")}
                </Link>
              </div>
              <CheckoutForm session={session} />
            </div>
            <CheckoutSummary
              cart={cart}
              isLoggedIn={isLoggedIn}
              token={token}
            />
          </SectionWrapper>
        </PageWrapper>
      </CheckoutFormProvider>
    );
  } catch {
    return <>error</>;
  }
};

export default CheckoutPage;
