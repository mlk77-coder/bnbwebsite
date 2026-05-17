'use client';

import { deleteProductCommentAction } from '@/features/products/api/product-comment-actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Loader from '@/components/ui/loader';
import { cn } from '@/lib/utils';
import { ProductComment } from '@/types/product-social';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import { MoreHorizontal, Trash2, UserRound } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import { toast } from 'sonner';

type PropsType = {
  comment: ProductComment;
  productId: number;
  token: string;
  currentUserId?: number | string;
  canDelete: boolean;
};

const CommentItem: FC<PropsType> = ({
  comment,
  productId,
  token,
  currentUserId,
  canDelete,
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const queryClient = useQueryClient();
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const queryKey = ['product-comments', productId, token];

  const isOwner =
    canDelete &&
    currentUserId !== undefined &&
    String(comment.userId) === String(currentUserId);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () =>
      deleteProductCommentAction({
        productId,
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

  const relativeTime = formatDistanceToNow(new Date(comment.createdAt), {
    addSuffix: true,
    locale: locale === 'ar' ? ar : enUS,
  });

  return (
    <article className='flex gap-3 py-3'>
      <Avatar className='border-border/70 size-9 shrink-0 border'>
        {comment.userAvatar ? (
          <AvatarImage alt={comment.userName} src={comment.userAvatar} />
        ) : null}
        <AvatarFallback className='bg-primary/10 text-primary text-xs font-semibold'>
          {comment.userName ? (
            comment.userName.slice(0, 1).toUpperCase()
          ) : (
            <UserRound className='size-4' />
          )}
        </AvatarFallback>
      </Avatar>

      <div className='min-w-0 flex-1'>
        <CommentBubble comment={comment} relativeTime={relativeTime} />
      </div>

      {isOwner ? (
        <div className='relative shrink-0'>
          <Button
            type='button'
            variant='ghost'
            size='icon'
            className='text-muted-foreground size-8'
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
              <div
                className={cn(
                  'border-border absolute end-0 z-20 mt-1 min-w-36 overflow-hidden rounded-xl border bg-white shadow-lg'
                )}
              >
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

          <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <DialogContent className='max-w-sm'>
              <DialogHeader>
                <DialogTitle>
                  {t('product-social.delete-comment-title')}
                </DialogTitle>
                <DialogDescription>
                  {t('product-social.delete-comment-description')}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className='gap-2 sm:gap-0'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setConfirmOpen(false)}
                >
                  {t('product-social.cancel')}
                </Button>
                <Button
                  type='button'
                  variant='destructive'
                  disabled={isPending}
                  onClick={() => mutateAsync()}
                >
                  {isPending ? (
                    <Loader className='size-4' />
                  ) : (
                    t('product-social.delete-comment')
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ) : null}
    </article>
  );
};

function CommentBubble({
  comment,
  relativeTime,
}: {
  comment: ProductComment;
  relativeTime: string;
}) {
  return (
    <>
      <div className='bg-muted/50 inline-block max-w-full rounded-2xl px-3.5 py-2.5'>
        <p className='text-foreground text-sm leading-snug font-semibold'>
          {comment.userName}
        </p>
        <p className='text-foreground mt-0.5 text-sm leading-relaxed wrap-break-word'>
          {comment.comment}
        </p>
      </div>
      <p className='text-muted-foreground mt-1 px-1 text-xs'>{relativeTime}</p>
    </>
  );
}

export default CommentItem;
