import { ApiResponse } from ".";

export type Coupon = {
  id: number;
  code: string;
  discount_amount: null | string;
  discount_percentage: string | null;
  type: string;
  type_translation: string;
};

export interface GetAvailableCoupons extends ApiResponse {
  coupons: Coupon[];
}
