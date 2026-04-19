import { create } from "zustand";

type Store = {
  currency: number;
  setCurrency: (currency: number) => void;

  symbol: string;
  setSymbol: (symbol: string) => void;

  shipmentFees: number;
  setShipmentFees: (symbol: number) => void;

  activeCountries: number[];
  setActiveCountries: (activeCountries: number[]) => void;

  country: string;
  setCountry: (country: string) => void;
};

const useCurrencyStore = create<Store>((set) => ({
  currency: 1,
  symbol: "USD",
  shipmentFees: 1,
  activeCountries: [],
  country: "",

  setShipmentFees: (shipmentFees) => set({ shipmentFees }),
  setCountry: (country) => set({ country }),
  setActiveCountries: (activeCountries) => set({ activeCountries }),
  setCurrency: (currency) => set({ currency }),
  setSymbol: (symbol) => set({ symbol }),
}));

export default useCurrencyStore;
