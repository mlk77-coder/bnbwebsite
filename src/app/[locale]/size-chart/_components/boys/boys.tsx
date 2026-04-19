import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";
import Apparel from "./apparel";
import Bathrobes from "./bathrobes";
import Footwear from "./footwear";
import Gloves from "./gloves";
import Hats from "./hats";
import Scarves from "./scarves";
import Socks from "./socks";
import Underwear from "./underwear";

const Boys = () => {
  const t = useTranslations();
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="hover:bg-background justify-center items-center">
          <span className="flex-1 inline-block size-full text-xl sm:text-2xl">
            {t("apparel")}
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <Apparel />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="hover:bg-background justify-center items-center">
          <span className="flex-1 inline-block size-full text-xl sm:text-2xl">
            {t("footwear")}
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <Footwear />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger className="hover:bg-background justify-center items-center">
          <span className="flex-1 inline-block size-full text-xl sm:text-2xl">
            {t("gloves")}
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <Gloves />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger className="hover:bg-background justify-center items-center">
          <span className="flex-1 inline-block size-full text-xl sm:text-2xl">
            {t("hats")}
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <Hats />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger className="hover:bg-background justify-center items-center">
          <span className="flex-1 inline-block size-full text-xl sm:text-2xl">
            {t("scarves")}
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <Scarves />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-7">
        <AccordionTrigger className="hover:bg-background justify-center items-center">
          <span className="flex-1 inline-block size-full text-xl sm:text-2xl">
            {t("Socks")}
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <Socks />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-9">
        <AccordionTrigger className="hover:bg-background justify-center items-center">
          <span className="flex-1 inline-block size-full text-xl sm:text-2xl">
            {t("underwear-pyjamas-and-swimsuits")}
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <Underwear />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-10">
        <AccordionTrigger className="hover:bg-background justify-center items-center">
          <span className="flex-1 inline-block size-full text-xl sm:text-2xl">
            {t("bathrobes")}
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <Bathrobes />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Boys;
