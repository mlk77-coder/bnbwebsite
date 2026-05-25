'use client';

import { RotateCw, ZoomIn, ZoomOut } from 'lucide-react';
import { FC, ReactNode, useEffect } from 'react';
import { PhotoProvider as ReactPhotoProvider } from 'react-photo-view';

type PhotoProviderProps = {
  children: ReactNode;
};

const PhotoProvider: FC<PhotoProviderProps> = ({ children }) => {
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const portalElement = document.querySelector('.PhotoView-Portal') as HTMLElement;
      if (portalElement) {
        portalElement.setAttribute('dir', 'ltr');
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleVisibleChange = (isVisible: boolean) => {
    const portalElement = document.querySelector('.PhotoView-Portal') as HTMLElement;
    if (!isVisible && portalElement) {
      portalElement.removeAttribute('dir');
    }
  };

  return (
    <ReactPhotoProvider
      loop
      onVisibleChange={handleVisibleChange}
      toolbarRender={({ onScale, scale, rotate, onRotate }) => (
        <>
          <button
            type='button'
            className='PhotoView-Slider__toolbarIcon'
            onClick={() => onScale(scale + 1)}
          >
            <span className='sr-only'>Zoom In</span>
            <ZoomIn className='size-5' />
          </button>
          <button
            type='button'
            className='PhotoView-Slider__toolbarIcon'
            onClick={() => onScale(scale - 1)}
          >
            <span className='sr-only'>Zoom Out</span>
            <ZoomOut className='size-5' />
          </button>
          <button
            type='button'
            className='PhotoView-Slider__toolbarIcon'
            onClick={() => onRotate(rotate + 90)}
          >
            <span className='sr-only'>Rotate clockwise</span>
            <RotateCw className='size-5' />
          </button>
        </>
      )}
      maskOpacity={0.5}
    >
      {children}
    </ReactPhotoProvider>
  );
};

export default PhotoProvider;
