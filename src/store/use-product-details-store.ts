import type { CartVariantAttribute } from '@/types/cart';
import { create } from 'zustand';

type ProductDetailPreview = {
  name: string;
  image: string;
  price: number;
  salePrice?: number | null;
  compareAtPrice?: number;
};

type Store = {
  productId: number;
  setProductId: (id: number) => void;

  selectedVariantId: number | null;
  setSelectedVariantId: (id: number | null) => void;

  selectedVariantAttributes: CartVariantAttribute[];
  setSelectedVariantAttributes: (attrs: CartVariantAttribute[]) => void;

  isProductAvailable: boolean;
  setIsProductAvailable: (isProductAvailable: boolean) => void;

  productDetail: ProductDetailPreview;

  setProductDetail: (product: ProductDetailPreview) => void;

  quantity: number;
  setQuantity: (quantity: number) => void;

  reset: () => void;
};

const initialProductDetail: ProductDetailPreview = {
  name: '',
  image: '',
  price: 0,
  salePrice: null,
  compareAtPrice: 0,
};

const useProductDetailsStore = create<Store>(set => ({
  productId: -1,
  setProductId: id => set({ productId: id }),

  selectedVariantId: null,
  setSelectedVariantId: id => set({ selectedVariantId: id }),

  selectedVariantAttributes: [],
  setSelectedVariantAttributes: attrs =>
    set({ selectedVariantAttributes: attrs }),

  isProductAvailable: true,
  setIsProductAvailable: isProductAvailable => set({ isProductAvailable }),

  productDetail: initialProductDetail,

  setProductDetail: product => set({ productDetail: product }),

  quantity: 1,
  setQuantity: quantity => set({ quantity }),

  reset: () =>
    set({
      productDetail: initialProductDetail,
      productId: -1,
      selectedVariantId: null,
      selectedVariantAttributes: [],
      quantity: 1,
      isProductAvailable: true,
    }),
}));

export default useProductDetailsStore;
