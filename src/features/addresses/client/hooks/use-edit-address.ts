"use client";

import { editAddressAction } from "@/features/addresses/api/address-actions";
import { invalidateAddressRelatedQueries } from "@/lib/address-query-keys";
import { toAddressPayload } from "@/lib/address-utils";
import { splitCountryCode } from "@/lib/utils";
import {
  AddAddressSchema as addAddressZodSchema,
  type AddAddressSchema,
} from "@/schemas/addresses.schema";
import type { Address, AddressMutationPayload } from "@/types/address";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

type EditVariables = {
  token: string;
  id: number;
  body: AddressMutationPayload;
  formSnapshot: AddAddressSchema;
};

type Options = {
  onMutationSuccess?: () => void;
};

const valuesFromAddress = (address: Address): AddAddressSchema => ({
  type: address.type || "home",
  address_name: address.address_name || "",
  city: address.city || "",
  area: address.area || "",
  street_address: address.street_address || "",
  building_number: address.building_number || "",
  details: address.details || "",
  phone: address.phone
    ? splitCountryCode(address.phone)
    : {
        code: "963",
        number: "",
      },
  is_default: address.is_default || false,
  latitude: address.latitude?.toString() || "33.518538",
  longitude: address.longitude?.toString() || "36.279089",
});

const useEditAddress = (token: string, address: Address, options?: Options) => {
  const tAddress = useTranslations("address");
  const queryClient = useQueryClient();
  const syncedValues = useMemo(() => valuesFromAddress(address), [address]);

  const form = useForm<AddAddressSchema>({
    resolver: zodResolver(addAddressZodSchema),
    values: syncedValues,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (vars: EditVariables) =>
      editAddressAction({
        token: vars.token,
        id: vars.id,
        body: vars.body,
      }),
    onSuccess: (data, vars) => {
      if (data === "success") {
        toast.success(tAddress("updated-success"));
        invalidateAddressRelatedQueries(queryClient);
        form.reset(vars.formSnapshot);
        options?.onMutationSuccess?.();
      } else toast.error(data);
    },
  });

  const onSubmit = (data: AddAddressSchema) => {
    mutate({
      token,
      id: address.id,
      body: toAddressPayload(data),
      formSnapshot: data,
    });
  };
  return { form, isPending, onSubmit };
};

export default useEditAddress;
