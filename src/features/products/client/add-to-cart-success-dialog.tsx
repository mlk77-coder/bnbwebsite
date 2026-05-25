'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Link } from '@/navigation';
import useProductDetailsStore from '@/store/use-product-details-store';
import { Check } from 'lucide-react';
import { FC, Suspense } from 'react';
import ProductPreview from '@/features/products/client/product-preview';
import ClientRelatedProducts from '@/features/products/client/ClientRelatedProducts';
import { useTranslations } from 'next-intl';

type PropsType = {
  isOpen: boolean;
  onClose: () => void;
};

const AddToCartSuccessDialog: FC<PropsType> = ({ isOpen, onClose }) => {
  const setQuantity = useProductDetailsStore(state => state.setQuantity);
  const t = useTranslations();
  const tProduct = useTranslations('product');
  return (
    <Suspense fallback={null}>
      <Dialog
        open={isOpen}
        onOpenChange={() => {
          onClose();
          setQuantity(1);
        }}
      >
        <DialogContent className='max-w-[95vw] sm:max-w-[90vw] max-h-[90vh] overflow-y-auto md:max-w-screen-md lg:max-w-screen-lg'>
          <DialogHeader>
            <DialogTitle className='flex justify-start items-center gap-2 text-base sm:text-lg font-medium ltr:tracking-wide'>
              <Check className='w-4 h-4 sm:w-5 sm:h-5' />
              <span>{t('this-item-has-been-added-to-your-cart')}</span>
            </DialogTitle>
            <DialogDescription className='sr-only'>
              {tProduct('add-to-cart-success-description')}
            </DialogDescription>
          </DialogHeader>
          <div className='w-full flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 md:gap-8'>
            <ProductPreview />
            <div className='space-y-3 w-full sm:w-1/2 md:w-1/3 flex flex-col justify-start items-center'>
              <DialogClose asChild>
                <Button
                  size='lg'
                  variant='outline'
                  className='w-full uppercase text-xs sm:text-sm'
                >
                  {t('continue-shopping')}
                </Button>
              </DialogClose>
              <Link
                href='/cart'
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'uppercase w-full text-xs sm:text-sm'
                )}
              >
                {t('view-cart')}
              </Link>
            </div>
          </div>
          <Separator className='h-0.5 bg-orange' />

          <ClientRelatedProducts />
        </DialogContent>
      </Dialog>
    </Suspense>
  );
};

export default AddToCartSuccessDialog;
