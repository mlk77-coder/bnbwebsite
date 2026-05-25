'use client';

import { addReelCommentAction } from '@/features/reels/api/reel-comment-actions';
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
  reelId: number;
  token: string;
  isLoggedIn: boolean;
  userName?: string;
  userAvatar?: string | null;
  variant?: 'default' | 'overlay';
  className?: string;
};

const ReelAddCommentForm: FC<PropsType> = ({
  reelId,
  token,
  isLoggedIn,
  userName,
  userAvatar,
  variant = 'default',
  className,
}) => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const [body, setBody] = useState('');
  const queryKey = ['reel-comments', reelId, token];
  const isOverlay = variant === 'overlay';

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (text: string) =>
      addReelCommentAction({ reelId, token, comment: text }),
    onSuccess: result => {
      if (result === 'success') {
        setBody('');
        toast.success(t('product-social.comment-added'));
        queryClient.invalidateQueries({ queryKey });
      } else {
        toast.error(result);
      }
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = body.trim();
    if (!trimmed) return;

    if (!isLoggedIn) {
      router.push(
        `/login?${new URLSearchParams({ callbackUrl: pathname || '/' }).toString()}`
      );
      return;
    }

    await mutateAsync(trimmed);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'pt-3',
        isOverlay
          ? 'border-t border-white/15'
          : 'border-border bg-background/95 sticky bottom-0 z-10 border-t pb-1 backdrop-blur-sm',
        className
      )}
    >
      <div className='flex items-center gap-2.5'>
        <Avatar
          className={cn(
            'size-9 shrink-0 border',
            isOverlay ? 'border-white/25' : 'border-border/70'
          )}
        >
          {userAvatar ? (
            <AvatarImage alt={userName || ''} src={userAvatar} />
          ) : null}
          <AvatarFallback
            className={cn(
              'text-xs',
              isOverlay ? 'bg-white/15 text-white' : 'bg-primary/10 text-primary'
            )}
          >
            {userName ? (
              userName.slice(0, 1).toUpperCase()
            ) : (
              <UserRound className='size-4' />
            )}
          </AvatarFallback>
        </Avatar>

        <div
          className={cn(
            'flex min-h-10 flex-1 items-center gap-2 rounded-full border px-4 py-1.5 transition-shadow focus-within:ring-2',
            isOverlay
              ? 'border-white/20 bg-black/40 focus-within:ring-white/30'
              : 'border-border focus-within:ring-primary/30 bg-white'
          )}
        >
          <input
            type='text'
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder={
              isLoggedIn
                ? t('product-social.add-comment-placeholder')
                : t('product-social.login-to-comment')
            }
            className={cn(
              'min-w-0 flex-1 bg-transparent text-sm outline-none',
              isOverlay
                ? 'text-white placeholder:text-white/50'
                : 'placeholder:text-muted-foreground'
            )}
            maxLength={500}
          />
          <Button
            type='submit'
            size='icon'
            variant='ghost'
            disabled={isPending || !body.trim()}
            className={cn(
              'size-8 shrink-0 rounded-full',
              isOverlay ? 'text-white hover:bg-white/10' : 'text-primary'
            )}
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

export default ReelAddCommentForm;
