'use client';

import ChooseUserImageInput from '@/components/choose-user-image-input';
import FormInput from '@/components/form-input';
import PhoneNumberInputForm from '@/components/phone-number-input-form';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useUpdateProfile from '@/features/profile/client/hooks/use-update-profile';
import { CustomSession } from '@/lib/auth-options';
import { Profile } from '@/types/profile';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

type PropsType = {
  userDetails: Profile;
  session: CustomSession;
};

const SettingsForm: FC<PropsType> = ({ userDetails, session }) => {
  const { form, isPending, onSubmit } = useUpdateProfile(userDetails, session);
  const t = useTranslations();

  return (
    <Form {...form}>
      <form className='w-full space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid gap-6'>
          <div className='bg-secondary/40 rounded-xl p-4'>
            <ChooseUserImageInput
              placeholderImage={userDetails?.avatar || ''}
            />
          </div>
          <div className='grid w-full grid-cols-1 gap-5 md:grid-cols-2'>
            <FormInput
              className='border-border bg-white'
              control={form.control}
              name='name'
              label={t('form.fields.name')}
            />
            <FormInput
              className='border-border bg-white'
              control={form.control}
              name='email'
              inputMode='email'
              label={t('form.fields.email')}
            />
            <div className='md:col-span-2'>
              <PhoneNumberInputForm borderColor='border' />
            </div>
          </div>
        </div>
        <div className='flex justify-end'>
          <Button disabled={isPending} className='rounded-lg px-8 uppercase'>
            <SubmitButton isPending={isPending} text={t('update-details')} />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SettingsForm;
