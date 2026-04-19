import { ApiResponse } from ".";

export type Profile = {
  name: string;
  email: string;
  phone: string;
  birthdate: null | string;
  gender: null | string;
  image: null | string;
  subscribed_to_emails: boolean;
};

export interface GetProfileResponse extends ApiResponse {
  profile: Profile;
}
