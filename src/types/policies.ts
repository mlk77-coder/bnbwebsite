import { ApiResponse } from ".";

export type Policy = {
  id: number;
  type: number;
  created_at: string;
  text: string;
};

export interface GetPolicyResponse extends ApiResponse {
  policies: Policy[];
}
