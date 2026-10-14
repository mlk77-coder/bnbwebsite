'use client';

import { SheetClose } from '@/components/ui/sheet';
import { Link } from '@/navigation';
import { MessageCircle } from 'lucide-react';

type PropsType = {
  labels: {
    contactUs: string;
  };
};

const MenuBottomLinks = ({ labels }: PropsType) => {
  return (
    <SheetClose asChild>
      <Link
        href='/contact-us'
        className='bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/85 flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold shadow-[0_4px_14px_rgba(0,0,0,0.08)] transition-all'
      >
        <MessageCircle className='size-4 shrink-0' aria-hidden />
        {labels.contactUs}
      </Link>
    </SheetClose>
  );
};

export default MenuBottomLinks;
