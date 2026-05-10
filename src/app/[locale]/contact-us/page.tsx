import { ContactUsPage, ContactUsPageMetaData } from "@/features/contact-us";
import { FC } from "react";

export const generateMetadata = ContactUsPageMetaData;

const Page: FC = async () => {
  return <ContactUsPage />;
};

export default Page;
