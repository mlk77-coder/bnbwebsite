import { cn, formatPrice } from "@/lib/utils";
import { Link } from "@/navigation";
import useCurrencyStore from "@/store/use-currency-store";
import { CartProduct } from "@/types/cart";
import Image from "next/image";
import { FC } from "react";

type PropsType = {
  product: CartProduct;
  size?: "sm" | "lg";
};

const ProductPreviewCard: FC<PropsType> = ({ product, size = "sm" }) => {
  const { image, name, quantity, attribute_values } = product;
  const currency = useCurrencyStore((state) => state.currency);
  const symbol = useCurrencyStore((state) => state.symbol);
  return (
    <div className="flex justify-start items-start gap-5">
      <Image
        src={image ?? ""}
        alt={name}
        width={250}
        height={250}
        className={cn(
          "shrink-0 object-cover",
          size === "sm" ? "size-24" : "size-28"
        )}
      />
      <span className="w-full flex ltr:tracking-wide text-sm flex-col justify-start items-start">
        <Link
          href={`/products/${product.slug}`}
          title={name}
          className={cn(
            "w-full font-medium",
            size === "sm" ? "text-sm line-clamp-1" : "text-base line-clamp-2"
          )}
        >
          {name}
        </Link>
        <span
          className={cn("w-full grid", size === "sm" ? "text-sm" : "text-base")}
          style={{
            gridTemplateRows: "repeat(2, auto)",
            gridAutoFlow: "column",
          }}
        >
          {attribute_values
            ? Object.entries(attribute_values).map(([key, value], index) => (
                <span key={index}>
                  {key}: {value}
                </span>
              ))
            : null}
        </span>
        <span className="font-bold">
          <div className="flex justify-start items-center gap-2">
            <p className="font-bold" dir="ltr">
              {quantity} X{" "}
              {product.has_discount && product.price_after_sale
                ? formatPrice(product.price_after_sale * currency, symbol)
                : formatPrice(+product.price * currency, symbol)}
            </p>
          </div>
        </span>
      </span>
    </div>
  );
};

export default ProductPreviewCard;
