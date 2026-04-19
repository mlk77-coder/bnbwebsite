import { ApiResponse } from ".";
import { ProductCard } from "./products";

export type Media = {
  id: number;
  url: string;
};

export type HomePageContent = {
  id: number;
  text: { ar: string; en: string }[];
  links: {
    url: string;
    name: {
      ar: string;
      en: string;
    };
  }[];
  media_urls: {
    web: Media;
    mobile: null | Media;
  }[];
};

export type HomePageDiscount = {
  id: number;
  name: string;
  image: string;
  description: string;
  slug: string;
  products: ProductCard[];
};

export type HomePageCategory = {
  id: number;
  name: string;
  slug: string;
  image: string;
  parents_slugs: string[];
};

export type HomePageCategoryWithProducts = {
  id: number;
  name: string;
  slug: string;
  image: string;
  products: ProductCard[];
  parents_slugs: string[];
};

export interface GetHomeDataResponse extends ApiResponse {
  content: HomePageContent;
  discounts: HomePageDiscount | null;
  latest_two_categories: HomePageCategory[];
  best_selling_products: ProductCard[];
  highlighted_products: ProductCard[];
  latest_six_categories: HomePageCategory[];
  two_categories_products: HomePageCategoryWithProducts[];
}

export interface HomePageLinks extends ApiResponse {
  home_page_links: {
    links: {
      url: string;
      name: {
        ar: string;
        en: string;
      };
    }[];
  };
}
