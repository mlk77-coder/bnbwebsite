import { getCurrency } from '@/api/currency/get-currency';
import { cachedGetSocialLinks } from '@/api/social/get-social-links';
import SetCurrency from '@/components/set-currency';
import { Toaster } from '@/components/ui/sonner';
import getSession from '@/lib/get-session';
import AuthProvider from '@/providers/auth-provuder';
import ReactQueryProvider from '@/providers/react-query-provider';
import { Session } from 'next-auth';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import { FC } from 'react';
import Footer from './footer/footer';
import Navbar from './header/navbar/navbar';

type PropsType = {
  children: React.ReactNode;
};

const HtmlBody: FC<PropsType> = async ({ children }) => {
  const trans = getTranslations();
  const messagesApi = getMessages();
  const sessionApi = getSession();
  const dataApi = getCurrency();
  const contactUsApi = cachedGetSocialLinks();
  const localeApi = getLocale();
  const [messages, session, data, contactUs, t, locale] = await Promise.all([
    messagesApi,
    sessionApi,
    dataApi,
    contactUsApi,
    trans,
    localeApi,
  ]);
  const socialLinks = contactUs.data?.information || [];
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ReactQueryProvider>
        <AuthProvider session={session as Session}>
          <SetCurrency
            currency={data.data?.change_rate || 1}
            symbol={data.data?.symbol || 'USD'}
            shipment_fees={data.data?.shipment_fees || 1}
            active_countries={data.data?.active_countries || []}
            country={data.data?.country || ''}
          />
          <Navbar />
          <main className='relative flex size-full min-h-[calc(100vh-6rem)] flex-1 flex-col items-start justify-start'>
            {children}
          </main>
          <Footer socialLinks={socialLinks} />
          <Toaster
            richColors
            position='top-center'
            className='items-start whitespace-pre-line'
          />
        </AuthProvider>
      </ReactQueryProvider>
    </NextIntlClientProvider>
  );
};

export default HtmlBody;
