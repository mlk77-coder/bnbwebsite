"use client";

import { SheetClose } from "@/components/ui/sheet";
import { Link } from "@/navigation";

type PropsType = {
  labels: {
    contactUs: string;
  };
};

const MenuBottomLinks = ({ labels }: PropsType) => {
  return (
    <div className="flex flex-col items-start justify-start gap-8 bg-beige/75 !px-6 py-9">
      <Link
        href="/contact-us"
        className="underline underline-offset-1 hover:text-orange"
      >
        <SheetClose asChild>
          <span>{labels.contactUs}</span>
        </SheetClose>
      </Link>
    </div>
  );
};

export default MenuBottomLinks;
