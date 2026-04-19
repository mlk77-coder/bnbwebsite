import PageWrapper from "@/components/page-wrapper";
import SectionWrapper from "@/components/section-wrapper";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { Heart, Minus, MoveUpRight, Plus, Ruler, Truck } from "lucide-react";
import ProductImagesSlider from "../_components/product-images-slider";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <PageWrapper>
      <SectionWrapper className="size-full space-y-4 md:py-4 lg:py-6 max-w-screen-2xl">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Skeleton className="h-6 w-32" />
            </BreadcrumbItem>
            <BreadcrumbSeparator>|</BreadcrumbSeparator>
            <BreadcrumbItem>
              <Skeleton className="h-6 w-28" />
            </BreadcrumbItem>
            <BreadcrumbSeparator>|</BreadcrumbSeparator>
            <BreadcrumbItem>
              <Skeleton className="h-6 w-20" />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="size-full grid grid-cols-1 md:grid-cols-2 items-start gap-20">
          <div className="space-y-5">
            <Skeleton className="size-full overflow-hidden relative aspect-square ps-0" />
            <div className="flex justify-center items-center gap-2">
              <Skeleton className="size-10"/>
              <Skeleton  className="size-20"/>
              <Skeleton  className="size-20"/>
              <Skeleton  className="size-20"/>
              <Skeleton  className="size-20"/>
              <Skeleton  className="size-20"/>
              <Skeleton  className="size-20"/>
              <Skeleton className="size-10"/>

            </div>
          </div>
          <div className="space-y-5">
            <div className="space-y-3">
              <Skeleton className="h-6 w-60" />
              <Skeleton className="h-3 w-28" />
            </div>
            <div className="flex justify-start items-center gap-3">
              <Skeleton className="h-9 w-24" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-10/12" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <Separator />
            <div className="flex flex-col justify-start items-start gap-3">
              <div className="flex justify-start items-center gap-2">
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex justify-start items-center w-full gap-3 flex-wrap">
                <Skeleton className="rounded-full size-10" />
                <Skeleton className="rounded-full size-10" />
                <Skeleton className="rounded-full size-10" />
                <Skeleton className="rounded-full size-10" />
                <Skeleton className="rounded-full size-10" />
              </div>
            </div>
            <div className="flex flex-col justify-start items-start gap-5">
              <div className="flex justify-start items-center">
                <Skeleton className="h-5 w-20" />
              </div>
              <div className="flex justify-start items-center w-full gap-3 flex-wrap">
                <Skeleton className="size-10" />
                <Skeleton className="size-10" />
                <Skeleton className="size-10" />
                <Skeleton className="size-10" />
                <Skeleton className="size-10" />
              </div>
            </div>
            <div className="flex justify-start items-center gap-5">
              <Skeleton className="w-20 h-6" />
              <div className="flex justify-start items-center w-full gap-3 flex-wrap">
                <Skeleton className="size-10" />
                <Skeleton className="size-10" />
                <Skeleton className="size-10" />
              </div>
            </div>
            <div className="flex justify-center items-center gap-3">
              <Skeleton className="w-full h-11" />
              <Skeleton className="w-full h-11" />
            </div>
            <Skeleton className="w-9/12 h-4" />
            <Skeleton className="w-full h-11" />
            <Skeleton className="w-1/3 h-4" />
            {/* <div className="w-full space-y-4">
              <h3 className="font-bold text-primary text-lg">
                Product Details:
              </h3>
              <Separator />
              <div className="flex flex-col justify-start items-start gap-5">
                <p className="w-full flex justify-between items-center gap-3">
                  <span>Weight:</span>
                  <span>0.14KG</span>
                </p>
                <p className="w-full flex justify-between items-center gap-3">
                  <span>Weight:</span>
                  <span>0.14KG</span>
                </p>
                <p className="w-full flex justify-between items-center gap-3">
                  <span>Weight:</span>
                  <span>0.14KG</span>
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </SectionWrapper>
    </PageWrapper>
  );
};

export default Loading;
