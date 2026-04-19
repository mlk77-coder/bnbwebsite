"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axiosInstance from "@/lib/axios";
import type { ApiResponse } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";

type AD = {
  id: number;
  title: string | null;
  url: null | string;
  image: string;
};

interface Response extends ApiResponse {
  ads: AD[];
}

export default function AdsDialog() {
  const locale = useLocale();
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState<AD | null>(null);

  const { data, isPending, isError } = useQuery({
    queryKey: ["ads"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Response>("ads", {
        headers: {
          lang: locale,
        },
      });
      return data.ads;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      if (selectedAd) {
        await axiosInstance.get(`skip-ad/${selectedAd.id}`);
      }
    },
  });

  useEffect(() => {
    const hasSeenAd = localStorage.getItem("hasSeenAd");
    if (!hasSeenAd && data && data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      setSelectedAd(data[randomIndex]);
      setOpen(true);
      localStorage.setItem("hasSeenAd", "true");
    }
  }, [data]);

  const handleClose = async () => {
    setOpen(false);
    await mutateAsync();
  };

  if (isPending || isError || !selectedAd) {
    return null;
  }

  const ImageComponent = () => (
    <Image
      src={selectedAd.image || "/placeholder.svg"}
      alt={selectedAd.title || t("advertisement")}
      width={800}
      height={600}
      layout="responsive"
      className="rounded cursor-pointer"
      objectFit="contain"
    />
  );

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="gap-2 p-4">
        <DialogHeader>
          <DialogTitle>
            {selectedAd.title ? selectedAd.title : t("advertisement")}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {selectedAd.url ? (
            <a href={selectedAd.url} target="_blank" rel="noopener noreferrer">
              <ImageComponent />
            </a>
          ) : (
            <ImageComponent />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
