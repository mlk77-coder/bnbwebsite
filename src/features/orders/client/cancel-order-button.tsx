"use client";

import ConfirmationDialog from "@/components/confirmation-dialog";
import { cancelOrderApi } from "@/features/orders/api/create-order";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "@/navigation";
import { useMutation } from "@tanstack/react-query";
import { Ban } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
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
        toast.error(payload.message ?? t("errors.generic"));
      }
    },
    onError: () => toast.error(t("error-something-went-wrong")),
  });

  return (
    <ConfirmationDialog
      open={open}
      onOpenChange={setOpen}
      title={t("cancel-order")}
      icon={Ban}
      confirmLabel={t("cancel-order-confirm")}
      onConfirm={() => mutate()}
      isPending={isPending}
      trigger={
        <Button type="button" variant="destructive">
          {t("cancel-order")}
        </Button>
      }
    >
      <div className="space-y-2 pb-2">
        <Label htmlFor="cancel-reason">{t("cancel-order-reason")}</Label>
        <Textarea
          id="cancel-reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder={t("cancel-order-reason")}
          rows={3}
        />
      </div>
    </ConfirmationDialog>
  );
};

export default CancelOrderButton;
