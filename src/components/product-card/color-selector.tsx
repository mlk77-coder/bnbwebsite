'use client';

import { FC } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type ColorSelectorProps = {
  colorsImages: { color: string; color_image: string; image: string }[];
  selectedColor: string;
  setSelectedColor: (color: string) => void;
};

const ColorSelector: FC<ColorSelectorProps> = ({
  colorsImages,
  selectedColor,
  setSelectedColor,
}) => {
  if (!colorsImages.length) return null;

  return (
    <div className='flex items-center gap-1.5 pt-2'>
      {colorsImages.slice(0, 6).map(c => (
        <button
          key={c.color}
          title={c.color}
          onClick={e => {
            e.preventDefault();
            setSelectedColor(selectedColor === c.image ? '' : c.image);
          }}
          className={cn(
            'size-4 overflow-hidden rounded-full border-2 transition-all duration-150 hover:scale-110',
            selectedColor === c.image
              ? 'border-foreground ring-foreground ring-1 ring-offset-1'
              : 'border-border/50'
          )}
        >
          <Image
            src={c.color_image}
            alt={c.color}
            width={16}
            height={16}
            className='size-full object-cover'
          />
        </button>
      ))}
      {colorsImages.length > 6 && (
        <span className='text-muted-foreground text-[10px]'>
          +{colorsImages.length - 6}
        </span>
      )}
    </div>
  );
};

export default ColorSelector;
