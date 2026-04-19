import SectionWrapper from "@/components/section-wrapper";
import Image from "next/image";

const AD = () => {
  return (
    <SectionWrapper>
      <div className="w-full relative max-md:aspect-video">
        <Image
          src="/Background.png"
          alt="men"
          width={2000}
          height={2000}
          className="size-full object-cover md:object-contain"
        />
      </div>
    </SectionWrapper>
  );
};

export default AD;
