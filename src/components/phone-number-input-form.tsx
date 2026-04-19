import { useFormContext } from "react-hook-form";
import PhoneNumberInput from "./phone-number-input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useTranslations } from "next-intl";
import { FC } from "react";

type PropsType = {
  borderColor?: "border" | "foreground";
};

const PhoneNumberInputForm: FC<PropsType> = ({
  borderColor = "foreground",
}) => {
  const form = useFormContext();
  const t = useTranslations();
  return (
    <FormField
      control={form.control}
      name="phone"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-start inline-block w-full capitalize">
            {t("form.fields.phone")}
          </FormLabel>
          <FormControl>
            <PhoneNumberInput
              phone={field.value}
              borderColor={borderColor}
              setPhone={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PhoneNumberInputForm;
