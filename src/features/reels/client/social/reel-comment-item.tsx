'use client';

import { deleteReelCommentAction } from '@/features/reels/api/reel-comment-actions';
import ConfirmationDialog from '@/components/confirmation-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ReelComment } from '@/types/reel-social';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MoreHorizontal, Trash2, UserRound } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import { toast } from 'sonner';

type PropsType = {
  comment: ReelComment;
  reelId: number;
  token: string;
  canDelete: boolean;
  variant?: 'default' | 'overlay';
};

const ReelCommentItem: FC<PropsType> = ({
  comment,
  reelId,
  token,
  canDelete,
  variant = 'default',
}) => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const queryKey = ['reel-comments', reelId, token];
  const isOverlay = variant === 'overlay';
  const showDelete = canDelete && comment.isMine;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () =>
      deleteReelCommentAction({
        reelId,
        commentId: comment.id,
        token,
      }),
    onSuccess: result => {
      if (result === 'success') {
        toast.success(t('product-social.comment-deleted'));
        queryClient.invalidateQueries({ queryKey });
        setMenuOpen(false);
        setConfirmOpen(false);
      } else {
        toast.error(result);
      }
    },
  });

  return (
    <article className='flex gap-3 py-3'>
      <Avatar
        className={cn(
          'size-9 shrink-0 border',
          isOverlay ? 'border-white/25' : 'border-border/70'
        )}
      >
        {comment.userAvatar ? (
          <AvatarImage alt={comment.userName} src={comment.userAvatar} />
        ) : null}
        <AvatarFallback
          className={cn(
            'text-xs font-semibold',
            isOverlay ? 'bg-white/15 text-white' : 'bg-primary/10 text-primary'
          )}
        >
          {comment.userName ? (
            comment.userName.slice(0, 1).toUpperCase()
          ) : (
            <UserRound className='size-4' />
          )}
        </AvatarFallback>
      </Avatar>

      <div className='min-w-0 flex-1'>
        <div
          className={cn(
            'inline-block max-w-full rounded-2xl px-3.5 py-2.5',
            isOverlay ? 'bg-black/50' : 'bg-muted/50'
          )}
        >
          <p
            className={cn(
              'text-sm leading-snug font-semibold',
              isOverlay ? 'text-white' : 'text-foreground'
            )}
          >
            {comment.userName}
          </p>
          <p
            className={cn(
              'mt-0.5 text-sm leading-relaxed wrap-break-word',
              isOverlay ? 'text-white/90' : 'text-foreground'
            )}
          >
            {comment.body}
          </p>
        </div>
        <p
          className={cn(
            'mt-1 px-1 text-xs',
            isOverlay ? 'text-white/50' : 'text-muted-foreground'
          )}
        >
          {comment.createdAt}
        </p>
      </div>

      {showDelete ? (
        <div className='relative shrink-0'>
          <Button
            type='button'
            variant='ghost'
            size='icon'
            className={cn(
              'size-8 hover:bg-white/10',
              isOverlay
                ? 'text-white/70 hover:text-white'
                : 'text-muted-foreground'
            )}
            onClick={() => setMenuOpen(open => !open)}
            aria-label={t('product-social.comment-options')}
          >
            <MoreHorizontal className='size-4' />
          </Button>
          {menuOpen ? (
            <>
              <button
                type='button'
                className='fixed inset-0 z-10'
                aria-hidden
                onClick={() => setMenuOpen(false)}
              />
              <div className='border-border absolute end-0 z-20 mt-1 min-w-36 overflow-hidden rounded-xl border bg-white shadow-lg'>
                <button
                  type='button'
                  onClick={() => {
                    setMenuOpen(false);
                    setConfirmOpen(true);
                  }}
                  className='text-destructive hover:bg-destructive/5 flex w-full items-center gap-2 px-3 py-2.5 text-sm font-medium'
                >
                  <Trash2 className='size-4' />
                  {t('product-social.delete-comment')}
                </button>
              </div>
            </>
          ) : null}

          <ConfirmationDialog
            open={confirmOpen}
            onOpenChange={setConfirmOpen}
            title={t('product-social.delete-comment-title')}
            description={t('product-social.delete-comment-description')}
            icon={Trash2}
            confirmLabel={t('product-social.delete-comment')}
            onConfirm={() => mutateAsync()}
            isPending={isPending}
          />
        </div>
      ) : null}
    </article>
  );
};

export default ReelCommentItem;
