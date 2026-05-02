"use client";

import { getAddresses } from "@/api/addresses/get-addresses";
import { getCitiesOptions } from "@/app/hooks/use-get-cities";
import { getCountriesOptions } from "@/app/hooks/use-get-countries";
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
import {
  formatAddressStreet,
  normalizeAddressText,
} from "@/lib/address-utils";
import useCheckoutStore from "@/store/use-checkout-store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, ChevronsUpDown, Loader2, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import { useFormContext } from "react-hook-form";
import SelectAddress from "./select-address";

type PropsType = {
  token: string;
};

const SelectAddressFormInput: FC<PropsType> = ({ token }) => {
  const [open, setOpen] = useState(false);
  const form = useFormContext();
  const t = useTranslations();
  const queryClient = useQueryClient();
  const setShipping = useCheckoutStore((state) => state.setShipping);
  const { data, isPending, isError } = useQuery({
    queryKey: ["address", token],
    queryFn: async () => {
      const response = await getAddresses("en", token);
      if (!response.ok) throw new Error("Failed to fetch addresses");
      return response.data.data;
    },
  });
  const { data: countries = [] } = useQuery(getCountriesOptions("en"));

  return (
    <FormField
      control={form.control}
      name="street"
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
                  className="w-full font-normal justify-between"
                  disabled={isPending}
                >
                  {form.watch("country")
                    ? `${form.watch("country")}`
                    : t("select-an-address")}
                  {isPending ? (
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
                      <SelectAddress checkoutForm={form} session={token}>
                        <button className="relative w-full cursor-pointer flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none">
                          <Plus className="me-2 h-4 w-4" />
                          {t("address.add.title")}
                        </button>
                      </SelectAddress>
                      {data?.map((address) => (
                        <CommandItem
                          key={address.id}
                          onSelect={async () => {
                            const currentCountry = form.getValues("country");
                            const currentStreet = form.getValues("street");
                            const currentCityId = form.getValues("city_id");
                            const street = formatAddressStreet(address);
                            const country = countries.find(
                              (country) =>
                                normalizeAddressText(country.name) ===
                                normalizeAddressText(address.country)
                            );
                            const cities = country
                              ? await queryClient.fetchQuery(
                                  getCitiesOptions(country.id, "en")
                                )
                              : [];
                            const city = cities.find(
                              (city) =>
                                normalizeAddressText(city.name) ===
                                normalizeAddressText(address.city)
                            );

                            if (
                              currentCountry !== address.address_name ||
                              currentStreet !== street ||
                              currentCityId !== city?.id.toString()
                            ) {
                              form.setValue("street", street);
                              form.setValue("city_id", city?.id.toString() || "");
                              form.setValue("country", address.address_name);
                              form.setValue(
                                "countryId",
                                country?.id.toString() || ""
                              );
                              setShipping(-1);
                            }
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${
                              field.value === formatAddressStreet(address)
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
          <FormMessage className="capitalize font-normal" />
        </FormItem>
      )}
    />
  );
};

export default SelectAddressFormInput;
