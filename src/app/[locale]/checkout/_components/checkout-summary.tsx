import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { Cart } from "@/types/cart";
import { getTranslations } from "next-intl/server";
import { Package } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import CheckoutOrderBreakdown from "./checkout-order-breakdown";
import CheckoutProductPrice from "./checkout-product-price";
import PayOrGetShipping from "./pay-or-get-shipping";

type PropsType = {
  cart: Cart;
  isLoggedIn: boolean;
  token: string;
};

/** Matches profile/cart-style cards: rounded-3xl, border-primary/10, shadow-sm → hover uplift. */
const summaryCardShell =
  "overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-sm shadow-primary/5 " +
  "transition-all duration-300 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/10";

const CheckoutSummary: FC<PropsType> = async ({ cart, isLoggedIn, token }) => {
  const t = await getTranslations();
  const qty = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <aside className="sticky top-24 w-full min-w-0 xl:sticky xl:top-28">
      <div
        className={cn(
          summaryCardShell,
          "mx-auto w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl",
        )}
      >
        <div className="relative border-b border-primary/10 px-6 py-6 sm:px-8 sm:py-7">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-primary/10 to-transparent opacity-80" />
          <div className="relative flex items-center justify-between gap-4 text-primary">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner">
                <Package className="size-6" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/75">
                  {t("checkout-confirmation-banner")}
                </p>
                <h3 className="font-serif text-xl font-normal uppercase tracking-[0.14em] sm:text-2xl">
                  {t("order-summary")}
                </h3>
              </div>
            </div>
            <Link
              href="/cart"
              className="shrink-0 text-sm font-semibold uppercase tracking-wide text-primary underline decoration-primary/40 underline-offset-[6px] transition-colors hover:decoration-primary"
            >
              {t("global.edit")}
            </Link>
          </div>
        </div>

        <div className="space-y-6 px-6 py-7 sm:px-8">
          <p className="text-sm font-medium text-muted-foreground sm:text-base">
            {t("product-count", { count: qty })}
          </p>
          <ul className="space-y-4">
            {cart.items.map((item) => (
              <li
                key={item.id}
                className={cn(
                  "rounded-2xl border border-primary/10 bg-secondary/30 p-4 sm:p-5",
                  "shadow-sm shadow-primary/5 transition-colors duration-300 hover:border-primary/20 hover:bg-secondary/45",
                )}
              >
                <div className="flex gap-4 sm:gap-5">
                  <div className="relative size-[5.25rem] shrink-0 overflow-hidden rounded-2xl border border-white bg-white shadow-sm sm:size-28">
                    <Image
                      src={item.product.image ?? "/no-product.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>
                  <div className="min-w-0 flex-1 pt-1">
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-sm font-medium leading-snug sm:text-base">
                        {item.quantity}&nbsp;&times;&nbsp;
                        <span className="text-foreground">
                          {item.product.name}
                        </span>
                      </span>
                      <CheckoutProductPrice
                        price={
                          item.product.sale_price ?? item.product.price
                        }
                        quantity={item.quantity}
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <Separator className="bg-primary/10" />

        <div className="px-6 py-7 sm:px-8">
          <CheckoutOrderBreakdown summary={cart.summary} />
        </div>

        <div className="border-t border-primary/10 px-6 py-6 sm:px-8 sm:pb-8">
          <PayOrGetShipping isLoggedIn={isLoggedIn} token={token} />
        </div>
      </div>
    </aside>
  );
};

export default CheckoutSummary;
