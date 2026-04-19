import { Separator } from "@/components/ui/separator";
import { Link } from "@/navigation";
import { Cart } from "@/types/cart";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { FC } from "react";
import CheckoutDeliveryLabel from "./checkout-delivery-label";
import CheckoutTotalLabel from "./checkout-total-label";
import PayOrGetShipping from "./pay-or-get-shipping";
import PromoCodeForm from "./promo-code-form";
import CheckoutSubtotalLabel from "./checkout-subtotal-label";
import CheckoutProductPrice from "./checkout-product-price";
import SelectCoupon from "./select-coupon";

type PropsType = {
  cart: Cart;
  isLoggedIn: boolean;
  token: string;
};

const CheckoutSummary: FC<PropsType> = async ({ cart, token, isLoggedIn }) => {
  const t = await getTranslations();
  return (
    <div className="w-full border md:w-6/12 rounded-lg shadow space-y-4 static md:sticky top-16 py-4 lg:w-7/12">
      <SelectCoupon isLoggedIn={isLoggedIn} token={token} />
      <div className="w-full flex justify-between items-center">
        <h3 className="text-lg px-4 uppercase font-bold">
          {t("order-summary")}
        </h3>
        <Link href="/cart" className="underline capitalize px-4">
          {t("global.edit")}
        </Link>
      </div>
      <Separator />
      <div className="space-y-4 px-4">
        <p>
          {t("product-count", {
            count: cart.products.reduce(
              (acc, product) => acc + product.quantity,
              0
            ),
          })}
        </p>
        {cart.products.map((product, index) => (
          <div
            key={index}
            className="w-full flex flex-col justify-start items-start relative"
          >
            <div className="w-full grid grid-cols-[auto_1fr] justify-between gap-4">
              <Image
                className="size-20 shrink-0 object-cover"
                src={product.image ?? ""}
                width={300}
                height={300}
                alt={product.name}
              />
              <div className="size-full gap-2 flex flex-col justify-between items-start">
                <div className="flex w-full justify-between items-start gap-2">
                  <h2
                    title={product.name}
                    className="ltr:tracking-wide max-w-[70%] text-sm"
                  >
                    {`${product.quantity} X`} <span>{product.name}</span>
                  </h2>
                  <CheckoutProductPrice
                    price={+product.price}
                    quantity={product.quantity}
                  />
                </div>
                <div className="w-full max-sm:space-y-2 h-full">
                  <div className="size-full justify-start items-start flex flex-col text-xs md:text-sm capitalize">
                    {Object.entries(product.attribute_values || {}).map(
                      ([key, value], index) => (
                        <span key={index}>
                          {key}: {value}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Separator />
      <div className="space-y-2 px-4">
        <CheckoutSubtotalLabel invoice_value={cart.invoice_value} />
        <CheckoutDeliveryLabel />
        <PromoCodeForm />
      </div>
      <Separator />
      <CheckoutTotalLabel invoice_value={cart.invoice_value} />
      <PayOrGetShipping id={cart.id} isLoggedIn={isLoggedIn} token={token} />
    </div>
  );
};

export default CheckoutSummary;
