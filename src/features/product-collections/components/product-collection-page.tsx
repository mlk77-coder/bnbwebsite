import CustomBreadcrumb from '@/components/custom-breadcrumb';
import PageWrapper from '@/components/page-wrapper';
import SectionWrapper from '@/components/section-wrapper';
import { ProductGridSkeleton } from '@/components/skeletons/product-skeletons';
import { CollectionPageHeader } from '@/features/product-collections/components/collection-page-header';
import { CollectionInfiniteProducts } from '@/features/product-collections/components/collection-infinite-products';
import { COLLECTION_PRODUCTS_PER_PAGE } from '@/features/product-collections/constants';
import { getProductCollection } from '@/features/product-collections/api/get-product-collection';
import type { ProductCollectionId } from '@/features/product-collections/types';
import getSession from '@/lib/get-session';
import { headers } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import { FC, Suspense } from 'react';

type PropsType = {
  params: Promise<{ locale: string }>;
  collection: ProductCollectionId;
  titleKey: string;
  descriptionKey?: string;
  listParams?: Record<string, string>;
};

const ProductCollectionPage: FC<PropsType> = async props => {
  const params = await props.params;
  const { locale } = params;
  const { collection, titleKey, descriptionKey, listParams = {} } = props;

  const t = await getTranslations();
  const session = await getSession();
  const token = session?.user?.access_token ?? '';
  const headersList = await headers();
  const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
    headers: headersList,
  });

  const response = await getProductCollection(
    collection,
    {
      limit: String(COLLECTION_PRODUCTS_PER_PAGE),
      per_page: String(COLLECTION_PRODUCTS_PER_PAGE),
      page: '1',
      ...listParams,
    },
    locale,
    request,
    token
  );

  const productList = response.ok
    ? response.data
    : {
        success: false,
        message: '',
        products: [],
        pagination: {
          current_page: 1,
          next_page_url: null,
          prev_page_url: null,
          first_page_url: '',
          last_page_url: '',
          per_page: COLLECTION_PRODUCTS_PER_PAGE,
          total: 0,
        },
      };

  const description = descriptionKey ? t(descriptionKey) : undefined;

  return (
    <PageWrapper>
      <SectionWrapper className='space-y-8! md:py-4 lg:py-8'>
        <CustomBreadcrumb activeLink={t(titleKey)} links={[]} />
        <CollectionPageHeader title={t(titleKey)} description={description} />
        {response.ok ? (
          <Suspense fallback={<ProductGridSkeleton />}>
            <CollectionInfiniteProducts
              collection={collection}
              initialData={productList}
            />
          </Suspense>
        ) : (
          <p className='text-muted-foreground text-sm'>
            {t('errors.load-page-error')}
          </p>
        )}
      </SectionWrapper>
    </PageWrapper>
  );
};

export default ProductCollectionPage;
