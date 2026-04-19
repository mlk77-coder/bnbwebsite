import { SheetClose } from "@/components/ui/sheet";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

const MenuBottomLinks = () => {
  const t = useTranslations();
  return (
    <div className="bg-beige/75 !px-6 py-9 flex flex-col justify-start items-start gap-8">
      <Link
        href="/size-chart"
        className="underline underline-offset-1 hover:text-orange"
      >
        <SheetClose asChild>
          <span>{t("size-chart")}</span>
        </SheetClose>
      </Link>
      <Link
        href="/about-bnb-store"
        className="underline underline-offset-1 hover:text-orange"
      >
        <SheetClose asChild>
          <span>{t("about-bnb-store")}</span>
        </SheetClose>
      </Link>
      {/* <Link
        href="/membership"
        className="underline underline-offset-1 hover:text-orange"
      >
        <SheetClose asChild>
          <span>{t("membership")}</span>
        </SheetClose>
      </Link> */}
      <Link
        href="/frequently-asked-questions/general-information"
        className="underline underline-offset-1 hover:text-orange"
      >
        <SheetClose asChild>
          <span>{t("faqs")}</span>
        </SheetClose>
      </Link>
      <Link
        href="/frequently-asked-questions/returns-refunds"
        className="underline underline-offset-1 hover:text-orange"
      >
        <SheetClose asChild>
          <span>{t("returns-and-refunds")}</span>
        </SheetClose>
      </Link>
    </div>
  );
};

export default MenuBottomLinks;
