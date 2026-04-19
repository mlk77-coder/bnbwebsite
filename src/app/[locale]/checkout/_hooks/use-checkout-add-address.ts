import { addAddressAction } from "@/app/actions/address-action";
import { AddAddressSchema } from "@/schemas/addresses.schema";
import useCheckoutStore from "@/store/use-checkout-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { FieldValues, useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

const useCheckoutAddAddress = (
  token: string,
  checkoutForm: UseFormReturn<FieldValues>,
  setOpen: Dispatch<SetStateAction<boolean>>
) => {
  const setShipping = useCheckoutStore((state) => state.setShipping);
  const queryClient = useQueryClient();
  const form = useForm<AddAddressSchema>({
    resolver: zodResolver(AddAddressSchema),
    defaultValues: {
      address: "",
      city: "",
      country: "",
      name: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: addAddressAction,
    onSuccess: async (data) => {
      if (data === "success") {
        toast.success("Address added successfully");
        setShipping(-1);
        form.reset();
        queryClient.refetchQueries({
          queryKey: ["address"],
        });
        setOpen(false);
      } else toast.error(data);
    },
  });

  const onSubmit = (data: AddAddressSchema) => {
    const formData = new FormData();
    formData.append("city_id", data.city);
    formData.append("country", data.country);
    formData.append("street", data.address);
    formData.append("name", data.name);

    checkoutForm.setValue("street", data.address);
    checkoutForm.setValue("city_id", data.city);
    checkoutForm.setValue("country", data.name);
    checkoutForm.setValue("countryId", data.country);
    setOpen(false);

    if (token) mutate({ body: formData, token });
  };
  return { form, isPending, onSubmit };
};

export default useCheckoutAddAddress;
