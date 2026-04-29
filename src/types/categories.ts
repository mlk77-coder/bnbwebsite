import { ApiPaginatedData, ApiResponse } from ".";

export type ApiCategory = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  parent_id: number | null;
  parent?: ApiCategory | null;
  order: number;
  is_active: boolean;
  products_count: number;
  subcategories: ApiCategory[];
};

export type Category = ApiCategory;
export type SubCategory = ApiCategory;
export type SubSubCategory = ApiCategory;
export type CategoryMainInfo = ApiCategory;
export type CategorySlugs = ApiCategory;
export type CategoryDetail = ApiCategory;

export interface GetCategoriesResponse extends ApiResponse {
  data: ApiPaginatedData<ApiCategory>;
}

export type GetCategoryDetailsResponse = CategoryDetail & ApiResponse;
