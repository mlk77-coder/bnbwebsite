import { getProductDetails } from '@/features/products/api/get-product-details';
import PageWrapper from '@/components/page-wrapper';
import SectionWrapper, {
  sectionWrapperClassName,
} from '@/components/section-wrapper';
import { Separator } from '@/components/ui/separator';
import getSession from '@/lib/get-session';
import { cleanDescription, cn } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';
import { cookies, headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { FC } from 'react';
import RecentlyViewed from '@/app/[locale]/_components/recently-viewed';
import ProductGallery from '@/features/products/client/product-gallery';
import ProductPrice from '@/features/products/client/product-price';
import AddToCartButton from '@/features/products/client/add-to-cart-button';
import ProductBreadcrumb from '@/features/products/components/product-breadcrumb';
import ProductSelectQuantity from '@/features/products/client/product-select-quantity';
import RelatedProducts from '@/features/products/components/related-products';
import ReviewsContainer from '@/features/products/client/reviews/reviews-container';
import WishToggleButton from '@/features/products/client/wish-toggle-button';
import { getProductComments } from '@/features/products/api/get-product-comments';
import { getProductLikes } from '@/features/products/api/get-product-likes';
import { normalizeCommentsData } from '@/features/products/lib/normalize-comments-data';
import ProductSocialPanel from '@/features/products/components/product-social-panel';
import ProductVariantSelector from '@/features/products/client/product-variant-selector';
import ProductDetailsSpecs from '@/features/products/components/product-details';

type PropsType = {
  params: Promise<{ locale: string; slug: string }>;
};

const ProductDetailPage: FC<PropsType> = async props => {
  const params = await props.params;
  const { locale, slug } = params;

  const cookieStore = await cookies();
  const session = await getSession();
  const isLoggedIn = Boolean(session && session.user);
  const userToken = cookieStore.get('x-user-session')?.value || '';
  const headersList = await headers();
  const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
    headers: headersList,
  });
  const token = isLoggedIn ? session?.user?.access_token || '' : userToken;
  const t = await getTranslations();
  const response = await getProductDetails(
    slug,
    locale,
    isLoggedIn,
    token,
    request
  );
  if (!response.ok) notFound();
  const product = response.data;
  const [likesResponse, commentsResponse] = await Promise.all([
    getProductLikes(product.id, locale, token, request),
    getProductComments(product.id, locale, token, request),
  ]);

  const initialLikes = likesResponse.ok
    ? likesResponse.data
    : {
        likes_count: product.likes_count ?? 0,
        is_liked: product.is_liked ?? false,
      };

  const initialCommentsData = commentsResponse.ok
    ? commentsResponse.data
    : normalizeCommentsData([], product.comments_count ?? 0);

  return (
    <PageWrapper>
      <SectionWrapper className='size-full max-w-screen-2xl space-y-4 md:py-4 lg:py-6'>
        <ProductBreadcrumb category={product.category} />
        <div className='relative grid size-full grid-cols-1 items-start gap-6 md:grid-cols-10 md:gap-12'>
          <div className='flex flex-col gap-10 md:sticky md:top-20 md:col-span-5'>
            <ProductGallery
              name={product.name}
              images={product.images}
              mainImage={product.image}
            />
          </div>
          <div className='space-y-4 md:col-span-5'>
            <div className='space-y-2'>
              <h1 className='font-body text-primary text-xl font-medium tracking-normal'>
                {product.name}
              </h1>
              <ProductPrice defaultProduct={product} />
              <div
                className='text-muted-foreground text-sm leading-relaxed max-md:hidden'
                dangerouslySetInnerHTML={{
                  __html: cleanDescription(product.description || ''),
                }}
              />
            </div>
            <Separator className='my-1' />
            <div className='pt-3'>
              <ProductVariantSelector product={product} />
            </div>
            <div className='flex items-center gap-2.5'>
              <span className='text-primary text-sm font-semibold'>
                {t('quantity')}:
              </span>
              <ProductSelectQuantity />
            </div>
            {product.specifications ? (
              <div className='max-md:hidden'>
                <ProductDetailsSpecs details={product.specifications} />
              </div>
            ) : null}
            <div className='flex w-full flex-col gap-2 sm:flex-row sm:items-stretch'>
              <AddToCartButton product={product} />
              <WishToggleButton session={session} id={product.id} />
            </div>
            <ProductSocialPanel
              productId={product.id}
              token={token}
              locale={locale}
              isLoggedIn={isLoggedIn}
              initialLikes={initialLikes}
              initialComments={initialCommentsData.comments}
              commentsCount={initialCommentsData.comments_count}
              userName={session?.user?.name}
              userAvatar={session?.user?.avatar ?? session?.user?.image}
            />
            <ReviewsContainer
              productId={product.id}
              averageRating={product.rating}
              reviewsCount={product.reviews_count}
              token={session?.user?.access_token || ''}
            />
            <div
              className='md:hidden'
              dangerouslySetInnerHTML={{
                __html: cleanDescription(product.description || ''),
              }}
            />
          </div>
        </div>
      </SectionWrapper>
      <RelatedProducts id={String(product.id)} />
      <RecentlyViewed
        className={cn(sectionWrapperClassName)}
        isLoggedIn={isLoggedIn}
        token={session && session.user ? session.user.access_token : userToken}
      />
    </PageWrapper>
  );
};

export default ProductDetailPage;
