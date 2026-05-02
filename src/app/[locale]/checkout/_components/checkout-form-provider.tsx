"use client";

import { Form } from "@/components/ui/form";
import { CustomSession } from "@/lib/auth-options";
import { splitCountryCode } from "@/lib/utils";
import { CheckoutSchema } from "@/schemas/checkout.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";

type PropsType = {
  children: React.ReactNode;
  session: CustomSession | null;
};

const CheckoutFormProvider: FC<PropsType> = ({ children, session }) => {
  const form = useForm<CheckoutSchema>({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      description: "",
      email: session?.user?.email || "",
      name: session?.user?.name || "",
      phone:
        session && session.user
          ? splitCountryCode(session.user.phone)
          : {
              code: "",
              number: "",
            },
      country: "",
      countryId: "",
      city_id: "",
      street: "",
    },
  });
  return <Form {...form}>{children}</Form>;
};

export default CheckoutFormProvider;
