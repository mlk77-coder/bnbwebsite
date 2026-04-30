import getCart from "@/api/cart/get-cart";
import PageWrapper from "@/components/page-wrapper";
import SectionWrapper, {
  sectionWrapperClassName,
} from "@/components/section-wrapper";
import getSession from "@/lib/get-session";
import { cookies, headers } from "next/headers";
import { FC, Fragment } from "react";
import CartProducts from "./_components/cart-products";
import ShoppingInfo from "./_components/shopping-info";
import { getTranslations } from "next-intl/server";
import RecentlyViewed from "../_components/recently-viewed";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/navigation";
import { Undo2Icon } from "lucide-react";

type PropsType = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("cart-title"),
    description: t("cart-description"),
    openGraph: {
      type: "website",
      title: "BNB Store",
      description: t("cart-description"),
      siteName: "BNB Store",
      locale: "en",
      url: process.env.NEXT_PUBLIC_LOCAL_URL,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_LOCAL_URL}/og.png`,
          width: 1200,
          height: 630,
          alt: "BNB Store Logo",
        },
      ],
    },
    alternates: {
      canonical: process.env.NEXT_PUBLIC_LOCAL_URL,
      languages: {
        ar: `${process.env.NEXT_PUBLIC_LOCAL_URL}/ar/cart`,
        en: `${process.env.NEXT_PUBLIC_LOCAL_URL}/en/cart`,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: "BNB Store",
      description: t("cart-description"),
      images: [`${process.env.NEXT_PUBLIC_LOCAL_URL}/logo-light.png`],
      creator: "@Ibrahim",
      site: "@Ibrahim",
    },
  };
}

const Page: FC<PropsType> = async (props) => {
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

  // Fetch cart data from new API
  const response = await getCart(token, locale, isLoggedIn, request);

  // Check if cart has items
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

export default Page;
