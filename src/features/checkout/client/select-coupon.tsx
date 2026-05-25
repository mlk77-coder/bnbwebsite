"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import axiosInstance from "@/lib/axios";
import { GetAvailableCoupons } from "@/types/checkout";
import useCheckoutStore from "@/store/use-checkout-store";

type PropsType = {
  token: string;
  isLoggedIn: boolean;
};

const SelectCoupon: FC<PropsType> = ({ isLoggedIn, token }) => {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(true);
  const setCoupon = useCheckoutStore((state) => state.setCoupon);
  const [selectedCoupon, setSelectedCoupon] = useState<string>("");

  const { data, isPending, isError } = useQuery({
    queryKey: ["coupons-available", token],
    queryFn: async () => {
      const { data } = await axiosInstance.get<GetAvailableCoupons>(
        "/coupons/available",
        {
          headers: isLoggedIn
            ? { Authorization: `Bearer ${token}` }
            : undefined,
          params: !isLoggedIn ? { s_id: token } : undefined,
        }
      );
      return data.coupons;
    },
  });

  // Set the first coupon as default if available
  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedCoupon(data[0].id.toString());
    }
  }, [data]);

  const handleConfirm = () => {
    setCoupon(data?.find((c) => c.id.toString() === selectedCoupon) || null);
    setIsOpen(false);
  };

  if (isPending) return null;
  if (isError) return null;

  return (
    <Dialog
      open={isOpen && data.length !== 0}
      onOpenChange={() => setIsOpen(false)}
    >
      <DialogContent
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{t("coupon.select-coupon")}</DialogTitle>
          <DialogDescription>
            {t("coupon.select-coupon-description")}
          </DialogDescription>
        </DialogHeader>
        <ToggleGroup
          type="single"
          value={selectedCoupon}
          onValueChange={setSelectedCoupon}
          className="flex flex-col space-y-2"
        >
          {data.map((coupon) => (
            <ToggleGroupItem
              key={coupon.id}
              value={coupon.id.toString()}
              className="flex h-fit py-1 items-center justify-between w-full border rounded-lg"
            >
              <div className="flex flex-col items-start">
                <span className="font-medium">{coupon.type_translation}</span>
                <span className="text-sm text-muted-foreground">
                  {coupon.discount_percentage
                    ? `${coupon.discount_percentage}% off`
                    : `${coupon.discount_amount} off`}
                </span>
              </div>
              <Tag className="h-4 w-4 text-primary" />
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <DialogFooter>
          <Button onClick={handleConfirm} disabled={!selectedCoupon}>
            {t("global.confirm")}
          </Button>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              {t("global.cancel")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SelectCoupon;
