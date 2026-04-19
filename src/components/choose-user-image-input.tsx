import { convertFileToURL } from "@/lib/utils";
import { Image } from "lucide-react";
import { ElementRef, FC, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "./ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useTranslations } from "next-intl";

type PropsType = {
  placeholderImage?: string;
};

const ChooseUserImageInput: FC<PropsType> = ({ placeholderImage = "" }) => {
  const t = useTranslations();
  const inputRef = useRef<ElementRef<"input">>(null);
  const form = useFormContext();
  const file: File | undefined = form.watch("image");

  return (
    <div className="w-full flex gap-4 justify-start items-center">
      <button
        onClick={() => inputRef?.current?.click()}
        type="button"
        aria-label="choose profile image"
        className="size-32 bg-secondary flex justify-center items-center rounded-full"
      >
        {file?.name ? (
          <img
            className="size-full object-cover rounded-full"
            src={convertFileToURL(file)}
            alt="profile image"
          />
        ) : placeholderImage ? (
          <img
            className="size-full object-cover rounded-full"
            src={placeholderImage}
            alt="profile image"
          />
        ) : (
          <Image strokeWidth={1.1} className="size-14" />
        )}
      </button>
      <Button
        onClick={() => inputRef?.current?.click()}
        variant="link"
        type="button"
        className="capitalize underline-offset-4"
      >
        {t('choose-image')}
      </Button>
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <input
                hidden
                type="file"
                ref={inputRef}
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    field.onChange(e.target.files?.[0]);
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ChooseUserImageInput;
