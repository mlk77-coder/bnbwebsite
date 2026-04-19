import { addAddressAction } from "@/app/actions/address-action";
import { AddAddressSchema } from "@/schemas/addresses.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useAddAddress = (token: string) => {
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
        window.location.reload();
        form.reset();
      } else toast.error(data);
    },
  });

  const onSubmit = (data: AddAddressSchema) => {
    const formData = new FormData();
    formData.append("city_id", data.city);
    formData.append("country", data.country);
    formData.append("street", data.address);
    formData.append("name", data.name);
    mutate({ body: formData, token });
  };
  return { form, isPending, onSubmit };
};

export default useAddAddress;
