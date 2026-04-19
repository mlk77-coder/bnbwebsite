"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import axiosInstance from "@/lib/axios";
import useProductDetailsStore from "@/store/use-product-details-store";
import { ApiResponse } from "@/types";
import {
  Product,
  ProductDetails,
  productVariant,
  VariantValue,
} from "@/types/products";
import { useMutation } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { FC, Fragment, useEffect, useState } from "react";
import { getLangDir } from "rtl-detect";

export type ProductVariant = ApiResponse & {
  variant: productVariant & {
    gallery?: {
      id: number;
      url: string;
    }[];
  };
};

type PropsType = {
  attributes: Record<string, VariantValue[]>;
  slug: string;
  product: ProductDetails;
};

const ProductVariants: FC<PropsType> = ({ attributes, slug, product }) => {
  const { name, image, price, available_variants } = product;
  const setProductVariant = useProductDetailsStore(
    (state) => state.setProductVariant
  );  
  const setProductDetail = useProductDetailsStore(
    (state) => state.setProductDetail
  );
  const reset = useProductDetailsStore((state) => state.reset);
  const setProductGallery = useProductDetailsStore(
    (state) => state.setProductGallery
  );
  const locale = useLocale()
  const dir = getLangDir(locale)

  const attributeIdToName: Record<number, string> = {};
  Object.keys(attributes).forEach((attrName) => {
    const variantValues = attributes[attrName];
    variantValues.forEach((value) => {
      attributeIdToName[value.attribute_id] = attrName;
    });
  });

  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
    () => {
      const initialValues: Record<string, string> = {};
      if (available_variants && available_variants[0]?.attribute_values) {
        const variant = available_variants[0];
        variant.attribute_values.forEach((attrValue) => {
          const attributeName = attributeIdToName[attrValue.attribute_id];
          if (attributeName) {
            initialValues[attributeName] = attrValue.id.toString();
          }
        });
      }
      return initialValues;
    }
  );

  const setIsProductAvailable = useProductDetailsStore(
    (state) => state.setIsProductAvailable
  );

  const { mutate } = useMutation({
    mutationFn: async (selected: Record<string, string>) => {
      const attributeValues = Object.values(selected).map((value) => {
        return "attribute_ids[]=" + value;
      });
      const attributesParams = attributeValues.join("&");

      const { data } = await axiosInstance.get<ProductVariant>(
        `/products/${slug}/variant?${attributesParams}`
      );
      return data.variant;
    },
    onSuccess: (data) => {
      setProductGallery(data.gallery || []);
      setProductVariant(data);
      setIsProductAvailable(true);
    },
    onError: () => {
      setIsProductAvailable(false);
    },
  });

  useEffect(() => {
    setProductDetail({ name, image, price: +price });
    setProductVariant(
      available_variants.length > 0
        ? available_variants[0]
        : ({} as Product & {
            attribute_values: VariantValue[];
          })
    );
    return () => {
      reset();
    };
  }, [available_variants]);

  const keys = Object.keys(attributes);
  const values = Object.values(attributes);

  const isOptionAvailable = (
    selectedValues: Record<string, string>,
    key: string,
    valueItem: VariantValue
  ) => {
    if (key === keys[0]) {
      return true;
    }

    const availableOptions = available_variants.filter((variant) =>
      variant.attribute_values.some(
        (attrValue) => attrValue.id.toString() === selectedValues[keys[0]]
      )
    );

    return availableOptions.some((variant) => {
      return variant.attribute_values.some(
        (attributeValue) => attributeValue.id === valueItem.id
      );
    });
  };

  const getFirstAvailableOption = (key: string, selectedColor: string) => {
    const availableOptions = available_variants.filter((variant) =>
      variant.attribute_values.some(
        (attrValue) => attrValue.id.toString() === selectedColor
      )
    );

    const firstAvailableOption = availableOptions
      .map((variant) =>
        variant.attribute_values.find(
          (attrValue) => attributeIdToName[attrValue.attribute_id] === key
        )
      )
      .find((option) => option != null);

    return firstAvailableOption ? firstAvailableOption.id.toString() : null;
  };

  const handleValueChange = (key: string, value: string | undefined) => {
    if (!value) return;

    const newSelectedValues = { ...selectedValues, [key]: value };

    if (key === keys[0]) {
      setSelectedValues(newSelectedValues);
      keys.slice(1).forEach((otherKey) => {
        const availableOption = getFirstAvailableOption(otherKey, value);
        if (availableOption) {
          newSelectedValues[otherKey] = availableOption;
        }
      });

      mutate(newSelectedValues);
    } else {
      setSelectedValues(newSelectedValues);

      const productAvailable = available_variants.some((variant) =>
        variant.attribute_values.every((attrValue) =>
          Object.values(newSelectedValues).includes(attrValue.id.toString())
        )
      );

      if (productAvailable) {
        mutate(newSelectedValues);
      } else {
        setIsProductAvailable(false);
      }
    }
  };

  return (
    <Fragment>
      {keys.map((key, index) => {
        return (
          <div key={index} className="space-y-3">
            <h2 className="flex justify-start items-start gap-2">
              <span className="capitalize font-bold text-primary">{`${key}:`}</span>
            </h2>
            <ToggleGroup
              className="justify-start w-full gap-3 flex-wrap"
              type="single"
              dir={dir}
              onValueChange={(value) => handleValueChange(key, value)}
              value={selectedValues[key] || undefined}
            >
              {values[index].every((valueItem) => valueItem.image)
                ? values[index].map((valueItem) => {
                    const isAvailable = isOptionAvailable(
                      selectedValues,
                      key,
                      valueItem
                    );
                    return (
                      <ToggleGroupItem
                        key={valueItem.id}
                        className={`data-[state=on]:ring-1 data-[state=on]:ring-offset-4 cursor-pointer ring-offset-1 ring-foreground ${
                          isAvailable ? "" : "opacity-50"
                        }`}
                        size="icon"
                        variant="border"
                        value={valueItem.id.toString()}
                        asChild
                      >
                        <Avatar>
                          <AvatarImage
                            alt={valueItem.value}
                            src={valueItem.image ? valueItem.image : ""}
                          />
                          <AvatarFallback>
                            {valueItem.value.slice(0, 1).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </ToggleGroupItem>
                    );
                  })
                : values[index].map((valueItem, i) => {
                    const isAvailable = isOptionAvailable(
                      selectedValues,
                      key,
                      valueItem
                    );
                    return (
                      <ToggleGroupItem
                        key={i}
                        className={`data-[state=on]:bg-primary min-w-10 min-h-10 flex justify-center items-center data-[state=on]:text-background ${
                          isAvailable
                            ? ""
                            : "bg-primary/5 data-[state=on]:bg-primary/5 data-[state=on]:text-foreground"
                        }`}
                        value={valueItem.id.toString()}
                      >
                        {valueItem.value}
                      </ToggleGroupItem>
                    );
                  })}
            </ToggleGroup>
          </div>
        );
      })}
    </Fragment>
  );
};

export default ProductVariants;
