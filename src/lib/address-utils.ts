import { type AddAddressSchema } from "@/schemas/addresses.schema";
import { type Address, type AddressMutationPayload } from "@/types/address";

const toOptionalNumber = (value?: string) => {
  if (!value) return undefined;
  const parsedValue = Number(value);
  return Number.isNaN(parsedValue) ? undefined : parsedValue;
};

export const toAddressPayload = (
  data: AddAddressSchema
): AddressMutationPayload => {
  const latitude = toOptionalNumber(data.latitude);
  const longitude = toOptionalNumber(data.longitude);

  return {
    type: data.type,
    address_name: data.address_name,
    city: data.city,
    area: data.area,
    street_address: data.street_address,
    building_number: data.building_number,
    ...(data.details ? { details: data.details } : {}),
    phone: `+${data.phone.code}${data.phone.number}`,
    is_default: data.is_default,
    ...(latitude !== undefined ? { latitude } : {}),
    ...(longitude !== undefined ? { longitude } : {}),
  };
};

export const formatAddressStreet = (address: Address) =>
  (
    address.address_line ||
    [
      address.street_address,
      address.building_number
        ? `${address.building_number}`
        : null,
      address.area,
    ]
      .filter(Boolean)
      .join(", ")
  ).trim();

export const formatAddressLocation = (address: Address) =>
  [address.country, address.city, address.area].filter(Boolean).join(", ");

export const normalizeAddressText = (value: string) =>
  value.trim().toLowerCase();
