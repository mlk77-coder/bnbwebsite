import { HomePage, HomePageMetaData } from "@/features/home";
import { FC } from "react";

type PropsType = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = HomePageMetaData;


const Page: FC<PropsType> = async (props) => {
  return <HomePage params={props.params} />;
};

export default Page;
