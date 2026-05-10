import {
  OrdersPageMetaData,
  ProfileOrdersPage,
} from "@/features/orders";
import { FC } from "react";

type PropsType = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = OrdersPageMetaData;

const Page: FC<PropsType> = async (props) => {
  return <ProfileOrdersPage params={props.params} />;
};

export default Page;
