import {
  SaleSlugPage,
  SaleSlugPageMetaData,
} from "@/features/sale";
import { FC } from "react";

type PropsType = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
  searchParams: Promise<Record<string, string>>;
};

export const generateMetadata = SaleSlugPageMetaData;

const Page: FC<PropsType> = async (props) => {
  return (
    <SaleSlugPage params={props.params} searchParams={props.searchParams} />
  );
};

export default Page;
