import { CheckoutPage } from "@/features/checkout";
import { FC } from "react";

type PropsType = {
  params: Promise<{ locale: string }>;
};

const Page: FC<PropsType> = async (props) => {
  return <CheckoutPage params={props.params} />;
};

export default Page;
