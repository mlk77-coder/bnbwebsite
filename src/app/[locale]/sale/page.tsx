import {
  SaleRootPage,
  SaleRootPageMetaData,
} from "@/features/sale";
import { FC } from "react";

type PropsType = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<Record<string, string>>;
};

export const generateMetadata = SaleRootPageMetaData;

const Page: FC<PropsType> = async (props) => {
  return (
    <SaleRootPage params={props.params} searchParams={props.searchParams} />
  );
};

export default Page;
