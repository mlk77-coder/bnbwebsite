"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { X } from 'lucide-react';
import { ProductAttribute } from "@/types/products";
import { formatPrice } from "@/lib/utils";
import useCurrencyStore from "@/store/use-currency-store";

interface ActiveFiltersProps {
  attributes: ProductAttribute[];
}

type FilterType = 
  | { type: 'attribute'; key: string; value: string }
  | { type: 'price'; from: string | null; to: string | null }
  | { type: 'sort'; value: string };

const ActiveFilters: React.FC<ActiveFiltersProps> = ({ attributes }) => {
  const t = useTranslations("filters");
  const t1 = useTranslations("filters.sort");
  const searchParams = useSearchParams();
  const router = useRouter();
  const currency = useCurrencyStore((state) => state.currency);
  const symbol = useCurrencyStore((state) => state.symbol);

  const getActiveFilters = (): FilterType[] => {
    const filters: FilterType[] = [];

    // Add attribute filters
    searchParams.getAll("attribute_ids[]").forEach(value => {
      filters.push({ type: 'attribute', key: "attribute_ids[]", value });
    });

    // Add price filter
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    if (from || to) {
      filters.push({ type: 'price', from, to });
    }

    // Add sort filter
    const sort = searchParams.get("sort[price]");
    if (sort) {
      filters.push({ type: 'sort', value: sort });
    }

    return filters;
  };

  const activeFilters = getActiveFilters();

  if (activeFilters.length === 0) return null;

  const removeFilter = (filter: FilterType) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    switch (filter.type) {
      case 'attribute':
        newSearchParams.delete(filter.key, filter.value);
        break;
      case 'price':
        newSearchParams.delete("from");
        newSearchParams.delete("to");
        break;
      case 'sort':
        newSearchParams.delete("sort[price]");
        break;
    }
    router.replace(`?${newSearchParams.toString()}`, { scroll: false });
  };

  const getAttributeValue = (attributeId: string) => {
    for (const attribute of attributes) {
      const value = attribute.values.find(v => v.id.toString() === attributeId);
      if (value) {
        return `${attribute.attribute}: ${value.value}`;
      }
    }
    return attributeId; // Fallback to ID if not found
  };

  const renderFilterValue = (filter: FilterType) => {
    switch (filter.type) {
      case 'attribute':
        return getAttributeValue(filter.value);
      case 'price':
        if (filter.from && filter.to) {
          return t("price-range", {
            from: formatPrice(Number(filter.from) * currency, symbol),
            to: formatPrice(Number(filter.to) * currency, symbol)
          });
        } else if (filter.from) {
          return t("price-from", { price: formatPrice(Number(filter.from) * currency, symbol) });
        } else if (filter.to) {
          return t("price-to", { price: formatPrice(Number(filter.to) * currency, symbol) });
        }
        break;
      case 'sort':
        return t1(`${filter.value}`);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {activeFilters.map((filter, index) => (
        <Button
          key={`${filter.type}-${index}`}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => removeFilter(filter)}
        >
          {renderFilterValue(filter)}
          <X className="h-4 w-4" />
        </Button>
      ))}
    </div>
  );
};

export default ActiveFilters;

