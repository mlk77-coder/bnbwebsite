import { Link } from "@/navigation";
import Image from "next/image";
import { SITE_BRAND_NAME } from "@/lib/site-branding";

const Logo = () => {
  return (
    <Link
      className="inline-flex items-center h-8 lg:h-10 shrink-0"
      href="/"
      title={`Welcome to ${SITE_BRAND_NAME}`}
    >
      <Image
        src="/logo-light.png"
        alt={`${SITE_BRAND_NAME} logo`}
        priority
        width={200}
        height={56}
        className="h-8 max-w-[min(200px,42vw)] object-contain object-start lg:h-10"
        style={{ width: 'auto' }}
      />
    </Link>
  );
};

export default Logo;
