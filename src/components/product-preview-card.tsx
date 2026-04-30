import { cn, formatPrice } from "@/lib/utils";
import { Link } from "@/navigation";
import useCurrencyStore from "@/store/use-currency-store";
import Image from "next/image";
import { FC } from "react";

type PreviewProduct = {
  product_id?: number;
  id?: number;
  name: string;
  image: string | null;
  price: number;
  sale_price: number | null;
  quantity: number;
};

type PropsType = {
  product: PreviewProduct;
  size?: "sm" | "lg";
};

const ProductPreviewCard: FC<PropsType> = ({ product, size = "sm" }) => {
  const { image, name, quantity } = product;
  const currency = useCurrencyStore((state) => state.currency);
  const symbol = useCurrencyStore((state) => state.symbol);
  return (
    <div className="flex justify-start items-start gap-5">
      <Image
        src={image ?? "/no-product.svg"}
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
          href={`/products/${product.product_id ?? product.id}`}
          title={name}
          className={cn(
            "w-full font-medium",
            size === "sm" ? "text-sm line-clamp-1" : "text-base line-clamp-2"
          )}
        >
          {name}
        </Link>
        <span className="font-bold">
          <div className="flex justify-start items-center gap-2">
            <p className="font-bold" dir="ltr">
              {quantity} X{" "}
              {formatPrice(
                (product.sale_price && product.sale_price < product.price
                  ? product.sale_price
                  : product.price) * currency,
                symbol
              )}
            </p>
          </div>
        </span>
      </span>
    </div>
  );
};

export default ProductPreviewCard;
