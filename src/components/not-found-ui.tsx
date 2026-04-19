import Image from "next/image";
import PageWrapper from "./page-wrapper";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { Undo2 } from "lucide-react";

const NotFoundUi = () => {
  return (
    <PageWrapper
      dir="ltr"
      className="flex-1 flex justify-center flex-col items-center"
    >
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange">
          OOPS!
        </h1>
        <p className="text-lg md:text-2xl text-orange">PAGE NOT FOUND</p>
      </div>
      <Image
        src="/error.svg"
        alt="error 404 fot found"
        width={900}
        height={900}
      />
      <Link
        className={cn(buttonVariants({ size: "lg" }), "uppercase")}
        href="/"
      >
        <Undo2 className="size-5 me-1" />
        back to home
      </Link>
    </PageWrapper>
  );
};

export default NotFoundUi;
