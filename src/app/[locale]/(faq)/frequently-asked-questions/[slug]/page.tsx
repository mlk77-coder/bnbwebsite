import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fetcher } from "@/lib/fetcher";
import { GetFAQResponse } from "@/types/faq";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { FC } from "react";
import { Metadata } from "next";
import { FAQLinks } from "../links";

// Revalidate the page every 12 hours
export const revalidate = 43200; // 12 hours

type Params = {
  locale: string;
  slug: string;
};

type PropsType = {
  params: Promise<Params>;
};

export async function generateMetadata(props: PropsType): Promise<Metadata> {
  const params = await props.params;

  const {
    slug
  } = params;

  const t = await getTranslations();
  return {
    title: `${t(`faq.${slug}`)} | ${t("frequently-asked-questions")}`,
    description: t("faq-description"),
    openGraph: {
      type: "website",
      title: "BNB Store",
      description: t("faq-description"),
      siteName: "BNB Store",
      locale: "en",
      url: process.env.NEXT_PUBLIC_LOCAL_URL,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_LOCAL_URL}/og.png`,
          width: 1200,
          height: 630,
          alt: "BNB Store Logo",
        },
      ],
    },
    alternates: {
      canonical: process.env.NEXT_PUBLIC_LOCAL_URL,
      languages: {
        ar: `${process.env.NEXT_PUBLIC_LOCAL_URL}/ar/frequently-asked-questions/${slug}`,
        en: `${process.env.NEXT_PUBLIC_LOCAL_URL}/en/frequently-asked-questions/${slug}`,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: "BNB Store",
      description: t("faq-description"),
      images: [`${process.env.NEXT_PUBLIC_LOCAL_URL}/logo-light.png`],
      creator: "@R-Link",
      site: "@R-Link",
    },
  };
}

const page: FC<PropsType> = async props => {
  const params = await props.params;

  const {
    locale,
    slug
  } = params;

  // unstable_setRequestLocale(locale);
  const t = await getTranslations();
  const faqPage = FAQLinks.find((link) => link.slug === slug);
  if (!faqPage) return notFound();

  const response = await fetcher<GetFAQResponse>(
    `faq?type=${faqPage.type}`,
    locale,
    {
      next: { tags: [`faq-${faqPage.type}`] },
    }
  );
  if (!response.ok) return <>error</>;

  return (
    <div className="flex flex-col justify-start items-start gap-4">
      <h3 className="text-lg flex w-full justify-center md:justify-start capitalize items-start">
        {t(faqPage.name)}
      </h3>
      <Accordion type="single" collapsible className="w-full">
        {response.data.faqs.map((question) => (
          <AccordionItem key={question.id} value={question.id.toString()}>
            <AccordionTrigger className="text-start hover:bg-transparent">
              {question.question}
            </AccordionTrigger>
            <AccordionContent>
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: question.answer }}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default page;

// export function generateStaticParams() {
//   const paths: { locale: "en" | "ar"; slug: string }[] = [];

//   FAQLinks.forEach((faqPage) => {
//     i18nLocales.forEach((locale) => {
//       paths.push({ locale, slug: faqPage.slug });
//     });
//   });

//   return paths;
// }
