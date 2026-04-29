/**
 * @description Represents the basic structure of an API response.
 * @interface ApiResponse
 * @property {boolean} success - Indicates whether the API request was successful.
 * @property {string} message - A message from the server, typically used for status or error messages.
 */
export interface ApiResponse {
  success: boolean;
  message: string;
}

/**
 * @description Represents pagination information used for paginated API responses.
 * @typedef {Object} Pagination
 * @property {number} current_page - The current page number.
 * @property {string | null} next_page_url - URL to the next page, or null if there isn't one.
 * @property {string | null} prev_page_url - URL to the previous page, or null if there isn't one.
 * @property {string} first_page_url - URL to the first page.
 * @property {string} last_page_url - URL to the last page.
 * @property {number} per_page - The number of items per page.
 * @property {number} total - The total number of items across all pages.
 */
export type Pagination = {
  current_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  first_page_url: string;
  last_page_url: string;
  per_page: number;
  total: number;
};

export type ApiMetaPagination = {
  current_page: number;
  total: number;
  per_page: number;
  last_page: number;
};

export type ApiPaginatedData<T> = {
  data: T[];
  meta: ApiMetaPagination;
};

/**
 * @description Combines ApiResponse with Pagination to represent API responses that include paginated data.
 * @interface ApiResponseWithPagination
 * @extends ApiResponse
 * @extends Pagination
 */
export interface ApiResponseWithPagination extends ApiResponse {
  pagination: Pagination;
}
