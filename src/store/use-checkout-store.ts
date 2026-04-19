import { Coupon } from "@/types/checkout";
import { create } from "zustand";

type Store = {
  coupon: null | Coupon;
  setCoupon: (coupon: null | Coupon) => void;

  invoice_value: number;
  total: number;

  shipping: number;
  setShipping: (shipping: number) => void;

  setPrice: ({
    invoice_value,
    total,
  }: {
    invoice_value: number;
    total: number;
  }) => void;

  reset: () => void;
};

const useCheckoutStore = create<Store>((set) => ({
  coupon: null,
  invoice_value: 0,
  total: 0,

  shipping: -1,
  setShipping: (shipping) => {
    set({ shipping });
  },

  setPrice: ({ invoice_value, total }) => {
    set({ invoice_value, total });
  },
  setCoupon: (coupon) => {
    set({ coupon });
  },
  reset: () => {
    set({ coupon: null, invoice_value: 0, total: 0, shipping: -1 });
  },
}));

export default useCheckoutStore;
