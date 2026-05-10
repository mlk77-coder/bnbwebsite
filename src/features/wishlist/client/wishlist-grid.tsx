"use client";

import { getWishlist } from "@/features/wishlist/api/get-wishlist";
import RemoveFromWishlist from "@/features/wishlist/client/remove-from-wishlist";
import ProductCard from "@/components/product-card/product-card";
import { ProductCard as ProductCardType } from "@/types/products";
import { WishlistItem } from "@/types/wishlist";
import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { FC, Fragment } from "react";

type PropsType = {
  token: string;
  initialData: WishlistItem[];
};

const toProductCard = (item: WishlistItem): ProductCardType => ({
  id: item.product.id,
  name: item.product.name,
  slug: String(item.product.id),
  description: "",
  price: item.product.price,
  sale_price: item.product.sale_price,
  images: [item.product.image],
  image: item.product.image || "/no-product.svg",
  rating: item.product.rating,
  reviews_count: 0,
  is_liked: true,
  is_available: item.product.is_available,
  stock_quantity: 0,
  category_id: 0,
  category: null,
});

const WishlistGrid: FC<PropsType> = ({ token, initialData }) => {
  const t = useTranslations();
  const locale = useLocale();
  const { data } = useQuery({
    queryKey: ["user-wishlist", token],
    queryFn: async () => {
      const response = await getWishlist(locale, token);
      if (response.ok) return response.data.data;
      return initialData;
    },
    initialData,
  });

  return (
    <Fragment>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.length === 0 ? (
          <p className="col-span-full rounded-3xl border border-primary/10 bg-secondary/40 px-4 py-8 text-center text-sm text-muted-foreground">
            {t("wishlist-empty")}
          </p>
        ) : (
          data.map((item) => (
            <div
              key={item.id}
              className="relative rounded-3xl border border-primary/10 bg-white p-2 shadow-sm shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/10"
            >
              <ProductCard product={toProductCard(item)} showWishlistHeart={false} />
              <RemoveFromWishlist
                productId={item.product.id}
                token={token}
                name={item.product.name}
              />
            </div>
          ))
        )}
      </div>
    </Fragment>
  );
};

export default WishlistGrid;
