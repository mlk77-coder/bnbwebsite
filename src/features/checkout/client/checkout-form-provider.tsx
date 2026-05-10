"use client";

import { Form } from "@/components/ui/form";
import { CheckoutSchema } from "@/schemas/checkout.schema";
import useCheckoutStore from "@/store/use-checkout-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";

type PropsType = {
  children: React.ReactNode;
  initialCartShipping?: number;
};

const CheckoutFormProvider: FC<PropsType> = ({
  children,
  initialCartShipping,
}) => {
  const setShipping = useCheckoutStore((s) => s.setShipping);

  useEffect(() => {
    if (initialCartShipping != null && initialCartShipping >= 0) {
      setShipping(initialCartShipping);
    }
  }, [initialCartShipping, setShipping]);

  const form = useForm<CheckoutSchema>({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      notes: "",
    },
  });
  return <Form {...form}>{children}</Form>;
};

export default CheckoutFormProvider;
