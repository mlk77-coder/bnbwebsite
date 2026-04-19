"use client";

import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios";
import { CheckoutSchema } from "@/schemas/checkout.schema";
import useCheckoutStore from "@/store/use-checkout-store";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

const GetShippingButton = () => {
  const form = useFormContext<CheckoutSchema>();
  const setShipping = useCheckoutStore((state) => state.setShipping);
  const t = useTranslations();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: CheckoutSchema) => {
      const response = await axiosInstance.get<{ shipping: number }>(
        `/order/shipping`,
        {
          params: {
            city_id: data.city_id,
            country: data.countryId,
          },
        }
      );
      return response.data.shipping;
    },
    onSuccess: (data) => {
      setShipping(data);
    },
    onError: () => {
      toast.error("can not get shipping cost please select another address");
    },
  });

  const getShipping = (data: CheckoutSchema) => {
    mutate(data);
  };
  return (
    <Button
      onClick={() => {
        form.handleSubmit(getShipping)();
      }}
      size="lg"
      disabled={isPending}
      className="w-full"
    >
      <SubmitButton isPending={isPending} text={t("get-shipping-cost")} />
    </Button>
  );
};

export default GetShippingButton;
