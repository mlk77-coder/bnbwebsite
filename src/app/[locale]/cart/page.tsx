import { CartPage, CartPageMetaData } from "@/features/cart";
import { Metadata } from "next";
import { FC } from "react";

type PropsType = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = CartPageMetaData;

const Page: FC<PropsType> = async (props) => {
  return <CartPage params={props.params} />;
};

export default Page;
