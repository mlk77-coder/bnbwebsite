import { ApiResponse } from '.';

export type User = {
  id: number | string;
  name: string;
  email: string | null;
  phone: string;
  access_token: string;
  token_type?: string;
  avatar?: string | null;
  image?: string | null;
};

export interface LoginResponse extends ApiResponse {
  data: User;
}

export type VerifyOtpResponse = ApiResponse & {
  data: {
    user: {
      id: number;
      name: string;
      phone: string;
      email: string | null;
      avatar: string | null;
    };
    token: string;
    token_type: string;
  };
};
