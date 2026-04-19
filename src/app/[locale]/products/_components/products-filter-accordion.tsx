"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FC, useState, useEffect, useCallback } from "react";
import AttributeValueCheckbox from "./attribute-value-checkbox";
import { PriceRange, ProductAttribute } from "@/types/products";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProductsPriceFilter from "./products-price-filter";

type PropsType = {
  attributes: ProductAttribute[];
  priceRange: PriceRange;
};

const ProductsFilterAccordion: FC<PropsType> = ({ attributes, priceRange }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initializeSelectedValues = useCallback(() => {
    const currentParams = new URLSearchParams(searchParams.toString());
    const valuesFromURL: string[] = [];
    currentParams.forEach((value, key) => {
      if (key.startsWith("attribute_ids[")) {
        valuesFromURL.push(value);
      }
    });
    return valuesFromURL;
  }, [searchParams]);

  const [selectedValues, setSelectedValues] = useState<string[]>(
    initializeSelectedValues
  );

  const handleCheckboxChange = useCallback((valueId: string) => {
    setSelectedValues((prev) => {
      if (prev.includes(valueId)) {
        return prev.filter((id) => id !== valueId);
      } else {
        return [...prev, valueId];
      }
    });
  }, []);

  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams.toString());

    // Remove all existing attribute_ids parameters
    for (const key of Array.from(currentParams.keys())) {
      if (key.startsWith("attribute_ids[")) {
        currentParams.delete(key);
      }
    }

    // Add updated selected values to the URL params
    selectedValues.forEach((id) => {
      currentParams.append(`attribute_ids[]`, id);
    });

    // Update the URL without reloading the page
    router.replace(`?${currentParams.toString()}`, { scroll: false });
  }, [selectedValues, router, searchParams]);

  return (
    <Accordion defaultValue={["attribute-price"]} type="multiple">
      {attributes.map((attribute, index) => (
        <AccordionItem
          key={`attribute-${index}-${attribute.attribute}`}
          className="border-b-0"
          value={attribute.attribute}
        >
          <AccordionTrigger className="hover:bg-transparent capitalize">
            {attribute.attribute}
          </AccordionTrigger>
          <AccordionContent className="capitalize space-y-3">
            {attribute.values.map((value) => (
              <AttributeValueCheckbox
                handleCheckboxChange={handleCheckboxChange}
                key={value.id}
                value={value}
                selectedValues={selectedValues}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
      <ProductsPriceFilter priceRange={priceRange} />
    </Accordion>
  );
};

export default ProductsFilterAccordion;
