"use client";

import { setDefaultAddressAction } from "@/features/addresses/api/address-actions";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { invalidateAddressRelatedQueries } from "@/lib/address-query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { toast } from "sonner";

type PropsType = {
  id: number;
  token: string;
};

const SetDefaultAddress: FC<PropsType> = ({ id, token }) => {
  const t = useTranslations();
  const tAddress = useTranslations("address");
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: setDefaultAddressAction,
    onSuccess: (response) => {
      if (response === "success") {
        toast.success(tAddress("default-updated-success"));
        invalidateAddressRelatedQueries(queryClient);
      } else toast.error(response);
    },
  });

  return (
    <Tooltip text={t("address-fields.set-default")}>
      <Button
        className="size-9 rounded-full border-primary/10 text-primary hover:bg-primary/10 hover:text-primary"
        variant="outline"
        size="icon"
        disabled={isPending}
        onClick={() => mutate({ id, token })}
      >
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Star className="size-4" />
        )}
        <span className="sr-only">{t("address-fields.set-default")}</span>
      </Button>
    </Tooltip>
  );
};

export default SetDefaultAddress;
