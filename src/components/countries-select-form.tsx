"use client";

import useGetCountries from "@/app/hooks/use-get-countries";
import FormSelect from "./form-select";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import useCurrencyStore from "@/store/use-currency-store";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function CountriesSelectForm({
  className,
  name = "country",
}: {
  className?: string;
  name?: string;
}) {
  const { data, isPending, isError } = useGetCountries();
  const activeCountries = useCurrencyStore((state) => state.activeCountries);
  const form = useFormContext();
  const t = useTranslations();

  const selectedCountry = form.watch(name);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (selectedCountry && !initialized) {
      setInitialized(true);
    } else if (selectedCountry && initialized) {
      form.setValue("city", "");
    }
  }, [selectedCountry]);

  return (
    <div className="w-full">
      <FormSelect
        className={cn("border-border", className)}
        control={form.control}
        label={t("form.country")}
        name={name}
        translateLabel={false}
        disabled={isPending || isError}
        list={data ? data.filter((c) => activeCountries.includes(c.id)) : []}
        placeholder={t("form.placeholder.country")}
      />
    </div>
  );
}
