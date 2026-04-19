import { CartProduct } from "@/types/cart";
import Image from "next/image";
import { FC } from "react";
import ProductCartQuantity from "./product-cart-quantity";
import RemoveProductFromCart from "./remove-product-from-cart";
import { useTranslations } from "next-intl";
import { formatPrice } from "@/lib/utils";
import useCurrencyStore from "@/store/use-currency-store";
import { Link } from "@/navigation";

type PropsType = {
  product: CartProduct;
  userToken: string;
};

const CartProductCard: FC<PropsType> = ({ product, userToken }) => {
  const t = useTranslations();
  const currency = useCurrencyStore((state) => state.currency);
  const symbol = useCurrencyStore((state) => state.symbol);
  return (
    <div className="w-full p-4 bg-secondary/50 flex flex-col justify-start items-start gap-4 relative">
      <RemoveProductFromCart product={product} userToken={userToken} />
      <div className="w-full grid grid-cols-[auto_1fr] justify-between gap-4">
        <Link href={`/products/${product.slug}`}>
          <Image
            className="size-28 shrink-0 object-cover"
            src={product.image ?? ""}
            width={300}
            height={300}
            alt={product.name}
          />
        </Link>
        <div className="w-full gap-2 flex flex-col justify-between items-start">
          <Link className="w-full inline-block" href={`/products/${product.slug}`}>
            <h2
              title={product.name}
              className="ltr:tracking-wide max-w-[90%] text-xs min-[400px]:text-sm lg:text-base"
            >
              {product.name}
            </h2>
          </Link>
          <div className="w-full grid grid-cols-3 max-sm:space-y-2">
            <div className="w-full h-fit max-sm:col-span-3 justify-start items-start flex max-sm:flex-col flex-wrap gap-2 text-xs md:text-sm capitalize">
              {Object.entries(product.attribute_values || {}).map(
                ([key, value], index) => (
                  <span key={index}>
                    {key}: {value}
                  </span>
                )
              )}
            </div>
            <div className="w-full h-fit max-sm:col-span-3 justify-start flex sm:flex-col max-sm:gap-2 text-xs md:text-sm capitalize">
              <span>{t("price")}:</span>
              <span>
                {formatPrice(
                  (product.has_discount
                    ? product.price_after_sale!
                    : +product.price) * currency,
                  symbol
                )}
              </span>
            </div>
            <div className="w-full h-fit justify-start flex sm:flex-col text-xs md:text-sm capitalize">
              <span>{t("total")}:</span>
              <span>
                {formatPrice(
                  (product.has_discount
                    ? product.price_after_sale!
                    : +product.price) *
                    product.quantity *
                    currency,
                  symbol
                )}
              </span>
            </div>
          </div>
          <p className=" max-sm:hidden text-sm">{t("quantity")}</p>
        </div>
      </div>
      <div className="flex w-full justify-start items-start gap-4">
        {product.product_quantity === 0 ? (
          <p className="w-28 shrink-0 h-5 md:h-10 text-center py-2 text-xs flex justify-center items-center border text-red-500">
            {t("out-of-stock")}
          </p>
        ) : product.product_quantity > 5 ? (
          <p className="w-28 shrink-0 h-5 md:h-10 text-center py-2 text-xs flex justify-center items-center border text-green-500">
            {t("in-stock")}
          </p>
        ) : (
          <p className="w-28 shrink-0 h-5 md:h-10 text-center py-2 text-xs flex justify-center items-center border text-orange-500">
            {t("few-in-stock")}
          </p>
        )}
        <div className="w-full">
          <ProductCartQuantity product={product} userToken={userToken} />
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
