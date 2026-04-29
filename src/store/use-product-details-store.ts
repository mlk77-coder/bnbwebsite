import { create } from 'zustand';

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

  reset: () => void;
};

const useProductDetailsStore = create<Store>(set => ({
  productId: -1,
  setProductId: id => set({ productId: id }),

  isProductAvailable: true,
  setIsProductAvailable: isProductAvailable => set({ isProductAvailable }),

  productDetail: {
    name: '',
    image: '',
    price: 0,
  },

  setProductDetail: product => set({ productDetail: product }),

  quantity: 1,
  setQuantity: quantity => set({ quantity: quantity }),

  reset: () =>
    set(state => ({
      ...state,
      productDetail: {
        name: '',
        image: '',
        price: 0,
      },
      productId: -1,
      quantity: 1,
      isProductAvailable: true,
    })),
}));

export default useProductDetailsStore;
