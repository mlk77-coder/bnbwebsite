import { editAddressAction } from "@/app/actions/address-action";
import { AddAddressSchema } from "@/schemas/addresses.schema";
import { Address } from "@/types/address";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useEditAddress = (token: string, address: Address) => {
  const form = useForm<AddAddressSchema>({
    resolver: zodResolver(AddAddressSchema),
    defaultValues: {
      address: address.street || "",
      city: address.city.id.toString() || "",
      country: address.country_id.toString() || "",
      name: address.name || "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: editAddressAction,
    onSuccess: async (data) => {
      if (data === "success") {
        toast.success("Address updated successfully");
        window.location.reload();
        form.reset();
      } else toast.error(data);
    },
  });

  const onSubmit = (data: AddAddressSchema) => {
    const formData = new FormData();

    formData.append("_method", "put");
    formData.append("city_id", data.city);
    formData.append("country", data.country);
    formData.append("street", data.address);
    formData.append("name", data.name);
    mutate({ body: formData, token, id: address.id });
  };
  return { form, isPending, onSubmit };
};

export default useEditAddress;
