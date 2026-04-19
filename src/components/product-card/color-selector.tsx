"use client";

import { FC } from "react";
import Image from "next/image";
import { Button } from "../ui/button";

type ColorSelectorProps = {
  colorsImages: { color: string; color_image: string; image: string }[];
  setSelectedColor: (color: string) => void;
};

const ColorSelector: FC<ColorSelectorProps> = ({
  colorsImages,
  setSelectedColor,
}) => {
  return (
    <div className="flex h-5 justify-start mb-1 items-center gap-1.5">
      {colorsImages.slice(0, 5).map((color) => (
        <Button
          key={color.color}
          variant="ghost"
          onClick={() => setSelectedColor(color.image)}
          size="icon"
          className="size-5 overflow-hidden rounded-full"
        >
          <span className="sr-only">{color.color}</span>
          <Image
            className="size-full object-cover"
            src={color.color_image ?? ""}
            alt={`${color.color} color preview`}
            width={100}
            height={100}
          />
        </Button>
      ))}
      {colorsImages.length > 5 && <span>+{colorsImages.length - 5}</span>}
    </div>
  );
};

export default ColorSelector;
