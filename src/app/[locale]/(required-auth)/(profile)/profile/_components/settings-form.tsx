"use client";

import ChooseUserImageInput from "@/components/choose-user-image-input";
import FormCheckbox from "@/components/form-checkbox";
import FormInput from "@/components/form-input";
import FormSelect from "@/components/form-select";
import PhoneNumberInputForm from "@/components/phone-number-input-form";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CustomSession } from "@/lib/auth-options";
import { cn } from "@/lib/utils";
import { Profile } from "@/types/profile";
import { format, isFuture } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC } from "react";
import useUpdateProfile from "../_hooks/use-update-profile";

type PropsType = {
  userDetails: Profile;
  session: CustomSession;
};

const SettingsForm: FC<PropsType> = ({ userDetails, session }) => {
  const { form, isPending, onSubmit } = useUpdateProfile(userDetails, session);
  const t = useTranslations();

  return (
    <Form {...form}>
      <form className="w-full space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <ChooseUserImageInput placeholderImage={userDetails?.image || ""} />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-12">
          <FormInput
            className="border-border"
            control={form.control}
            name="name"
            label={t("form.fields.name")}
          />
          <FormInput
            className="border-border"
            control={form.control}
            name="email"
            inputMode="email"
            label={t("form.fields.email")}
          />
          <PhoneNumberInputForm borderColor="border" />
          <FormField
            control={form.control}
            name="birthdate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-start inline-block w-full capitalize">
                  {t("form.fields.birthdate")}
                </FormLabel>
                <Popover modal>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full ps-3 border-border text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    alignOffset={0}
                    sideOffset={0}
                    className="w-auto p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      defaultBirthday={
                        userDetails.birthdate
                          ? new Date(userDetails.birthdate)
                          : undefined
                      }
                      disabled={(date) => isFuture(date)}
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormSelect
            className="border-border"
            control={form.control}
            label={t("form.gender")}
            translateLabel={false}
            list={[
              { id: "male", name: t("gender.male") },
              { id: "female", name: t("gender.female") },
            ]}
            name="gender"
            placeholder={t("form.placeholder.gender")}
          />
        </div>
        <div className="w-full flex-col flex justify-start items-start gap-2">
          <FormCheckbox
            control={form.control}
            name="subscribed_to_emails"
            label={
              <p className="text-base normal-case">
                {t("register.enabled-email")}
              </p>
            }
          />
        </div>
        <Button disabled={isPending} className="uppercase">
          <SubmitButton isPending={isPending} text={t("update-details")} />
        </Button>
      </form>
    </Form>
  );
};

export default SettingsForm;
