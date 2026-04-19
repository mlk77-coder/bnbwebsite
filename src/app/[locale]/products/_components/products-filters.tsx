import { PriceRange, ProductAttribute } from "@/types/products";
import { FC } from "react";
import ProductSortDropdown from "./product-sort-dropdown";
import ProductsFiltersSheet from "./products-filters-sheet";

type PropsType = {
  priceRange: PriceRange;
  attributes: ProductAttribute[];
};

const ProductsFilters: FC<PropsType> = ({ attributes, priceRange }) => {
  return (
    <div className="flex w-full justify-end items-center gap-3">
      <ProductsFiltersSheet priceRange={priceRange} attributes={attributes} />
      <ProductSortDropdown />
    </div>
  );
};

export default ProductsFilters;
