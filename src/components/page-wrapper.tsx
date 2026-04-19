import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, FC, ReactNode } from "react";

interface PropsType extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}
const PageWrapper: FC<PropsType> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "size-full flex flex-col justify-start items-start flex-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
