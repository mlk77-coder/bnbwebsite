import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";

interface PropsType<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<ComponentPropsWithoutRef<"textarea">, "name"> {
  control: Control<TFieldValues>;
  name: TFieldName;
  label: string;
  labelClassName?: string | undefined;
}

const FormTextArea = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  labelClassName,
  ...props
}: PropsType<TFieldValues, TFieldName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className={cn(labelClassName, "capitalize")}>
            {label}
          </FormLabel>
          <FormControl>
            <Textarea dir="auto" {...props} {...field} />
          </FormControl>
          <FormMessage className="capitalize font-normal" />
        </FormItem>
      )}
    />
  );
};

export default FormTextArea;
