'use client';

import ProductImagesSlider from '@/features/products/client/product-images-slider';
import useProductDetailsStore from '@/store/use-product-details-store';
import { useMemo } from 'react';

type PropsType = {
  name: string;
  images: string[];
  mainImage: string;
};

/** Keeps the gallery in sync with the selected variant image. */
const ProductGallery = ({ name, images, mainImage }: PropsType) => {
  const variantImage = useProductDetailsStore(
    state => state.productDetail.image
  );

  const { displayImages, displayMain } = useMemo(() => {
    const liveImage =
      variantImage && variantImage.length > 0 ? variantImage : mainImage;
    const base = images.length > 0 ? images : [mainImage];
    const unique = [liveImage, ...base.filter(src => src !== liveImage)];
    return { displayImages: unique, displayMain: liveImage };
  }, [images, mainImage, variantImage]);

  return (
    <ProductImagesSlider
      key={displayMain}
      name={name}
      images={displayImages}
      mainImage={displayMain}
    />
  );
};

export default ProductGallery;
