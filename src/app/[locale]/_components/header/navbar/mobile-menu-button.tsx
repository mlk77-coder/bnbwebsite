import { Button } from "@/components/ui/button";
import { AlignJustify } from "lucide-react";

const MobileMenuButton = () => {
  return (
    <Button
      className="xl:hidden group relative z-0"
      variant="ghost"
      size="icon"
    >
      <span className="sr-only">more</span>
      <AlignJustify className="size-5" />
    </Button>
  );
};

export default MobileMenuButton;
