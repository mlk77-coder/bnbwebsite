import { LetterPullup } from "@/components/letter-pullup";
import PageWrapper from "@/components/page-wrapper";
import Image from "next/image";

const Loading = () => {
  return (
    <PageWrapper className="flex flex-col justify-center items-center mx-auto max-w-screen-md">
      <Image
        src="/logo-light.png"
        width={300}
        height={300}
        alt="logo"
      />
      <LetterPullup
        words="BNB Store"
        className="text-6xl text-primary font-serif"
      />
    </PageWrapper>
  );
};

export default Loading;
