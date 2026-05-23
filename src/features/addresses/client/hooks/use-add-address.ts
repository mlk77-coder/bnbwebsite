"use client";

import { addAddressAction } from "@/features/addresses/api/address-actions";
import { invalidateAddressRelatedQueries } from "@/lib/address-query-keys";
import { toAddressPayload } from "@/lib/address-utils";
import { AddAddressSchema } from "@/schemas/addresses.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

const emptyAddressFormValues = (): AddAddressSchema => ({
  type: "home",
  address_name: "",
  city: "",
  area: "",
  street_address: "",
  building_number: "",
  details: "",
  phone: {
    code: "963",
    number: "",
  },
  is_default: false,
  latitude: "33.518538",
  longitude: "36.279089",
});

type Options = {
  onMutationSuccess?: () => void;
};

const useAddAddress = (token: string, options?: Options) => {
  const tAddress = useTranslations("address");
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: addAddressAction,
  });
  const form = useForm<AddAddressSchema>({
    resolver: zodResolver(AddAddressSchema),
    defaultValues: emptyAddressFormValues(),
  });

  const onSubmit = (data: AddAddressSchema) =>
    mutate(
      { body: toAddressPayload(data), token },
      {
        onSuccess: (response) => {
          if (response === "success") {
            toast.success(tAddress("added-success"));
            invalidateAddressRelatedQueries(queryClient);
            form.reset(emptyAddressFormValues());
            options?.onMutationSuccess?.();
          } else toast.error(response);
        },
      }
    );
  return { form, isPending, onSubmit };
};

export default useAddAddress;
