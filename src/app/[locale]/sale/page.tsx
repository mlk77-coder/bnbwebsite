import RecentlyViewed from "@/app/[locale]/_components/recently-viewed";
import CustomBreadcrumb from "@/components/custom-breadcrumb";
import PageWrapper from "@/components/page-wrapper";
import SectionWrapper, {
  sectionWrapperClassName,
} from "@/components/section-wrapper";
import getSession from "@/lib/get-session";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { FC } from "react";
import SubCategoryProducts from "../(categories)/components/sub-category-products";

type PropsType = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<Record<string, string>>;
};

const translations = {
  en: {
    sale: "Sale",
    saleDescription:
      "Explore our wide range of discounted products across multiple categories, ensuring quality and great deals for everyone.",
    women: "Women's Sale",
    womenDescription:
      "Discover women's clothing, accessories, and footwear at discounted prices in our sale, combining elegance and comfort.",
    men: "Men's Sale",
    menDescription:
      "Discover men's clothing and accessories at discounted prices in our sale, offering style and practicality.",
    kids: "Kids' Sale",
    kidsDescription:
      "Explore a variety of kids' clothing, shoes, and accessories at unbeatable prices, ensuring both style and durability.",
    home: "Home Sale",
    homeDescription:
      "Upgrade your living space with our home sale, featuring discounts on furniture, décor, and essentials for a stylish and cozy home.",
    beauty: "Beauty Sale",
    beautyDescription:
      "Pamper yourself with luxury beauty products at discounted prices, including skincare, makeup, and fragrances for a radiant look.",
    travel: "Travel Sale",
    travelDescription:
      "Get ready for your next adventure with our travel sale, offering discounts on luggage, accessories, and essentials for a hassle-free journey.",
  },
  ar: {
    sale: "تخفيضات",
    saleDescription:
      "استكشف مجموعتنا الواسعة من المنتجات المخفضة عبر فئات متعددة، مع ضمان الجودة والعروض الرائعة للجميع.",
    women: "تخفيضات النساء",
    womenDescription:
      "اكتشف ملابس النساء والإكسسوارات والأحذية بأسعار مخفضة في عروضنا، حيث يجتمع الأناقة مع الراحة.",
    men: "تخفيضات الرجال",
    menDescription:
      "اكتشف ملابس الرجال والإكسسوارات بأسعار مخفضة في عروضنا، حيث يجتمع الأسلوب مع العملية.",
    kids: "تخفيضات الأطفال",
    kidsDescription:
      "استمتع بتخفيضات على مجموعة واسعة من ملابس وأحذية وإكسسوارات الأطفال بأسعار لا تُقاوم، لضمان الأناقة والجودة.",
    home: "تخفيضات المنزل",
    homeDescription:
      "قم بترقية مساحتك المعيشية مع تخفيضاتنا على الأثاث والديكور والمستلزمات الأساسية لمنزل أنيق ومريح.",
    beauty: "تخفيضات الجمال",
    beautyDescription:
      "دلل نفسك بمنتجات الجمال الفاخرة بأسعار مخفضة، بما في ذلك العناية بالبشرة والمكياج والعطور لإطلالة مشرقة.",
    travel: "تخفيضات السفر",
    travelDescription:
      "استعد لمغامرتك القادمة مع عروضنا على مستلزمات السفر، بما في ذلك الخصومات على الحقائب والإكسسوارات والضروريات لرحلة مريحة.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `SALE`,
  };
}

const Page: FC<PropsType> = async props => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const {
    locale
  } = params;

  const session = await getSession();
  const cookieStore = await cookies();
  const userToken = cookieStore.get("x-user-session")?.value || "";
  const isLoggedIn = Boolean(session && session.user);

  const t =
    translations[locale as keyof typeof translations] || translations.en;


  const defaultCategory = { title: t.sale, description: t.saleDescription };
  const categoryData = defaultCategory;

  try {
    return (
      <PageWrapper>
        <SectionWrapper className="px-2.5 md:px-4 lg:px-6 xl:px-7 py-4 md:py-4 lg:py-8 max-w-screen-xl space-y-8">
          <CustomBreadcrumb activeLink={t.sale || ""} links={[]} />
          <div className="text-primary max-w-screen-md mx-auto space-y-4">
            <h1 className="text-3xl font-bold">{categoryData?.title || ""}</h1>
            <p>{categoryData?.description || ""}</p>
          </div>
          <SubCategoryProducts
            category={""}
            searchParams={{ ...searchParams, has_discount: "1" }}
          />
        </SectionWrapper>
        <RecentlyViewed
          className={cn("mt-16", sectionWrapperClassName)}
          isLoggedIn={isLoggedIn}
          token={
            session && session.user ? session.user.access_token : userToken
          }
        />
      </PageWrapper>
    );
  } catch (error) {
    console.log(error);
    return notFound();
  }
};

export default Page;
