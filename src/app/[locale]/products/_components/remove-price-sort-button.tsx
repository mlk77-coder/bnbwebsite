"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

const RemovePriceSortButton = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations("filters.sort");

  const handleRemoveSort = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("sort[price]");
    router.push(`?${params.toString()}`);
  };
  return (
    <Button
      size="sm"
      className="w-full justify-start rounded-none"
      onClick={handleRemoveSort}
      variant="ghost"
    >
      
      {t("default")}
    </Button>
  );
};

export default RemovePriceSortButton;
