import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { getLangDir } from "rtl-detect";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface PropsType<
  TData extends { id: number | string; name: string },
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  label: string;
  placeholder?: string;
  list: TData[];
  className?: string;
  control: Control<TFieldValues>;
  disabled?: boolean;
  translateLabel?: boolean;
}

function FormSelect<
  TData extends { id: number | string; name: string },
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  placeholder,
  disabled = false,
  list,
  translateLabel = true,
  className,
}: PropsType<TData, TFieldValues, TName>) {
  const locale = useLocale();
  const dir = getLangDir(locale);
  const t = useTranslations();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{label}</FormLabel>
          <Select
            disabled={disabled}
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger dir={dir} className={cn("rounded-lg", className)}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="max-h-64">
              {list.map((item) => (
                <SelectItem
                  dir={dir}
                  key={item.id?.toString()}
                  value={item.id?.toString()}
                >
                  {translateLabel ? t(item.name) : item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage className="capitalize font-normal" />
        </FormItem>
      )}
    />
  );
}

export default FormSelect;
