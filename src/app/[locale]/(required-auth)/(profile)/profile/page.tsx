import {
  ProfilePageMetaData,
  ProfileSettingsPage,
} from "@/features/profile";
import { FC } from "react";

type PropsType = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = ProfilePageMetaData;

const Page: FC<PropsType> = async (props) => {
  return <ProfileSettingsPage params={props.params} />;
};

export default Page;
