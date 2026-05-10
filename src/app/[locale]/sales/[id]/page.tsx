import { SalesDiscountPage } from "@/features/sales";
import { FC } from "react";

type PropsType = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
  searchParams: Promise<Record<string, string>>;
};

const Page: FC<PropsType> = async (props) => {
  return (
    <SalesDiscountPage
      params={props.params}
      searchParams={props.searchParams}
    />
  );
};

export default Page;
