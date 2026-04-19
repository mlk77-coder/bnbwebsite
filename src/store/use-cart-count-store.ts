import { create } from "zustand";

type Store = {
  productsCount: number;
  setProductsCount: (productsCount: number) => void;
  incrementProductsCount: (quantity: number) => void;
  decrementProductsCount: (quantity: number) => void;

  reset: () => void;
};

const useCartCountStore = create<Store>((set) => ({
  productsCount: 0,

  setProductsCount: (productsCount) => set({ productsCount }),

  incrementProductsCount: (quantity) =>
    set((state) => ({
      productsCount: state.productsCount + quantity,
    })),
  decrementProductsCount: (quantity) =>
    set((state) => ({
      productsCount: state.productsCount - quantity,
    })),

  reset: () =>
    set((state) => ({
      ...state,
      productsCount: 0,
    })),
}));

export default useCartCountStore;
