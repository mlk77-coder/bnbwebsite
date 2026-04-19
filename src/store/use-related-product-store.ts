import { ProductCard } from "@/types/products";
import { create } from "zustand";

type Store = {
  reset: () => void;
  productsList: ProductCard[];
  setProductsList: (productsList: ProductCard[]) => void;
};

const useRelatedProductsStore = create<Store>((set) => ({
  productsList: [],
  setProductsList: (productsList) => set({ productsList }),
  reset: () =>
    set({
      productsList: [],
    }),
}));

export default useRelatedProductsStore;
