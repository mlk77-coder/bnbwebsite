"use client";

import useGetFavoriteIds from "@/app/[locale]/(auth)/hooks/use-get-favorite-ids";
import useToggleWishList from "@/app/[locale]/products/[slug]/_hooks/use-toggle-wishlist";
import { CustomSession } from "@/lib/auth-options";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "@/navigation";
import { Heart, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

export function WishlistHeart({ id }: { id: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: raw } = useSession();
  const session = raw as CustomSession | null;
  const token = session?.user?.access_token ?? "";

  const { data: favorites } = useGetFavoriteIds(token);
  const { handleToggleWishList, isPending } = useToggleWishList(token, id);

  const isFav = !!token && (favorites?.includes(id) ?? false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!session) {
      router.push(`/login?${new URLSearchParams({ callbackUrl: pathname || "/" }).toString()}`);
      return;
    }
    handleToggleWishList();
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      aria-label={isFav ? "Remove from wishlist" : "Add to wishlist"}
      className={cn(
        "absolute top-2 inset-e-2 z-20 flex items-center justify-center size-8 rounded-full",
        "bg-white/90 backdrop-blur-sm shadow-sm border border-border/30",
        "opacity-0 group-hover:opacity-100 transition-all duration-200",
        "hover:scale-110 active:scale-95 disabled:opacity-50",
        isFav && "opacity-100"
      )}
    >
      {isPending ? (
        <Loader2 className="size-3.5 animate-spin text-foreground/60" />
      ) : (
        <Heart
          className={cn(
            "size-3.5 transition-colors duration-150",
            isFav ? "fill-red-500 text-red-500" : "text-foreground/60"
          )}
        />
      )}
    </button>
  );
}
