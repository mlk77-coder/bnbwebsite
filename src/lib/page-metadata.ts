import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

const baseUrl = () => process.env.NEXT_PUBLIC_LOCAL_URL ?? '';

export async function getSiteBranding() {
  const t = await getTranslations('home');
  return {
    siteName: t('site-name'),
    logoAlt: t('logo-alt'),
  } as const;
}

export function toOpenGraphLocale(locale: string) {
  return locale === 'ar' ? 'ar_SA' : 'en_US';
}

export type AlternateLanguages = NonNullable<
  NonNullable<Metadata['alternates']>['languages']
>;

/** Builds `/ar/cart`-style language URLs for a path segment (include leading slash). */
export function buildAlternateLanguages(path: string): AlternateLanguages {
  const base = baseUrl();
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return {
    ar: `${base}/ar${normalized}`,
    en: `${base}/en${normalized}`,
  };
}

export type BuildPageMetadataInput = {
  locale: string;
  title: string;
  description: string;
  /** Path after locale, e.g. `/cart`. Omit for locale root. */
  path?: string;
  languages?: AlternateLanguages;
  robots?: Metadata['robots'];
};

export async function buildPageMetadata({
  locale,
  title,
  description,
  path = '',
  languages,
  robots,
}: BuildPageMetadataInput): Promise<Metadata> {
  const { siteName, logoAlt } = await getSiteBranding();
  const base = baseUrl();
  const normalizedPath = path
    ? path.startsWith('/')
      ? path
      : `/${path}`
    : '';
  const pageUrl = `${base}/${locale}${normalizedPath}`;

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      siteName,
      locale: toOpenGraphLocale(locale),
      url: pageUrl,
      images: [
        {
          url: `${base}/og.png`,
          width: 1200,
          height: 630,
          alt: logoAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${base}/logo-light.png`],
      creator: '@Ibrahim',
      site: '@Ibrahim',
    },
    alternates: {
      canonical: pageUrl,
      ...(languages ? { languages } : {}),
    },
  };

  if (robots) {
    metadata.robots = robots;
  }

  return metadata;
}

export type CategoryMetadataFallbackKind =
  | 'default'
  | 'not-found'
  | 'unknown'
  | 'error';

const FAVICON_ICONS: Metadata['icons'] = {
  icon: '/favicon/favicon.ico',
  apple: '/favicon/apple-touch-icon.png',
  shortcut: '/favicon/apple-touch-icon.png',
};

export async function buildAuthPageMetadata(
  input: BuildPageMetadataInput
): Promise<Metadata> {
  return {
    ...(await buildPageMetadata(input)),
    icons: FAVICON_ICONS,
    other: { rating: 'General' },
  };
}

export async function getCategoryMetadataFallback(
  kind: CategoryMetadataFallbackKind
): Promise<Pick<Metadata, 'title' | 'description'>> {
  const t = await getTranslations('category-meta');
  const keyMap = {
    default: ['default-title', 'default-description'],
    'not-found': ['not-found-title', 'not-found-description'],
    unknown: ['unknown-title', 'unknown-description'],
    error: ['error-title', 'error-description'],
  } as const;
  const [titleKey, descriptionKey] = keyMap[kind];
  return {
    title: t(titleKey),
    description: t(descriptionKey),
  };
}
