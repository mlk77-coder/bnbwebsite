import { ApiResponse } from ".";

export type Profile = {
  id: number;
  name: string;
  email: string | null;
  phone: string;
  avatar: string | null;
  phone_verified_at: string | null;
  created_at: string;
};

export interface GetProfileResponse extends ApiResponse {
  data: Profile;
}
