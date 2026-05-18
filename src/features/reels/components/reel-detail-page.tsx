import PageWrapper from '@/components/page-wrapper';
import SectionWrapper, {
  sectionWrapperClassName,
} from '@/components/section-wrapper';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import ReelFeaturedProduct from '@/features/reels/client/reel-featured-product';
import ReelStats from '@/features/reels/client/reel-stats';
import ReelVideoPlayer from '@/features/reels/client/reel-video-player';
import { getReelDetails } from '@/features/reels/api/get-reel-details';
import { formatReelDuration } from '@/features/reels/lib/reel-mappers';
import getSession from '@/lib/get-session';
import { cn } from '@/lib/utils';
import { Link } from '@/navigation';
import { ArrowLeft, UserRound } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { FC } from 'react';

type PropsType = {
  params: Promise<{ locale: string; id: string }>;
};

const ReelDetailPage: FC<PropsType> = async props => {
  const params = await props.params;
  const { locale, id } = params;

  const session = await getSession();
  const token = session?.user?.access_token ?? '';
  const headersList = await headers();
  const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
    headers: headersList,
  });
  const t = await getTranslations('reels');

  const response = await getReelDetails(id, locale, request, token);
  if (!response.ok) notFound();

  const reel = response.data;

  return (
    <PageWrapper>
      <SectionWrapper
        className={cn(sectionWrapperClassName, 'max-w-5xl space-y-6')}
      >
        <Link
          href='/'
          className='text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors'
        >
          <ArrowLeft className='size-4 rtl:rotate-180' aria-hidden />
          {t('back-to-home')}
        </Link>

        <div className='grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-10 lg:gap-14'>
          <div className='md:sticky md:top-24'>
            <ReelVideoPlayer
              videoUrl={reel.videoUrl}
              thumbnailUrl={reel.thumbnailUrl}
              caption={reel.caption}
            />
          </div>

          <div className='flex flex-col gap-6'>
            {reel.seller ? (
              <div className='flex items-center gap-3'>
                <Avatar className='size-11 border'>
                  {reel.seller.avatar ? (
                    <AvatarImage
                      src={reel.seller.avatar}
                      alt={reel.seller.name}
                    />
                  ) : null}
                  <AvatarFallback>
                    <UserRound className='size-5' />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className='font-semibold'>{reel.seller.name}</p>
                  <p className='text-muted-foreground text-xs'>
                    {t('duration')}: {formatReelDuration(reel.duration)}
                  </p>
                </div>
              </div>
            ) : (
              <p className='text-muted-foreground text-sm'>
                {t('duration')}: {formatReelDuration(reel.duration)}
              </p>
            )}

            {reel.caption ? (
              <p className='text-base leading-relaxed'>{reel.caption}</p>
            ) : null}

            <ReelStats reel={reel} />

            {reel.product ? (
              <>
                <Separator />
                <ReelFeaturedProduct product={reel.product} variant='card' />
              </>
            ) : null}
          </div>
        </div>
      </SectionWrapper>
    </PageWrapper>
  );
};

export default ReelDetailPage;
