import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import QuantityInput from "./quantity-input";
import { useTranslations } from "next-intl";

interface PropsType<
  T extends FieldValues,
  TName extends FieldPath<T> = FieldPath<T>
> {
  name: TName;
  showLabel?: boolean;
  control: Control<T>;
  size?: "default" | "sm";
}

function QuantityInputForm<
  T extends FieldValues = FieldValues,
  TName extends FieldPath<T> = FieldPath<T>
>({ control, name, showLabel, size = "default" }: PropsType<T, TName>) {
  const t = useTranslations();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex justify-start items-center gap-3">
          {showLabel ? (
            <FormLabel className="font-bold text-primary capitalize">
              {t("quantity")}
            </FormLabel>
          ) : null}
          <FormControl>
            <QuantityInput
              setValue={field.onChange}
              value={field.value}
              size={size}
            />
          </FormControl>
          <FormMessage className="capitalize font-normal" />
        </FormItem>
      )}
    />
  );
}

export default QuantityInputForm;
