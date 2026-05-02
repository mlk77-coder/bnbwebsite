import { ApiResponse } from ".";

export type Address = {
  id: number;
  user_id: number;
  type: string;
  city: string;
  area: string;
  street_address: string;
  building_number: string;
  flat_number: string | null;
  landmark: string | null;
  postal_code: string | null;
  state: string | null;
  country: string;
  address_line: string | null;
  is_default: boolean;
  latitude: number | null;
  longitude: number | null;
  address_name: string;
  details: string | null;
  phone: string;
  created_at: string;
  updated_at: string;
};

export type AddressMutationPayload = {
  type: string;
  address_name: string;
  city: string;
  area: string;
  street_address: string;
  building_number: string;
  details?: string;
  phone: string;
  is_default: boolean;
  latitude?: number;
  longitude?: number;
};

export interface GetAddressesResponse extends ApiResponse {
  data: Address[];
}
