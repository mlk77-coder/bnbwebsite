"use client";

import { SheetClose } from "@/components/ui/sheet";
import { Link } from "@/navigation";
import { MessageCircle } from "lucide-react";

type PropsType = {
  labels: {
    contactUs: string;
  };
};

const MenuBottomLinks = ({ labels }: PropsType) => {
  return (
    <SheetClose asChild>
      <Link
        href="/contact-us"
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 active:bg-primary/85"
      >
        <MessageCircle className="size-4 shrink-0" aria-hidden />
        {labels.contactUs}
      </Link>
    </SheetClose>
  );
};

export default MenuBottomLinks;
