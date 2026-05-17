'use client';

import { addProductCommentAction } from '@/features/products/api/product-comment-actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/loader';
import { cn } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Send, UserRound } from 'lucide-react';
import { usePathname, useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';
import { FC, FormEvent, useState } from 'react';
import { toast } from 'sonner';

type PropsType = {
  productId: number;
  token: string;
  isLoggedIn: boolean;
  userName?: string;
  userAvatar?: string | null;
};

const AddCommentForm: FC<PropsType> = ({
  productId,
  token,
  isLoggedIn,
  userName,
  userAvatar,
}) => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState('');
  const queryKey = ['product-comments', productId, token];

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (text: string) =>
      addProductCommentAction({ productId, token, comment: text }),
    onSuccess: result => {
      if (result === 'success') {
        setComment('');
        toast.success(t('product-social.comment-added'));
        queryClient.invalidateQueries({ queryKey });
      } else {
        toast.error(result);
      }
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = comment.trim();
    if (!trimmed) return;

    if (!isLoggedIn) {
      const callbackUrl = encodeURIComponent(pathname || '/');
      router.push(`/login?callbackUrl=${callbackUrl}`);
      return;
    }

    await mutateAsync(trimmed);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='border-border bg-background/95 sticky bottom-0 z-10 border-t pt-3 pb-1 backdrop-blur-sm'
    >
      <div className='flex items-center gap-2.5'>
        <Avatar className='border-border/70 size-9 shrink-0 border'>
          {userAvatar ? (
            <AvatarImage alt={userName || ''} src={userAvatar} />
          ) : null}
          <AvatarFallback className='bg-primary/10 text-primary text-xs'>
            {userName ? (
              userName.slice(0, 1).toUpperCase()
            ) : (
              <UserRound className='size-4' />
            )}
          </AvatarFallback>
        </Avatar>

        <div
          className={cn(
            'border-border focus-within:ring-primary/30 flex min-h-10 flex-1 items-center gap-2 rounded-full border bg-white px-4 py-1.5 transition-shadow focus-within:ring-2'
          )}
        >
          <input
            type='text'
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder={
              isLoggedIn
                ? t('product-social.add-comment-placeholder')
                : t('product-social.login-to-comment')
            }
            className='placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent text-sm outline-none'
            maxLength={500}
          />
          <Button
            type='submit'
            size='icon'
            variant='ghost'
            disabled={isPending || !comment.trim()}
            className='text-primary size-8 shrink-0 rounded-full'
            aria-label={t('product-social.post-comment')}
          >
            {isPending ? (
              <Loader className='size-4' />
            ) : (
              <Send className='size-4' />
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddCommentForm;
