"use client";

import { CarouselItem } from "@/components/ui/carousel";
import { Play, Pause } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";

type PropsType = {
  video: string;
  isMobile: boolean;
  alt: string;
};

const VideoSlide: FC<PropsType> = ({ video, isMobile, alt }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [poster, setPoster] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);

  // إنشاء poster للفيديو
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.addEventListener('loadeddata', () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0);
          const posterUrl = canvas.toDataURL('image/jpeg');
          setPoster(posterUrl);
        }
      });
    }
  }, []);

  const handleVideoClick = (event: React.MouseEvent<HTMLVideoElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const videoElement = event.currentTarget;
    
    if (videoElement.paused) {
      videoElement.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.error('Error playing video:', error);
      });
    } else {
      videoElement.pause();
      setIsPlaying(false);
    }
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  return (
    <CarouselItem
      key={isMobile ? "mobile" : "desktop"}
      className="size-full overflow-hidden relative aspect-square ps-0"
    >
      <div className="relative size-full group">
        <video
          ref={videoRef}
          src={video}
          className="size-full object-cover overflow-hidden cursor-pointer"
          controls
          preload="metadata"
          poster={poster}
          onClick={handleVideoClick}
          onPlay={handlePlay}
          onPause={handlePause}
          muted={false}
        >
          <source src={video} type="video/mp4" />
          <source src={video} type="video/webm" />
          <source src={video} type="video/ogg" />
          {alt}
        </video>
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/50 rounded-full p-4 backdrop-blur-sm">
              <Play className="w-10 h-10 text-white fill-white" />
            </div>
          </div>
        )}
        {/* Overlay للتحكم */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </CarouselItem>
  );
};

export default VideoSlide; 