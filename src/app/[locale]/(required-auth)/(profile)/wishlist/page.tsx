import { WishlistPage, WishlistPageMetaData } from "@/features/wishlist";
import { FC } from "react";

type PropsType = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = WishlistPageMetaData;

const Page: FC<PropsType> = async (props) => {
  return <WishlistPage params={props.params} />;
};

export default Page;
