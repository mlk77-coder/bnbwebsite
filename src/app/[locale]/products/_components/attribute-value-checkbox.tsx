"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ProductAttributeValue } from "@/types/products";
import { FC } from "react";

type PropsType = {
  value: ProductAttributeValue;
  selectedValues: string[];
  handleCheckboxChange: (valueId: string) => void;
};

const AttributeValueCheckbox: FC<PropsType> = ({
  value,
  selectedValues,
  handleCheckboxChange,
}) => {
  return (
    <div key={value.id} className="items-top flex">
      <Checkbox
        id={value.id.toString()}
        checked={selectedValues.includes(value.id.toString())}
        onCheckedChange={() => handleCheckboxChange(value.id.toString())}
      />
      <div className="grid gap-1.5 leading-none">
        <Label
          htmlFor={value.id.toString()}
          className="text-sm ps-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {value.value}
        </Label>
      </div>
    </div>
  );
};

export default AttributeValueCheckbox;
