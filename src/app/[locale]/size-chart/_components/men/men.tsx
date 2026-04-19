import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";
import Apparel from "./apparel";
import Bathrobes from "./bathrobes";
import Belts from "./belts";
import Footwear from "./footwear";
import Gloves from "./gloves";
import Hats from "./hats";
import Jeans from "./jeans";
import Underwear from "./underwear";

const Men = () => {
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
      <AccordionItem value="item-2">
        <AccordionTrigger className="hover:bg-background justify-center items-center">
          <span className="flex-1 inline-block size-full text-xl sm:text-2xl">
            {t("jeans")}
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <Jeans />
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
            {t("belts")}
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <Belts />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-7">
        <AccordionTrigger className="hover:bg-background justify-center items-center">
          <span className="flex-1 inline-block size-full text-xl sm:text-2xl">
            {t("underwear-and-loungewear")}
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <Underwear />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-9">
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

export default Men;
