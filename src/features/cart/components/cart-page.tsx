import PageWrapper from '@/components/page-wrapper';
import SectionWrapper from '@/components/section-wrapper';
import getCart from '@/features/cart/api/get-cart';
import ShoppingInfo from '@/features/cart/client/shopping-info';
import CartProducts from '@/features/cart/components/cart-products';
import getSession from '@/lib/get-session';
import { cn } from '@/lib/utils';
import { Link } from '@/navigation';
import { Undo2Icon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { cookies, headers } from 'next/headers';
import { FC, Fragment } from 'react';

type PropsType = {
  params: Promise<{ locale: string }>;
};

const CartPage: FC<PropsType> = async props => {
  const params = await props.params;
  const { locale } = params;

  const cookieStore = await cookies();
  const t = await getTranslations();
  const session = await getSession();
  const headersList = await headers();
  const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
    headers: headersList,
  });

  const user_token = cookieStore.get('x-user-session')?.value || '';
  const isLoggedIn = Boolean(session && session.user);
  const token = isLoggedIn ? session?.user?.access_token || '' : user_token;

  const response = await getCart(token, locale, isLoggedIn, request);
  const cartItems = response.data?.data?.items || [];
  const hasItems = cartItems.length > 0;

  return (
    <PageWrapper>
      <SectionWrapper
        className={cn(
          'relative flex w-full max-w-screen-2xl flex-1 flex-col items-start justify-start gap-4 border-t md:flex-row',
          {
            'items-center': !hasItems,
          }
        )}
      >
        {!hasItems ? (
          <div className='flex w-full flex-col items-center gap-5 rounded p-4 text-xl capitalize'>
            <p className='text-primary text-2xl font-semibold'>
              {t('cart.your-cart-is-empty')}
            </p>
            <Link
              href='/'
              className={cn(
                "text-primary before:bg-primary relative flex items-center gap-1.5 before:absolute before:-bottom-0.5 before:h-px before:w-full before:content-[''] hover:before:hidden"
              )}
            >
              <Undo2Icon size={16} />
              {t('go-home')}
            </Link>
          </div>
        ) : (
          <Fragment>
            <div className='w-full flex-1'>
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

      {/* <RecentlyViewed
        className={cn(sectionWrapperClassName)}
        isLoggedIn={isLoggedIn}
        token={session?.user?.access_token || user_token}
      /> */}
    </PageWrapper>
  );
};

export default CartPage;
