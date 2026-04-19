export type CategorySlugs = {
  id: number;
  name: string;
  slug: string;
  parent_category: CategorySlugs | null;
};

// Importing ApiResponse type from the current directory.
import { ApiResponse } from ".";

/**
 * @description Represents the main information for a category or subcategory.
 * @typedef {Object} CategoryMainInfo
 * @property {number} id - Unique identifier for the category.
 * @property {string} name - Name of the category.
 * @property {string} description - Description of the category.
 * @property {string} slug - URL-friendly identifier for the category.
 * @property {string} image - URL of the category image.
 */
export type CategoryMainInfo = {
  id: number;
  name: string;
  description: string;
  slug: string;
  image: string;
  parent_category: CategorySlugs;
};

/**
 * @description Represents a category that includes subcategories.
 * @interface Category
 * @extends CategoryMainInfo
 * @property {SubCategory[]} sub_categories - Array of subcategories under this category.
 */
export interface Category extends CategoryMainInfo {
  sub_categories: SubCategory[];
}

/**
 * @description Represents a subcategory, which may also contain its own subcategories (SubSubCategory).
 * @interface SubCategory
 * @extends CategoryMainInfo
 * @property {number} products_count - Number of products in the subcategory.
 * @property {SubSubCategory[]} sub_categories - Array of sub-subcategories under this subcategory.
 */
export interface SubCategory extends CategoryMainInfo {
  sub_categories: SubSubCategory[];
}

/**
 * @description Represents a sub-subcategory.
 * @interface SubSubCategory
 * @extends CategoryMainInfo
 * @property {number} products_count - Number of products in the sub-subcategory.
 */
export interface SubSubCategory extends CategoryMainInfo {}

/**
 * @description Represents the response structure for the API request to get categories.
 * @interface GetCategoriesResponse
 * @extends ApiResponse
 * @property {Category[]} categories - Array of top-level categories.
 */
export interface GetCategoriesResponse extends ApiResponse {
  categories: Category[];
}

/**
 * @description Represents the details of a single category.
 * @typedef {Object} CategoryDetail
 * @property {[]} products - Array of products associated with the category (currently an empty array).
 * @property {CategoryMainInfo & { parent_category: { id: number, name: string, parent_category: { id: number, name: string }}}} category - Information about the category and its parent category hierarchy.
 * @property {CategoryMainInfo[]} sub_categories - Array of subcategories under the category.
 * @property {CategoryMainInfo[]} sub_sub_categories - Array of sub-subcategories under the category.
 * @property {number} products_count - Total number of products in the category.
 * @property {[]} attribute_filters - Array for filtering products by attributes (currently an empty array).
 * @property {[]} price_range - Array representing the price range of products (currently an empty array).
 */
export type CategoryDetail = {
  products: [];
  category: CategoryMainInfo;
  sub_categories: CategoryMainInfo[];
  sub_sub_categories: CategoryMainInfo[];
  products_count: number;
  attribute_filters: [];
  price_range: [];
};

/**
 * @description Represents the response structure for the API request to get details of a single category.
 * @interface GetCategoryDetailsResponse
 * @extends CategoryDetail
 * @extends ApiResponse
 */
export type GetCategoryDetailsResponse = CategoryDetail & ApiResponse;
