import { CheckoutPage, CheckoutPageMetaData } from "@/features/checkout";
import { Metadata } from "next";
import { FC } from "react";

type PropsType = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = CheckoutPageMetaData;

const Page: FC<PropsType> = async (props) => {
  return <CheckoutPage params={props.params} />;
};

export default Page;
