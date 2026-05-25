import { mapApiPagination } from '@/lib/api-mappers';
import { resolveMediaUrl } from '@/lib/resolve-media-url';
import type {
  ApiReel,
  ApiReelProduct,
  ApiReelSeller,
  GetReelsResponse,
  ReelCard,
  ReelDetails,
  ReelProduct,
  ReelSeller,
} from '@/types/reels';

const parsePrice = (value: string | undefined): number =>
  Number.parseFloat(value ?? '0') || 0;

export function formatReelDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function mapApiReelProduct(product: ApiReelProduct | null): ReelProduct | null {
  if (!product) return null;

  const price = parsePrice(product.price);
  const originalPrice = parsePrice(product.original_price);
  const salePrice = product.sale_price
    ? parsePrice(product.sale_price)
    : null;

  return {
    id: product.id,
    name: product.name,
    price,
    originalPrice,
    salePrice,
    image: resolveMediaUrl(product.image),
  };
}

function mapApiReelSeller(seller: ApiReelSeller | null): ReelSeller | null {
  if (!seller) return null;

  return {
    id: seller.id,
    name: seller.name,
    avatar: seller.avatar ? resolveMediaUrl(seller.avatar) : null,
  };
}

export function mapApiReel(reel: ApiReel): ReelCard {
  return {
    id: reel.id,
    videoUrl: resolveMediaUrl(reel.video_url),
    thumbnailUrl: resolveMediaUrl(reel.thumbnail_url),
    caption: reel.caption || reel.title || '',
    duration: reel.duration,
    viewsCount: reel.views_count ?? 0,
    likesCount: reel.likes_count ?? 0,
    commentsCount: reel.comments_count ?? 0,
    isLiked: Boolean(reel.is_liked),
    product: mapApiReelProduct(reel.product),
    seller: mapApiReelSeller(reel.seller),
    createdAt: reel.created_at,
  };
}

export function mapApiReelDetails(reel: ApiReel): ReelDetails {
  return mapApiReel(reel);
}

export function mapReelsResponse(
  reels: ApiReel[],
  meta: Parameters<typeof mapApiPagination>[0],
  path: string
): GetReelsResponse {
  return {
    success: true,
    message: 'Reels loaded',
    reels: reels.map(mapApiReel),
    pagination: mapApiPagination(meta, path),
  };
}
