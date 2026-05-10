"use client";

import {
  createOrderApi,
  parseCreatedOrderId,
} from "@/features/orders/api/create-order";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
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

  const { mutate, isPending, reset } = useMutation({
    mutationFn: async (body: CreateOrderBody) =>
      createOrderApi(body, { token, locale }),
    onSuccess: (res) => {
      if (!res.success) {
        setErrorMessage(res.message ?? "Could not complete order.");
        return;
      }

      const orderId = parseCreatedOrderId(res);
      if (orderId == null) {
        setErrorMessage("Could not resolve new order id from response.");
        return;
      }

      form.reset();
      setCoupon(null);
      setShipping(-1);
      setProductsCount(0);
      if (isLoggedIn) router.replace(`/orders/${orderId}`);
      else {
        document.cookie =
          "softNavigationToken=true; path=/; max-age=3600";
        router.replace(`/order-details/${orderId}`);
      }
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
              : "Something went wrong, please try again",
        );
        return;
      }
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong, please try again",
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
    if (!pendingPayload) return;
    setErrorMessage("");
    mutate(pendingPayload);
    setShowConfirmation(false);
    setPendingPayload(null);
  };

  return (
    <>
      <Button
        type="button"
        onClick={handlePaymentClick}
        size="lg"
        disabled={isPending}
        className="h-14 w-full rounded-2xl text-base font-semibold shadow-md transition-all hover:shadow-lg"
      >
        <SubmitButton isPending={isPending} text={t("pay-button")} />
      </Button>

      <CheckoutConfirmationDialog
        open={showConfirmation}
        onClose={() => {
          setShowConfirmation(false);
          setPendingPayload(null);
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
