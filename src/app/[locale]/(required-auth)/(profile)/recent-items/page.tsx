import {
  RecentItemsPage,
  RecentItemsPageMetaData,
} from "@/features/recent-items";
import { FC } from "react";

type PropsType = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = RecentItemsPageMetaData;

const Page: FC<PropsType> = async (props) => {
  return <RecentItemsPage params={props.params} />;
};

export default Page;
