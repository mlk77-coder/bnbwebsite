import { Product, productVariant, VariantValue } from "@/types/products";
import { create } from "zustand";

type Store = {
  productId: number;
  setProductId: (id: number) => void;

  isProductAvailable: boolean;
  setIsProductAvailable: (isProductAvailable: boolean) => void;

  productDetail: {
    name: string;
    image: string;
    price: number;
  };

  setProductDetail: (product: {
    name: string;
    image: string;
    price: number;
  }) => void;

  quantity: number;
  setQuantity: (quantity: number) => void;

  productVariant:
    | (Product & {
        attribute_values: VariantValue[];
      })
    | null;
  setProductVariant: (product: productVariant) => void;

  productGallery: {
    id: number;
    url: string;
  }[];
  setProductGallery: (gallery: { id: number; url: string }[]) => void;

  reset: () => void;
};

const useProductDetailsStore = create<Store>((set) => ({
  productId: -1,
  setProductId: (id) => set({ productId: id }),

  isProductAvailable: true,
  setIsProductAvailable: (isProductAvailable) => set({ isProductAvailable }),

  productDetail: {
    name: "",
    image: "",
    price: 0,
  },

  setProductDetail: (product) => set({ productDetail: product }),

  productVariant: {} as productVariant,
  setProductVariant: (product) => set({ productVariant: product }),

  productGallery: [],
  setProductGallery: (gallery) => set({ productGallery: gallery }),

  quantity: 1,
  setQuantity: (quantity) => set({ quantity: quantity }),

  reset: () =>
    set((state) => ({
      ...state,
      productDetail: {
        name: "",
        image: "",
        price: 0,
      },
      productGallery: [],
      productId: -1,
      productVariant: {} as productVariant,
      quantity: 1,
      isProductAvailable: true,
    })),
}));

export default useProductDetailsStore;
