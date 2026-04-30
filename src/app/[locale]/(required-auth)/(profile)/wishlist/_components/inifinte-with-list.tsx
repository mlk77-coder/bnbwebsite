"use client";
import { getWishlist } from "@/api/wishlist/get-wishlist";
import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { FC, Fragment } from "react";
import RemoveFromWishlist from "./remove-from-wishlist";
import ProductCard from "@/components/product-card/product-card";
import { WishlistItem } from "@/types/wishlist";
import { ProductCard as ProductCardType } from "@/types/products";

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

const InifinteWithList: FC<PropsType> = ({ token, initialData }) => {
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
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.length === 0 ? (
          <p className="bg-gray/20 rounded-lg col-span-2 w-fit py-2 px-4 lg:col-span-3 xl:col-span-4">
            {t("wishlist-empty")}
          </p>
        ) : (
          data.map((item) => (
            <div key={item.id} className="relative">
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

export default InifinteWithList;
