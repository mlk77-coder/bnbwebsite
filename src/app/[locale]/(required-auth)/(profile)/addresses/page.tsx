import { AddressesPage, AddressesPageMetaData } from "@/features/addresses";
import { FC } from "react";

type PropsType = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = AddressesPageMetaData;

const Page: FC<PropsType> = async (props) => {
  return <AddressesPage params={props.params} />;
};

export default Page;
