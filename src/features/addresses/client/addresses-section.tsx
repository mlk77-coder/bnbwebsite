"use client";

import { getAddresses } from "@/features/addresses/api/get-addresses";
import AddNewAddress from "@/features/addresses/client/add-new-address";
import EditAddress from "@/features/addresses/client/edit-address";
import RemoveAddress from "@/features/addresses/client/remove-address";
import SetDefaultAddress from "@/features/addresses/client/set-default-address";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  formatAddressLocation,
  formatAddressStreet,
} from "@/lib/address-utils";
import { addressesListQueryKey } from "@/lib/address-query-keys";
import { CustomSession } from "@/lib/auth-options";
import type { Address } from "@/types/address";
import { useQuery } from "@tanstack/react-query";
import { Home } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC } from "react";

type PropsType = {
  locale: string;
  token: string;
  session: CustomSession;
  initialAddresses: Address[];
};

const AddressesSection: FC<PropsType> = ({
  locale,
  token,
  session,
  initialAddresses,
}) => {
  const t = useTranslations();
  const { data: addresses = initialAddresses } = useQuery({
    queryKey: addressesListQueryKey(locale, token),
    queryFn: async () => {
      const response = await getAddresses(locale, token);
      if (!response.ok) throw new Error("Failed to fetch addresses");
      return response.data.data;
    },
    initialData: initialAddresses,
  });

  return (
    <>
      <div className="flex flex-col gap-3 rounded-3xl bg-secondary/40 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Home className="size-5" />
          </span>
          <div>
            <h2 className="text-2xl font-bold text-primary">
              {t("address.title")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("addresses-count", { count: addresses.length })}
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="group relative min-h-44 w-full overflow-hidden rounded-3xl border border-primary/10 bg-white p-4 capitalize shadow-sm shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/10"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative flex items-start justify-between gap-3 pb-2">
              <p className="text-xl font-bold text-primary">
                {address.address_name}
              </p>
              {address.is_default ? (
                <Badge variant="secondary">{t("address-fields.default")}</Badge>
              ) : null}
            </div>
            <Separator />
            <div className="relative space-y-2 pt-3 text-sm text-muted-foreground">
              <p>{formatAddressLocation(address)}</p>
              <p>{formatAddressStreet(address)}</p>
              {address.details ? <p>{address.details}</p> : null}
              <p>{address.phone}</p>
            </div>
            <div className="relative mt-4 flex flex-wrap items-center justify-start gap-4">
              <EditAddress address={address} session={session} />
              {!address.is_default ? (
                <SetDefaultAddress id={address.id} token={token} />
              ) : null}
              <RemoveAddress
                id={address.id}
                name={address.address_name}
                token={token}
              />
            </div>
          </div>
        ))}
        <AddNewAddress session={session} />
      </div>
    </>
  );
};

export default AddressesSection;
