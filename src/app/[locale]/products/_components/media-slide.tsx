"use client";

import { FC } from "react";
import ImageSlide from "./image-slide";
import VideoSlide from "./video-slide";

type PropsType = {
  media: string;
  isMobile: boolean;
  alt: string;
};

const MediaSlide: FC<PropsType> = ({ media, isMobile, alt }) => {
  // تحديد نوع الملف من امتداده
  const isVideo = (url: string): boolean => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];
    const lowerUrl = url.toLowerCase();
    return videoExtensions.some(ext => lowerUrl.endsWith(ext));
  };

  if (isVideo(media)) {
    // للفيديوهات، نستخدم VideoSlide مباشرة
    return <VideoSlide video={media} isMobile={isMobile} alt={alt} />;
  }

  // للصور، نستخدم ImageSlide مع PhotoProvider
  return <ImageSlide image={media} isMobile={isMobile} alt={alt} />;
};

export default MediaSlide; 