"use client";

import ConfirmationDialog from "@/components/confirmation-dialog";
import { deleteAddressAction } from "@/features/addresses/api/address-actions";
import { Button } from "@/components/ui/button";
import { invalidateAddressRelatedQueries } from "@/lib/address-query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MapPinOff, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import { toast } from "sonner";

type PropsType = {
  id: number;
  name: string;
  token: string;
};

const RemoveAddress: FC<PropsType> = ({ id, name, token }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();
  const tAddress = useTranslations("address");
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: deleteAddressAction,
    onSuccess: (response) => {
      if (response === "success") {
        toast.success(tAddress("removed-success"));
        setIsOpen(false);
        invalidateAddressRelatedQueries(queryClient);
      } else toast.error(response);
    },
  });

  return (
    <ConfirmationDialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title={t("global.remove")}
      description={t("are-you-sure-you-want-to-remove-this-address", { name })}
      icon={MapPinOff}
      confirmLabel={t("global.remove")}
      onConfirm={() => mutate({ id, token })}
      isPending={isPending}
      trigger={
        <Button
          className="size-9 rounded-full border-destructive/10 text-destructive hover:bg-destructive/10 hover:text-destructive"
          size="icon"
          title={t("global.remove")}
          variant="outline"
        >
          <Trash2 className="size-4" />
          <span className="sr-only">{t("global.remove")}</span>
        </Button>
      }
    />
  );
};

export default RemoveAddress;
