import { create } from "zustand";

type Store = {
  invoice_value: number;
  total: number;
  setPrice: ({
    invoice_value,
    total,
  }: {
    invoice_value: number;
    total: number;
  }) => void;

  reset: () => void;
};

const useCartShoppingStore = create<Store>((set) => ({
  invoice_value: 0,
  total: 0,
  setPrice: ({ invoice_value, total }) =>
    set((state) => ({
      ...state,
      invoice_value,
      total,
    })),

  reset: () =>
    set(() => ({
      invoice_value: 0,
      total: 0,
    })),
}));

export default useCartShoppingStore;
