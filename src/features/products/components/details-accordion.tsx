import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getTranslations } from 'next-intl/server';
import ProductDetails from '@/features/products/components/product-details';
import DeliveryAlert from '@/features/products/client/delivery-alert';

const DetailsAccordion = async ({
  details,
}: {
  details: Record<string, string>;
}) => {
  const t = await getTranslations();
  return (
    <Accordion className='md:hidden' type='single' collapsible>
      <AccordionItem value='1'>
        <AccordionTrigger className='hover:bg-transparent'>
          {t('product-details')}
        </AccordionTrigger>
        <AccordionContent>
          <ProductDetails details={details} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='2'>
        <AccordionTrigger className='hover:bg-transparent'>
          {t('delivery')}
        </AccordionTrigger>
        <AccordionContent>
          <div className='mt-2 mb-4'>
            <DeliveryAlert />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DetailsAccordion;
