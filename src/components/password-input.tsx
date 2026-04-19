import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { ComponentPropsWithoutRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropsType<
  T extends FieldValues,
  TName extends FieldPath<T> = FieldPath<T>
> extends Omit<ComponentPropsWithoutRef<"input">, "name"> {
  name: TName;
  label: string;
  control: Control<T>;
  children?: React.ReactNode;
  descriptionClassName?: string;
}

function PasswordInput<
  T extends FieldValues = FieldValues,
  TName extends FieldPath<T> = FieldPath<T>
>({
  control,
  name,
  label,
  className,
  children,
  descriptionClassName = "",
  ...props
}: PropsType<T, TName>) {
  const [toggle, setToggle] = useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-start inline-block w-full capitalize">{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                className={cn("pr-12 capitalize", className)}
                type={toggle ? "text" : "password"}
                dir="ltr"
                {...props}
                {...field}
              />
              <button
                tabIndex={-1}
                onClick={() => setToggle((prev) => !prev)}
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-0.5 border-transparent border focus-visible:rounded focus-visible:border-primary focus-visible:outline-0"
              >
                {!toggle ? (
                  <Eye className="size-5 stroke-primary" />
                ) : (
                  <EyeOff className="size-5 stroke-primary" />
                )}
              </button>
            </div>
          </FormControl>
          <FormMessage className="capitalize font-normal" />
          {children ? (
            <FormDescription className={descriptionClassName}>
              {children}
            </FormDescription>
          ) : null}
        </FormItem>
      )}
    />
  );
}

export default PasswordInput;
