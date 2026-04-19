"use client";

import { SheetClose } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import { FC, ReactNode } from "react";

interface SheetCloseLinkProps {
  href: string;
  children: ReactNode;
}

const SheetCloseLink: FC<SheetCloseLinkProps> = ({ href, children }) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a onClick={handleClick} className="cursor-pointer">
      <SheetClose asChild>
        <span>{children}</span>
      </SheetClose>
    </a>
  );
};

export default SheetCloseLink;
