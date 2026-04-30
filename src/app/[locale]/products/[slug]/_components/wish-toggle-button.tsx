"use client";

import useGetFavoriteIds from "@/app/[locale]/(auth)/hooks/use-get-favorite-ids";
import { Button, buttonVariants } from "@/components/ui/button";
import { CustomSession } from "@/lib/auth-options";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { signIn } from "next-auth/react";
import { FC } from "react";
import useToggleWishList from "../_hooks/use-toggle-wishlist";
import Loader from "@/components/ui/loader";
import { useTranslations } from "next-intl";

interface WishlistButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {}

const WishlistButton: FC<WishlistButtonProps> = ({ ...props }) => {
  return (
    <Button
      {...props}
      variant="ghost"
      size="lg"
      className="text-base w-full capitalize"
    >
      <Heart className="size-5 me-2" />
      add to wishlist
    </Button>
  );
};

type PropsType = {
  session: CustomSession | null;
  id: number;
};

const WishToggleButton: FC<PropsType> = ({ session, id }) => {
  const t = useTranslations()
  const { handleToggleWishList, isPending: isPendingWishList } =
    useToggleWishList(session?.user?.access_token || "", id);
  const { data, isPending, isError } = useGetFavoriteIds(
    session?.user?.access_token || ""
  );

  if (!session)
    return (
      <button
        onClick={() => signIn()}
        className={cn(
          buttonVariants({ variant: "ghost", size: "lg" }),
          "text-base w-full border cursor-pointer"
        )}
      >
        <Heart className="size-5 me-2" />
        {t('add-to-wishlist')}
      </button>
    );

  if (isPending) return <WishlistButton disabled />;
  if (isError) return <WishlistButton disabled />;

  if (!data.productIds.includes(id))
    return (
      <Button
        disabled={isPendingWishList}
        onClick={handleToggleWishList}
        variant="ghost"
        size="lg"
        className="text-base border w-full"
      >
        {isPendingWishList ? (
          <Loader className="size-5 me-2" />
        ) : (
          <Heart className="size-5 me-2" />
        )}
        <span className="inline-block min-w-40">{t('add-to-wishlist')}</span>
      </Button>
    );
  else
    return (
      <Button
        disabled={isPendingWishList}
        onClick={handleToggleWishList}
        variant="ghost"
        size="lg"
        className="text-base border w-full"
      >
        {isPendingWishList ? (
          <Loader className="size-5 me-2" />
        ) : (
          <Heart className="size-5 fill-red-500 text-red-500 me-2" />
        )}
        <span className="inline-block min-w-40">{t('remove-from-wishlist')}</span>
      </Button>
    );
};

export default WishToggleButton;
