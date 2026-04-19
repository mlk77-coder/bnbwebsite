import { ApiResponse } from ".";

export type FAQ = {
  id: number;
  type: number;
  type_translation: string;
  answer: string;
  question: string;
  created_at: string;
};

export interface GetFAQResponse extends ApiResponse {
  faqs: FAQ[];
}
