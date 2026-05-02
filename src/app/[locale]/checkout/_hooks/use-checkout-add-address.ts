import { addAddressAction } from '@/app/actions/address-action';
import { invalidateAddressRelatedQueries } from '@/lib/address-query-keys';
import { toAddressPayload } from '@/lib/address-utils';
import { AddAddressSchema } from '@/schemas/addresses.schema';
import useCheckoutStore from '@/store/use-checkout-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

const useCheckoutAddAddress = (
  token: string,
  checkoutForm: UseFormReturn<FieldValues>,
  setOpen: Dispatch<SetStateAction<boolean>>
) => {
  const setShipping = useCheckoutStore(state => state.setShipping);
  const queryClient = useQueryClient();
  const checkoutPhone = checkoutForm.getValues('phone') as
    | { code?: string; number?: string }
    | undefined;
  const form = useForm<AddAddressSchema>({
    resolver: zodResolver(AddAddressSchema),
    defaultValues: {
      type: 'home',
      address_name: '',
      city: '',
      area: '',
      street_address: '',
      building_number: '',
      details: '',
      phone: {
        code: checkoutPhone?.code || '963',
        number: checkoutPhone?.number || '',
      },
      is_default: false,
      latitude: '33.518538',
      longitude: '36.279089',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: addAddressAction,
    onSuccess: async data => {
      if (data === 'success') {
        toast.success('Address added successfully');
        setShipping(-1);
        invalidateAddressRelatedQueries(queryClient);
        form.reset();
        setOpen(false);
      } else toast.error(data);
    },
  });

  const onSubmit = (data: AddAddressSchema) => {
    checkoutForm.setValue('street', data.street_address);
    checkoutForm.setValue('country', data.address_name);
    setOpen(false);

    if (token) mutate({ body: toAddressPayload(data), token });
  };
  return { form, isPending, onSubmit };
};

export default useCheckoutAddAddress;
