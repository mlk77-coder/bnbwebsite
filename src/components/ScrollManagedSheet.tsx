"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useRef } from "react";

type ScrollManagedSheetProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
};

const ScrollManagedSheet: React.FC<ScrollManagedSheetProps> = ({
  trigger,
  children,
}) => {
  const sheetContentRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const handleSheetOpen = () => {
      scrollPositionRef.current = window.scrollY;
      if (sheetContentRef.current) {
        sheetContentRef.current.style.transform = `translateY(${scrollPositionRef.current}px)`;
      }
    };

    const handleSheetClose = () => {
      if (sheetContentRef.current) {
        sheetContentRef.current.style.transform = "";
      }
      window.scrollTo(0, scrollPositionRef.current);
    };

    const sheetContent = sheetContentRef.current;
    if (sheetContent) {
      sheetContent.addEventListener("animationstart", handleSheetOpen);
      sheetContent.addEventListener("animationend", handleSheetClose);
    }

    return () => {
      if (sheetContent) {
        sheetContent.removeEventListener("animationstart", handleSheetOpen);
        sheetContent.removeEventListener("animationend", handleSheetClose);
      }
    };
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent ref={sheetContentRef} side="bottom" className="h-[80vh]">
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default ScrollManagedSheet;

