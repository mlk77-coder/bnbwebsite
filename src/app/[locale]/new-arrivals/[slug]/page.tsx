import {
  NewArrivalsCategoryPage,
  NewArrivalsCategoryPageMetaData,
} from "@/features/new-arrivals";
import { FC } from "react";

type PropsType = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
  searchParams: Promise<Record<string, string>>;
};

export const generateMetadata = NewArrivalsCategoryPageMetaData;

const Page: FC<PropsType> = async (props) => {
  return (
    <NewArrivalsCategoryPage
      params={props.params}
      searchParams={props.searchParams}
    />
  );
};

export default Page;
