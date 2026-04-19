"use client";

import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/navigation";
import { ComponentProps, FC } from "react";

interface PropsType extends ComponentProps<typeof Link> {
  children: React.ReactNode;
  activeClassName: string; // The class to apply when the current pathname matches the slug
  className?: string; // Optional additional class names
  slug: string; // The slug used to determine the active state
  disabled?: boolean;
}

/**
 * ClientLink component
 *
 * A custom Link component that applies an active class name if the current pathname includes the given slug.
 *
 * @param {React.ReactNode} children - The content inside the Link.
 * @param {string} activeClassName - The CSS class applied when the link is active.
 * @param {string} className - Additional class names to apply (optional).
 * @param {string} slug - The slug used to determine if the link should be active.
 * @param {object} props - Remaining props passed down to the Link component.
 *
 * @returns {JSX.Element} The rendered Link component with conditional active class.
 */
const ClientLink: FC<PropsType> = ({
  children,
  activeClassName,
  className,
  slug,
  disabled = false,
  ...props
}) => {
  // Get the current pathname from the router
  const pathname = usePathname();

  return (
    <Link
      // Combine the provided className and activeClassName if the pathname includes the slug
      className={cn(
        className,
        pathname.includes(slug) && !disabled ? activeClassName : ""
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export default ClientLink;
