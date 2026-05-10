import getCart from "@/features/cart/api/get-cart";
import CartProducts from "@/features/cart/components/cart-products";
import ShoppingInfo from "@/features/cart/client/shopping-info";
import RecentlyViewed from "@/app/[locale]/_components/recently-viewed";
import PageWrapper from "@/components/page-wrapper";
import SectionWrapper, {
  sectionWrapperClassName,
} from "@/components/section-wrapper";
import getSession from "@/lib/get-session";
import { cn } from "@/lib/utils";
import { cookies, headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { FC, Fragment } from "react";
import { Link } from "@/navigation";
import { Undo2Icon } from "lucide-react";

type PropsType = {
  params: Promise<{ locale: string }>;
};

const CartPage: FC<PropsType> = async (props) => {
  const params = await props.params;
  const { locale } = params;

  const cookieStore = await cookies();
  const t = await getTranslations();
  const session = await getSession();
  const headersList = await headers();
  const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
    headers: headersList,
  });

  const user_token = cookieStore.get("x-user-session")?.value || "";
  const isLoggedIn = Boolean(session && session.user);
  const token = isLoggedIn ? session?.user?.access_token || "" : user_token;

  const response = await getCart(token, locale, isLoggedIn, request);

  const cartItems = response.data?.data?.items || [];
  const hasItems = cartItems.length > 0;

  return (
    <PageWrapper>
      <SectionWrapper
        className={cn(
          "max-w-screen-2xl w-full relative border-t flex-col md:flex-row flex justify-start gap-4 items-start flex-1",
          {
            "items-center": !hasItems,
          }
        )}
      >
        {!hasItems ? (
          <div className="w-full flex flex-col capitalize items-center text-xl rounded p-4 gap-5">
            <Image
              src="/empty-cart.svg"
              alt="empty cart"
              width={600}
              height={400}
            />
            <p className="text-2xl font-semibold text-primary">
              {t("cart.your-cart-is-empty")}
            </p>
            <Link
              href="/"
              className={cn(
                "flex gap-1.5 text-primary items-center relative before:content-[''] before:absolute before:-bottom-0.5 before:w-full before:h-px before:bg-primary hover:before:hidden"
              )}
            >
              <Undo2Icon size={16} />
              {t("go-home")}
            </Link>
          </div>
        ) : (
          <Fragment>
            <div className="w-full flex-1">
              <CartProducts
                cartResponse={response}
                userToken={token}
                isLoggedIn={isLoggedIn}
              />
            </div>
            <ShoppingInfo />
          </Fragment>
        )}
      </SectionWrapper>

      <RecentlyViewed
        className={cn(sectionWrapperClassName)}
        isLoggedIn={isLoggedIn}
        token={session?.user?.access_token || user_token}
      />
    </PageWrapper>
  );
};

export default CartPage;
