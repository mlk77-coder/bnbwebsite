import { ComponentPropsWithoutRef } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface PropsType<
  T extends FieldValues,
  TName extends FieldPath<T> = FieldPath<T>
> extends Omit<ComponentPropsWithoutRef<"input">, "name"> {
  name: TName;
  label: string;
  control: Control<T>;
}

function FormInput<
  T extends FieldValues = FieldValues,
  TName extends FieldPath<T> = FieldPath<T>
>({ control, name, label, ...props }: PropsType<T, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-start inline-block w-full capitalize">{label}</FormLabel>
          <FormControl>
            <Input {...props} {...field} />
          </FormControl>
          <FormMessage className="capitalize font-normal" />
        </FormItem>
      )}
    />
  );
}

export default FormInput;
