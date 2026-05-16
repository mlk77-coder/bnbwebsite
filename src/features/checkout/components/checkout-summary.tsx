import CheckoutOrderBreakdown from "@/features/checkout/client/checkout-order-breakdown";
import CheckoutProductPrice from "@/features/checkout/client/checkout-product-price";
import PayOrGetShipping from "@/features/checkout/client/pay-or-get-shipping";
import { cn } from "@/lib/utils";
import { Cart } from "@/types/cart";
import { getTranslations } from "next-intl/server";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

type PropsType = {
  cart: Cart;
  isLoggedIn: boolean;
  token: string;
};

const CheckoutSummary: FC<PropsType> = async ({ cart, isLoggedIn, token }) => {
  const t = await getTranslations();

  return (
    <aside
      className={cn(
        "static top-20 w-full sm:ms-4 md:sticky md:w-5/12 lg:ms-10 lg:w-4/12",
      )}
    >
      <div className="border-primary/10 overflow-hidden rounded-3xl border bg-white">
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-primary/70 text-xs font-semibold tracking-[0.2em] uppercase">
                BNB Store
              </p>
              <h3 className="text-foreground mt-1 text-2xl font-bold">
                {t("order-summary")}
              </h3>
            </div>
            <span className="text-primary flex size-11 items-center justify-center rounded-2xl bg-white shadow-sm">
              <ShieldCheck className="size-5" />
            </span>
          </div>
        </div>

        {cart.items.length > 0 ? (
          <div className="max-h-72 space-y-3 overflow-y-auto border-t border-primary/10 px-5 py-4">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 rounded-2xl bg-secondary/40 p-3"
              >
                <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-white">
                  <Image
                    src={item.product.image ?? "/no-product.svg"}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-medium leading-snug">
                    {item.quantity}&nbsp;&times;&nbsp;{item.product.name}
                  </p>
                  <CheckoutProductPrice
                    price={item.product.sale_price ?? item.product.price}
                    quantity={item.quantity}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : null}

        <div className="space-y-4 border-t border-primary/10 p-5">
          <CheckoutOrderBreakdown summary={cart.summary} />
          <PayOrGetShipping isLoggedIn={isLoggedIn} token={token} />
        </div>
      </div>
    </aside>
  );
};

export default CheckoutSummary;
