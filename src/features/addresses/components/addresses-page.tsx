import AddressesSection from "@/features/addresses/client/addresses-section";
import { cachedGetAddresses } from "@/features/addresses/api/get-addresses";
import getSession from "@/lib/get-session";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { FC } from "react";

type PropsType = {
  params: Promise<{ locale: string }>;
};

const AddressesPage: FC<PropsType> = async (props) => {
  const params = await props.params;
  const { locale } = params;
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
  const addresses = addressesResponse.data.data;

  return (
    <div className="space-y-6">
      <AddressesSection
        locale={locale}
        token={session.user.access_token}
        session={session}
        initialAddresses={addresses}
      />
    </div>
  );
};

export default AddressesPage;
