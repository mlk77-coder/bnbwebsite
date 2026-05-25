'use client';

import { FC } from 'react';
import ImageSlide from '@/features/products/client/image-slide';
import VideoSlide from '@/features/products/client/video-slide';

type PropsType = {
  media: string;
  isMobile: boolean;
  alt: string;
};

const MediaSlide: FC<PropsType> = ({ media, isMobile, alt }) => {
  const isVideo = (url: string): boolean => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];
    const lowerUrl = url.toLowerCase();
    return videoExtensions.some(ext => lowerUrl.endsWith(ext));
  };

  if (isVideo(media)) {
    return <VideoSlide video={media} isMobile={isMobile} alt={alt} />;
  }

  return <ImageSlide image={media} isMobile={isMobile} alt={alt} />;
};

export default MediaSlide;
