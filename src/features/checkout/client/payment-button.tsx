"use client";

import {
  createOrderApi,
  parseCreatedOrderId,
} from "@/features/orders/api/create-order";
import SubmitButton from "@/components/submit-button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AddToCartErrorDialog from "@/features/products/client/add-to-cart-error-dialog";
import CheckoutConfirmationDialog from "@/features/checkout/client/checkout-confirmation-dialog";
import { useRouter } from "@/navigation";
import type { CheckoutSchema } from "@/schemas/checkout.schema";
import useCartCountStore from "@/store/use-cart-count-store";
import useCheckoutStore from "@/store/use-checkout-store";
import {
  DEFAULT_PAYMENT_METHOD_CASH_ON_DELIVERY_ID,
  type CreateOrderBody,
} from "@/types/order";
import { useMutation } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { isAxiosError } from "axios";
import { type FC, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

type PropsType = {
  isLoggedIn: boolean;
  token: string;
};

const PaymentButton: FC<PropsType> = ({ isLoggedIn, token }) => {
  const form = useFormContext<CheckoutSchema>();
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingPayload, setPendingPayload] =
    useState<CreateOrderBody | null>(null);
  const setShipping = useCheckoutStore((state) => state.setShipping);
  const router = useRouter();
  const locale = useLocale();
  const setCoupon = useCheckoutStore((state) => state.setCoupon);
  const setProductsCount = useCartCountStore((state) => state.setProductsCount);
  const t = useTranslations();
  const tCheckout = useTranslations('checkout');
  const tAuth = useTranslations('auth');
  const genericError = tAuth('something-went-wrong-please-try-again');

  const { mutate, isPending, reset } = useMutation({
    mutationFn: async (body: CreateOrderBody) =>
      createOrderApi(body, { token, locale }),
    onSuccess: (res) => {
      if (!res.success) {
        setErrorMessage(res.message ?? tCheckout('order-complete-failed'));
        return;
      }

      const orderId = parseCreatedOrderId(res);
      if (orderId == null) {
        setErrorMessage(tCheckout('order-id-resolve-failed'));
        return;
      }

      setShowConfirmation(false);
      setPendingPayload(null);
      form.reset();
      setCoupon(null);
      setShipping(-1);
      setProductsCount(0);
      router.replace(`/orders/${orderId}`);
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response?.data?.message) {
        const msg = error.response.data.message;
        setErrorMessage(
          typeof msg === "string"
            ? msg
            : typeof msg === "object"
              ? Object.values(msg as Record<string, unknown>)
                  .flat()
                  .join("\n")
              : genericError,
        );
        return;
      }
      setErrorMessage(
        error instanceof Error ? error.message : genericError,
      );
    },
  });

  const handlePaymentClick = () => {
    if (!isLoggedIn) {
      toast.error(t("checkout-sign-in-to-place-order"));
      return;
    }

    const rawId = form.getValues("address_id");
    const address_id =
      typeof rawId === "number"
        ? rawId
        : rawId !== undefined && rawId !== null
          ? Number(rawId)
          : NaN;

    if (!Number.isFinite(address_id) || address_id < 1) {
      toast.error(t("select-saved-address-to-place-order"));
      return;
    }

    const notesRaw = form.getValues("notes");
    const notes =
      typeof notesRaw === "string" && notesRaw.trim().length > 0
        ? notesRaw.trim()
        : undefined;

    setPendingPayload({
      address_id,
      payment_method_id: DEFAULT_PAYMENT_METHOD_CASH_ON_DELIVERY_ID,
      ...(notes !== undefined ? { notes } : {}),
    });
    setShowConfirmation(true);
  };

  const handleConfirmOrder = () => {
    if (!pendingPayload || isPending) return;
    setErrorMessage("");
    mutate(pendingPayload);
  };

  return (
    <>
      <button
        type="button"
        onClick={handlePaymentClick}
        disabled={isPending}
        className={cn(
          buttonVariants({ size: "lg" }),
          "shadow-primary/20 h-13 w-full gap-2 rounded-2xl text-base uppercase shadow-lg",
        )}
      >
        <SubmitButton isPending={isPending} text={t("pay-button")} />
      </button>

      <CheckoutConfirmationDialog
        open={showConfirmation}
        onOpenChange={(open) => {
          if (isPending) return;
          setShowConfirmation(open);
          if (!open) setPendingPayload(null);
        }}
        onConfirm={handleConfirmOrder}
        isPending={isPending}
      />

      <AddToCartErrorDialog
        errorMessage={errorMessage}
        open={!!errorMessage}
        onClose={() => {
          setErrorMessage("");
          reset();
        }}
      />
    </>
  );
};

export default PaymentButton;
