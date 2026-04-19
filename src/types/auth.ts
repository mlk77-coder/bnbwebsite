import { ApiResponse } from ".";

export type User = {
  name: string;
  email: string;
  phone: string;
  access_token: string;
  image: string;
};

export interface LoginResponse extends ApiResponse {
  data: User;
}
