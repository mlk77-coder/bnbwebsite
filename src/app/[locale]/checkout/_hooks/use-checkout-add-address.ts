import { addAddressAction } from '@/app/actions/address-action';
import { invalidateAddressRelatedQueries } from '@/lib/address-query-keys';
import { toAddressPayload } from '@/lib/address-utils';
import { AddAddressSchema } from '@/schemas/addresses.schema';
import useCheckoutStore from '@/store/use-checkout-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const useCheckoutAddAddress = (
  token: string,
  setOpen: Dispatch<SetStateAction<boolean>>
) => {
  const setShipping = useCheckoutStore(state => state.setShipping);
  const queryClient = useQueryClient();
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
        code: '963',
        number: '',
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
    setOpen(false);

    if (token) mutate({ body: toAddressPayload(data), token });
  };
  return { form, isPending, onSubmit };
};

export default useCheckoutAddAddress;
