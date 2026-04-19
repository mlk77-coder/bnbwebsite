"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { formatPrice } from "@/lib/utils";
import useCurrencyStore from "@/store/use-currency-store";
import { PriceRange } from "@/types/products";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";

type PropsType = {
  priceRange: PriceRange;
};

const ProductsPriceFilter: FC<PropsType> = ({ priceRange }) => {
  const t = useTranslations();
  const [priceRangeState, setPriceRangeState] = useState<[number, number]>([
    0, 0,
  ]);
  const currency = useCurrencyStore((state) => state.currency);
  const symbol = useCurrencyStore((state) => state.symbol);

  const searchParams = useSearchParams();
  const router = useRouter();
  const isInitialMount = useRef(true);

  useEffect(() => {
    const fromParam = searchParams.get("from");
    const toParam = searchParams.get("to");

    if (fromParam && toParam) {
      const from = Number(fromParam);
      const to = Number(toParam);
      setPriceRangeState([from, to]);
    } else if (isInitialMount.current) {
      setPriceRangeState([priceRange.min_price, priceRange.max_price]);
      isInitialMount.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString(), priceRange.min_price, priceRange.max_price]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const [from, to] = priceRangeState;
      const isDefaultRange =
        from === priceRange.min_price && to === priceRange.max_price;
      const params = new URLSearchParams(searchParams.toString());

      if (isDefaultRange) {
        params.delete("from");
        params.delete("to");
      } else {
        params.set("from", String(from));
        params.set("to", String(to));
      }

      const newQuery = params.toString();
      router.replace(`?${newQuery}`, { scroll: false });
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [
    priceRangeState,
    priceRange.min_price,
    priceRange.max_price,
    searchParams,
    router,
  ]);

  const handleSliderChange = (values: [number, number]) => {
    setPriceRangeState(values);
  };

  if (priceRange.min_price === priceRange.max_price) return null;
  return (
    <AccordionItem className="border-b-0" value="attribute-price">
      <AccordionTrigger className="hover:bg-transparent capitalize">
        {t("price")}
      </AccordionTrigger>
      <AccordionContent className="capitalize space-y-3 px-px pb-8 pt-4">
        <div
          dir="ltr"
          className="w-11/12 mx-auto flex flex-col justify-start items-start gap-4"
        >
          <Slider
            className="w-full"
            value={priceRangeState}
            min={priceRange.min_price}
            max={priceRange.max_price}
            onValueChange={handleSliderChange}
          />
          <div className="flex justify-between text-sm items-center w-full font-medium">
            <div className="flex items-center gap-1">
              <p className="w-full border px-4 py-1 rounded inline-block font-semibold text-primary">
                {formatPrice(+priceRangeState[0] * currency, symbol)}
              </p>
            </div>
            {/* <Minus className="mx-2 size-4" /> */}
            <div className="flex items-center min-w-6 gap-1">
              <p className="w-full border px-4 py-1 rounded inline-block font-semibold text-primary">
                {formatPrice(+priceRangeState[1] * currency, symbol)}
              </p>
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ProductsPriceFilter;
