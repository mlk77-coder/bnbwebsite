"use client"

import SubmitButton from "@/components/submit-button"
import { Button } from "@/components/ui/button"
import axiosInstance from "@/lib/axios"
import { useRouter } from "@/navigation"
import type { CheckoutSchema } from "@/schemas/checkout.schema"
import useCartCountStore from "@/store/use-cart-count-store"
import useCheckoutStore from "@/store/use-checkout-store"
import { useMutation } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import { type FC, useState } from "react"
import { useFormContext } from "react-hook-form"
import AddToCartErrorDialog from "../../products/[slug]/_components/add-to-cart-error-dialog"
import { useLocale, useTranslations } from "next-intl"
import CheckoutConfirmationDialog from "./checkout-confirmation-dialog"

type PropsType = {
  id: number
  isLoggedIn: boolean
  token: string
}

const PaymentButton: FC<PropsType> = ({ id, isLoggedIn, token }) => {
  const form = useFormContext<CheckoutSchema>()
  const [errorMessage, setErrorMessage] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [formData, setFormData] = useState<CheckoutSchema | null>(null)
  const setShipping = useCheckoutStore((state) => state.setShipping)
  const router = useRouter()
  const locale = useLocale()
  const setCoupon = useCheckoutStore((state) => state.setCoupon)
  const setProductsCount = useCartCountStore((state) => state.setProductsCount)
  const coupon = useCheckoutStore((state) => state.coupon)
  const t = useTranslations()

  const { mutate, isPending, isError, reset } = useMutation({
    mutationFn: async (data: CheckoutSchema) => {
      const formData = new FormData()
      formData.append("name", data.name)
      formData.append("email", data.email)
      formData.append("country", data.countryId)
      formData.append("city_id", data.city_id)
      formData.append("state", data.street)
      formData.append("phone", `+${data.phone.code}${data.phone.number}`)
      if (id) formData.append("cart_id", id.toString())
      if (!isLoggedIn) formData.append("s_id", token)
      if (coupon) formData.append("coupon_id", coupon.id.toString())
      if (data.description) formData.append("description", data.description)
      const headers = isLoggedIn
        ? {
            Authorization: `Bearer ${token}`,
            lang: locale,
          }
        : { lang: locale }
      const response = await axiosInstance.post(`/order/checkout`, formData, {
        headers,
      })
      return response.data.order_id as number
    },
    onSuccess: (data) => {
      form.reset()
      setCoupon(null)
      setShipping(-1)
      setProductsCount(0)
      if (isLoggedIn) {
        router.replace(`/orders/${data}`)
      } else {
        document.cookie = "softNavigationToken=true; path=/; max-age=3600"
        router.replace(`/order-details/${data}`)
      }
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response?.data?.message) {
        setErrorMessage(
          typeof error === "string"
            ? error
            : typeof error.response.data.message === "string"
              ? error.response.data.message
              : Object.values(error.response.data.message).flat().join("\n"),
        )
      } else {
        setErrorMessage("Something went wrong, please try again")
      }
    },
  })

  const handlePaymentClick = () => {
    form.handleSubmit((data) => {
      setFormData(data)
      setShowConfirmation(true)
    })()
  }

  const handleConfirmOrder = () => {
    if (formData) {
      mutate(formData)
      setShowConfirmation(false)
    }
  }

  return (
    <>
      <Button onClick={handlePaymentClick} size="lg" disabled={isPending} className="w-full">
        <SubmitButton isPending={isPending} text={t("pay-button")} />
      </Button>

      <CheckoutConfirmationDialog
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmOrder}
        isPending={isPending}
      />

      <AddToCartErrorDialog
        errorMessage={errorMessage}
        open={isError}
        onClose={() => {
          setErrorMessage("")
          reset()
        }}
      />
    </>
  )
}

export default PaymentButton
