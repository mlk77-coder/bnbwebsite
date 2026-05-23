'use client';
import { addReviewAction } from '@/app/actions/reviews-action';
import FormTextArea from '@/components/form-text-area';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { usePathname, useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import StarRatings from 'react-star-ratings';
import { toast } from 'sonner';
import { z } from 'zod';

type PropsType = {
  slug: string;
  token: string;
};

const schema = z.object({
  rating: z.number().min(1, 'form.validation.rate'),
  comment: z.string().min(1, 'form.validation.comment'),
});

type schema = z.infer<typeof schema>;

const AddReview: FC<PropsType> = ({ slug, token }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const form = useForm<schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      rating: 0,
      comment: '',
    },
  });
  const { mutateAsync, isPending } = useMutation({
    mutationFn: addReviewAction,
    onSuccess: response => {
      if (response === 'success') {
        setIsOpen(false);
        form.reset();
        toast.success(t('reviews.added-success'));
        queryClient.invalidateQueries({ queryKey: ['reviews'] });
      } else {
        toast.error(response);
      }
    },
  });

  const handleOpen = () => {
    if (!token) {
      const callbackUrl = encodeURIComponent(pathname || '/');
      router.push(`/login?callbackUrl=${callbackUrl}`);
      return;
    }
    setIsOpen(true);
  };

  const onSubmit = (data: schema) => {
    const body = {
      rating: data.rating,
      comment: data.comment,
    };
    mutateAsync({ body, token, slug });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        className='rtl:flex-row-reverse'
        variant='link'
        onClick={handleOpen}
      >
        <Plus className='size-4 me-1 rtl:ms-1' />
        {t('add-review')}
      </Button>
      <DialogContent className='max-w-screen-sm'>
        <DialogHeader>
          <DialogTitle className='text-center text-2xl'>
            {t('reviews.write-review')}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-2'>
              <FormField
                control={form.control}
                name='rating'
                render={({ field }) => (
                  <FormItem className='w-full flex flex-col justify-start items-start'>
                    <FormLabel className='capitalize'>
                      {t('form.fields.rate')}
                    </FormLabel>
                    <FormControl>
                      <StarRatings
                        rating={field?.value}
                        starDimension='25px'
                        starRatedColor='#eab308'
                        starHoverColor='#eab308'
                        changeRating={rating => field.onChange(rating)}
                        numberOfStars={5}
                        name='rating'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormTextArea
                control={form.control}
                name='comment'
                label={t('form.fields.rate-comment')}
              />
            </div>
            <DialogFooter>
              <Button disabled={isPending} type='submit'>
                <SubmitButton
                  isPending={isPending}
                  text={t('reviews.send-review')}
                />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReview;
