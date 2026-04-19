"use client";

import useCurrencyStore from "@/store/use-currency-store";
import { FC, useEffect } from "react";

type PropsType = {
  currency: number;
  symbol: string;
  shipment_fees: number;
  active_countries: number[];
  country: string;
};

const SetCurrency: FC<PropsType> = ({
  currency,
  symbol,
  shipment_fees,
  country,
  active_countries,
}) => {
  const setCurrency = useCurrencyStore((state) => state.setCurrency);
  const setSymbol = useCurrencyStore((state) => state.setSymbol);
  const setCountry = useCurrencyStore((state) => state.setCountry);
  const setShipmentFees = useCurrencyStore((state) => state.setShipmentFees);
  const setActiveCountries = useCurrencyStore(
    (state) => state.setActiveCountries
  );

  useEffect(() => {
    setCurrency(currency);
    setCountry(country);
    setSymbol(symbol);
    setShipmentFees(shipment_fees);
    setActiveCountries(active_countries);
  }, [currency, symbol]);
  return null;
};

export default SetCurrency;
