"use client";
import { addReviewAction } from "@/app/actions/reviews-action";
import FormInput from "@/components/form-input";
import FormTextArea from "@/components/form-text-area";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import StarRatings from "react-star-ratings";
import { toast } from "sonner";
import { z } from "zod";

type PropsType = {
  slug: string;
  token: string;
};

const schema = z.object({
  rate: z.number().min(1, "form.validation.rate"),
  name: z.string().min(1, "form.validation.name"),
  comment: z.string().min(1, "form.validation.comment"),
});

type schema = z.infer<typeof schema>;

const AddReview: FC<PropsType> = ({ slug, token }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations()
  const queryClient = useQueryClient();
  const form = useForm<schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      rate: 0,
      name: token ? "123" : "",
      comment: "",
    },
  });
  const { mutateAsync, isPending } = useMutation({
    mutationFn: addReviewAction,
    onSuccess: (response) => {
      if (response === "success") {
        setIsOpen(false);
        form.reset();
        toast.success("Review added successfully");
        queryClient.invalidateQueries({ queryKey: ["reviews", slug] });
      }
    },
  });
  const onSubmit = (data: schema) => {
    const body = new FormData();
    body.append("rate", data.rate.toString());
    body.append("comment", data.comment);
    if (!token) body.append("name", data.name);
    mutateAsync({ body, token, slug });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="rtl:flex-row-reverse" variant="link">
          <Plus className="size-4 me-1 rtl:ms-1" />
          {t('add-review')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen-sm">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            {t("reviews.write-review")}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="rate"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col justify-start items-start">
                    <FormLabel className="capitalize">
                      {t("form.fields.rate")}
                    </FormLabel>
                    <FormControl>
                      <StarRatings
                        rating={field?.value}
                        starDimension="25px"
                        starRatedColor="#eab308"
                        starHoverColor="#eab308"
                        changeRating={field.onChange}
                        numberOfStars={5}
                        name="rating"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {token ? null : (
                <div className="flex justify-center items-start gap-2">
                  <FormInput
                    control={form.control}
                    name="name"
                    label={t("form.fields.name")}
                  />
                </div>
              )}
              <FormTextArea
                control={form.control}
                name="comment"
                label={t("form.fields.rate-comment")}
              />
            </div>
            <DialogFooter>
              <Button disabled={isPending} type="submit">
                <SubmitButton
                  isPending={isPending}
                  text={t("reviews.send-review")}
                />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReview;
