import { HomePage, HomePageMetaData } from "@/features/home";
import { FC } from "react";

type PropsType = {
  params: Promise<{ locale: string }>;
};

export { HomePageMetaData as generateMetadata };


const Page: FC<PropsType> = async (props) => {
  return <HomePage params={props.params} />;
};

export default Page;
