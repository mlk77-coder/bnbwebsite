"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CouponErrorDialog from "@/features/checkout/client/coupon-error-dialog";
import axiosInstance from "@/lib/axios";
import { formatPrice } from "@/lib/utils";
import useCheckoutStore from "@/store/use-checkout-store";
import useCurrencyStore from "@/store/use-currency-store";
import { Coupon } from "@/types/checkout";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";

const PromoCodeForm = () => {
  const t = useTranslations();
  const [code, setCode] = useState("");
  const setCoupon = useCheckoutStore((state) => state.setCoupon);
  const coupon = useCheckoutStore((state) => state.coupon);
  const currency = useCurrencyStore((state) => state.currency);
  const symbol = useCurrencyStore((state) => state.symbol);
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate, isPending, isError, reset } = useMutation({
    mutationFn: async (code: string) => {
      const { data } = await axiosInstance.get<{ coupon: Coupon }>(
        `/order/coupon/${code}`
      );
      return data.coupon;
    },
    onSuccess(data) {
      setCoupon(data);
      setCode("");
    },
    onError(error) {
      if (isAxiosError(error) && error.response?.data?.message) {
        setErrorMessage(
          typeof error === "string"
            ? error
            : typeof error.response.data.message === "string"
            ? error.response.data.message
            : Object.values(error.response.data.message)
                .flatMap((err) => err)
                .join("\n")
        );
      } else {
        setErrorMessage("Something went wrong, please try again");
      }
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(code);
  };

  if (coupon)
    return (
      <div className="w-full flex justify-between items-center">
        <span className="text-primary font-medium">{`${t("coupon-discount")}${
          coupon.code ? `: ${coupon.code}` : ""
        }`}</span>
        <span>
          {coupon.discount_amount
            ? `${formatPrice(+coupon.discount_amount * currency, symbol)}`
            : coupon.discount_percentage
            ? `${coupon.discount_percentage}%`
            : null}
        </span>
      </div>
    );

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem className="border-b-0 text-sm text-orange" value="item-1">
        <AccordionTrigger className="hover:bg-transparent flex justify-start items-center gap-2 w-full py-0">
          {t("have-a-promo-code")}
        </AccordionTrigger>
        <AccordionContent className="pb-0 pt-4 text-foreground">
          <form
            onSubmit={onSubmit}
            className="flex justify-start gap-2 m-1 items-center"
          >
            <Input value={code} onChange={(e) => setCode(e.target.value)} />
            <Button disabled={!code || isPending} className="uppercase">
              {t("global.add")}
            </Button>
          </form>
        </AccordionContent>
      </AccordionItem>
      <CouponErrorDialog
        errorMessage={errorMessage}
        onClose={() => {
          setErrorMessage("");
          reset();
        }}
        open={isError}
      />
    </Accordion>
  );
};

export default PromoCodeForm;
