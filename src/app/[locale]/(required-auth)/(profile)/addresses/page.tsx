import { cachedGetAddresses } from "@/api/addresses/get-addresses";
import { Separator } from "@/components/ui/separator";
import getSession from "@/lib/get-session";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { FC } from "react";
import AddNewAddress from "./_components/add-new-address";
import EditAddress from "./_components/edit-address";
import RemoveAddress from "./_components/remove-address";
import { Metadata } from "next";
import { headers } from "next/headers";
import { Home } from "lucide-react";

type PropsType = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("my-addresses"),
    robots: {
      index: false,
    },
  };
}

const AddressesPage: FC<PropsType> = async props => {
  const params = await props.params;

  const {
    locale
  } = params;

  const t = await getTranslations();
  const session = await getSession();
  const headersList = await headers();
  const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
    headers: headersList,
  });
  if (!session || !session.user) return notFound();

  const addressesResponse = await cachedGetAddresses(
    locale,
    session.user.access_token,
    request
  );
  if (!addressesResponse.ok) return notFound();

  const addresses = addressesResponse.data.locations;

  return (
    <div className="space-y-6">
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
            <p className="relative pb-2 text-xl font-bold text-primary">
              {address?.name}
            </p>
            <Separator />
            <div className="relative space-y-2 pt-3 text-sm text-muted-foreground">
              <p>{`${address?.country} ${address?.city?.name}`}</p>
              <p>{`${address?.street}`}</p>
            </div>
            <div className="relative mt-4 flex items-center justify-start gap-4">
              <EditAddress address={address} session={session} />
              <RemoveAddress
                id={address.id}
                name={address.name}
                token={session?.user?.access_token || ""}
              />
            </div>
          </div>
        ))}
        <AddNewAddress session={session} />
      </div>
    </div>
  );
};

export default AddressesPage;
