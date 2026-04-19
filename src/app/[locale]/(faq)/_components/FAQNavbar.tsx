import Link from "@/components/client-link";
import { getTranslations } from "next-intl/server";
import { FAQLinks } from "../frequently-asked-questions/links";
const FAQNavbar = async () => {
  const t = await getTranslations();
  return (
    <div className="md:col-span-3 flex flex-col justify-start items-start gap-4 text-lg">
      <h2 className="text-xl mb-4 text-primary">{t("faq.title")}</h2>
      {FAQLinks.map((link, index) => (
        <Link
          key={index}
          activeClassName="text-primary font-bold border-black"
          slug={link.slug}
          className="block w-full text-sm text-start border capitalize p-4"
          href={`/frequently-asked-questions/${link.slug}`}
        >
          {t(link.name)}
        </Link>
      ))}
    </div>
  );
};

export default FAQNavbar;
