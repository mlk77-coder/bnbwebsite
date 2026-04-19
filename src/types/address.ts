import { ApiResponse } from ".";

export type Address = {
  id: number;
  name: string;
  country: string;
  street: string;
  country_id: number;
  city: {
    id: number;
    name: string;
  };
};

export interface GetAddressesResponse extends ApiResponse {
  locations: Address[];
}
