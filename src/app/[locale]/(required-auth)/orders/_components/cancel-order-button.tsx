"use client";

import { cancelOrderApi } from "@/api/order/create-order";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/navigation";
import { type FC, useState } from "react";
import { toast } from "sonner";

type PropsType = {
  orderId: number;
  token: string;
};

const CancelOrderButton: FC<PropsType> = ({ orderId, token }) => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [reason, setReason] = useState("");
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async () =>
      cancelOrderApi(
        orderId,
        {
          reason: reason.trim().length ? reason.trim() : t("cancel-order"),
        },
        token,
        locale,
      ),
    onSuccess: (payload) => {
      if (payload.success) {
        toast.success(payload.message ?? t("order-cancelled-success"));
        setOpen(false);
        router.refresh();
      } else {
        toast.error(payload.message ?? "Error");
      }
    },
    onError: () => toast.error(t("error-something-went-wrong")),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="destructive">
          {t("cancel-order")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("cancel-order")}</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 py-2">
          <Label htmlFor="cancel-reason">{t("cancel-order-reason")}</Label>
          <Textarea
            id="cancel-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={t("cancel-order-reason")}
            rows={3}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              {t("global.cancel")}
            </Button>
          </DialogClose>
          <Button type="button" disabled={isPending} onClick={() => mutate()}>
            <SubmitButton
              isPending={isPending}
              text={t("cancel-order-confirm")}
            />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelOrderButton;
