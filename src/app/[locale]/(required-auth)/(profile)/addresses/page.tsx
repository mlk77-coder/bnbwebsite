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
    <div className="space-y-5">
      <h2 className="text-2xl font-bold ">{t("address.title")}</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="w-full border min-h-44 capitalize space-y-1 p-4 shadow rounded"
          >
            <p className="font-medium text-xl pb-2">{address?.name}</p>
            <Separator />
            <p className="pt-2">{`${address?.country} ${address?.city?.name}`}</p>
            <p className="pt-2">{`${address?.street}`}</p>
            <div className="flex justify-start items-center gap-4">
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
