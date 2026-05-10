"use client";

import { getAddresses } from "@/features/addresses/api/get-addresses";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SelectAddress from "@/features/checkout/client/select-address";
import type { CheckoutSchema } from "@/schemas/checkout.schema";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown, Loader2, Plus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { FC, useState } from "react";
import { useFormContext } from "react-hook-form";

type PropsType = {
  token: string;
};

const SelectAddressFormInput: FC<PropsType> = ({ token }) => {
  const [open, setOpen] = useState(false);
  const form = useFormContext<CheckoutSchema>();
  const t = useTranslations();
  const locale = useLocale();
  const { data, isPending, isError } = useQuery({
    queryKey: ["address", token, locale],
    queryFn: async () => {
      const response = await getAddresses(locale, token);
      if (!response.ok) throw new Error("Failed to fetch addresses");
      return response.data.data;
    },
  });

  const addressId = form.watch("address_id");
  const selected = data?.find((a) => a.id === addressId);
  const triggerLabel =
    selected?.address_name ?? t("select-an-address");

  return (
    <FormField
      control={form.control}
      name="address_id"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-start inline-block w-full capitalize">
            {t("select-an-address")}
          </FormLabel>
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between font-normal"
                  disabled={isPending}
                >
                  {triggerLabel}
                  {isPending ? (
                    <Loader2 className="ml-2 size-4 shrink-0 animate-spin" />
                  ) : (
                    <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 PopoverContent">
                <Command>
                  <CommandInput placeholder={t("search")} />
                  <CommandList>
                    <CommandEmpty>{t("no-addresses-found")}</CommandEmpty>
                    <CommandGroup>
                      {isError && (
                        <CommandItem>
                          {t("error-loading-addresses-please-try-again")}
                        </CommandItem>
                      )}
                      <SelectAddress session={token}>
                        <button
                          type="button"
                          className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none"
                        >
                          <Plus className="me-2 size-4" />
                          {t("address.add.title")}
                        </button>
                      </SelectAddress>
                      {data?.map((address) => (
                        <CommandItem
                          key={address.id}
                          onSelect={() => {
                            field.onChange(address.id);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={`mr-2 size-4 shrink-0 ${
                              field.value === address.id
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          />
                          {address.address_name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage className="font-normal capitalize" />
        </FormItem>
      )}
    />
  );
};

export default SelectAddressFormInput;
