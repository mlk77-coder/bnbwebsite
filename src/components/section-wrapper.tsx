import { cn } from "@/lib/utils";
import {
  ComponentPropsWithoutRef,
  createElement,
  ElementType,
  FC,
  ReactNode,
} from "react";

interface PropsType extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  elementType?: ElementType;
}

export const sectionWrapperClassName =
  "px-2.5 md:px-4 lg:px-6 xl:px-24 py-4 md:py-8 lg:py-12 size-full mx-auto max-w-screen-3xl";
const SectionWrapper: FC<PropsType> = ({
  className,
  children,
  elementType = "section",
  ...props
}) => {
  return createElement(
    elementType,
    {
      ...props,
      className: cn(sectionWrapperClassName, className),
    },
    children
  );
};

export default SectionWrapper;
