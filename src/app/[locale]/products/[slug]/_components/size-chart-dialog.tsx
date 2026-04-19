"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Ruler } from "lucide-react";
import { useTranslations } from "next-intl";
import SizeChartContent from "./size-chart-content";

type PropsType = {
  type: null | number;
};

export default function SizeChartDialog({ type }: PropsType) {
  const t = useTranslations();
  if (!type) return null;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="hover:text-orange group px-0">
          {t("size-chart")}
          <Ruler className="ms-2 size-5 text-primary group-hover:text-primary -rotate-45" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] sm:max-w-screen-lg overflow-x-auto">
        <SizeChartContent type={type} />
      </DialogContent>
    </Dialog>
  );
}
