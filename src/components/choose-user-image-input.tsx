import { convertFileToURL } from '@/lib/utils';
import { Image } from 'lucide-react';
import { ElementRef, FC, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from './ui/button';
import { FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { useTranslations } from 'next-intl';

type PropsType = {
  placeholderImage?: string;
};

const ChooseUserImageInput: FC<PropsType> = ({ placeholderImage = '' }) => {
  const t = useTranslations();
  const tA11y = useTranslations('accessibility');
  const inputRef = useRef<ElementRef<'input'>>(null);
  const form = useFormContext();
  const file: File | undefined = form.watch('image');

  return (
    <div className='flex w-full items-center justify-start gap-4'>
      <button
        onClick={() => inputRef?.current?.click()}
        type='button'
        aria-label={tA11y('choose-profile-image')}
        className='bg-secondary flex size-32 items-center justify-center rounded-full'
      >
        {file?.name ? (
          <img
            className='size-full rounded-full object-cover'
            src={convertFileToURL(file)}
            alt={tA11y('profile-image')}
          />
        ) : placeholderImage ? (
          <img
            className='size-full rounded-full object-cover'
            src={placeholderImage}
            alt={tA11y('profile-image')}
          />
        ) : (
          <Image strokeWidth={1.1} className='size-14' />
        )}
      </button>
      <Button
        onClick={() => inputRef?.current?.click()}
        variant='link'
        type='button'
        className='capitalize underline-offset-4'
      >
        {t('choose-image')}
      </Button>
      <FormField
        control={form.control}
        name='image'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <input
                hidden
                type='file'
                ref={inputRef}
                onChange={e => {
                  if (e.target.files?.[0]) {
                    field.onChange(e.target.files?.[0]);
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ChooseUserImageInput;
