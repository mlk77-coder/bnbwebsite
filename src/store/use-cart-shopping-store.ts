import { create } from "zustand";

type Store = {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  setCartSummary: ({
    subtotal,
    tax,
    shipping,
    total,
  }: {
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
  }) => void;

  reset: () => void;
};

const useCartShoppingStore = create<Store>((set) => ({
  subtotal: 0,
  tax: 0,
  shipping: 0,
  total: 0,
  setCartSummary: ({ subtotal, tax, shipping, total }) =>
    set((state) => ({
      ...state,
      subtotal,
      tax,
      shipping,
      total,
    })),

  reset: () =>
    set(() => ({
      subtotal: 0,
      tax: 0,
      shipping: 0,
      total: 0,
    })),
}));

export default useCartShoppingStore;
