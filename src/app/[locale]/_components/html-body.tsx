import { getCurrency } from "@/api/currency/get-currency";
import { cachedGetSocialLinks } from "@/api/social/get-social-links";
import SetCurrency from "@/components/set-currency";
import { Toaster } from "@/components/ui/sonner";
import getSession from "@/lib/get-session";
import AuthProvider from "@/providers/auth-provuder";
import ReactQueryProvider from "@/providers/react-query-provider";
import { Session } from "next-auth";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { FC } from "react";
import AdsDialog from "./ads-dialog";
import Footer from "./footer/footer";
import Navbar from "./header/navbar/navbar";
import PromoBar from "./header/promo-bar";

type PropsType = {
  children: React.ReactNode;
};

const HtmlBody: FC<PropsType> = async ({ children }) => {
  const trans = getTranslations();
  const messagesApi = getMessages();
  const sessionApi = getSession();
  const dataApi = getCurrency();
  const contactUsApi = cachedGetSocialLinks();
  const [messages, session, data, contactUs, t] = await Promise.all([
    messagesApi,
    sessionApi,
    dataApi,
    contactUsApi,
    trans,
  ]);
  const socialLinks = contactUs.data?.information || [];
  return (
    <NextIntlClientProvider messages={messages}>
      <ReactQueryProvider>
        <AuthProvider session={session as Session}>
          <SetCurrency
            currency={data.data?.change_rate || 1}
            symbol={data.data?.symbol || "USD"}
            shipment_fees={data.data?.shipment_fees || 1}
            active_countries={data.data?.active_countries || []}
            country={data.data?.country || ""}
          />
          <PromoBar />
          <Navbar />
          <main className="size-full min-h-[calc(100vh-6rem)] flex-1 flex flex-col justify-start items-start relative">
            {children}
            {/* <a
              target="_blank"
              href="https://wa.me/963981296153"
              className="fixed bottom-5 end-5 py-3 px-4 text-white rounded-full bg-[#25d366] gap-1 shadow-lg z-50 flex justify-center items-center"
            >
              <img className="size-6" src="/WhatsApp.svg" alt="WhatsApp icon" />
              <span className="font-bold">{t("chat-with-us")}</span>
            </a> */}
          </main>
          <AdsDialog />
          <Footer socialLinks={socialLinks} />    
          <Toaster
            richColors
            position="top-center"
            className="whitespace-pre-line items-start"
          />
        </AuthProvider>
      </ReactQueryProvider>
    </NextIntlClientProvider>
  );
};

export default HtmlBody;
