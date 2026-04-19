"use client";

import useGetCities from "@/app/hooks/use-get-cities";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import FormSelect from "./form-select";
import { cn } from "@/lib/utils";

export default function CitiesSelectForm({
  className,
  name = "country",
  cityName = "city",
}: {
  className?: string;
  name?: string;
  cityName?: string;
}) {
  const form = useFormContext();
  const country = form.watch(name);
  const { data, isPending, isError } = useGetCities(country);
  const t = useTranslations();

  return (
    <div className="w-full">
      <FormSelect
        className={cn("border-border", className)}
        control={form.control}
        label={t("form.city")}
        name={cityName}
        translateLabel={false}
        disabled={isPending || isError}
        list={data ? data : []}
        placeholder={t("form.placeholder.country")}
      />
    </div>
  );
}
