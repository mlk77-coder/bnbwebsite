import { Control, FieldPath, FieldValues } from "react-hook-form";
import { Checkbox } from "./ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/form";

interface PropsType<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  label: React.ReactNode;
  description?: string;
  control: Control<TFieldValues>;
}

function FormCheckbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ control, name, label, description }: PropsType<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row-reverse items-baseline gap-2 space-y-0">
          <div className="space-y-1 leading-none">
            <FormLabel className="capitalize text-start w-full block font-normal">
              {label}
            </FormLabel>
            {description ? (
              <FormDescription>{description}</FormDescription>
            ) : null}
          </div>
          <FormControl>
            <Checkbox className="translate-y-0.5" checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export default FormCheckbox;
