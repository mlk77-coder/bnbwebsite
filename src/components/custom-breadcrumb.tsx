import { Link } from "@/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { FC, Fragment } from "react";

// Define the type for each breadcrumb link
export type BreadcrumbLinkType = {
  name: string;
  slug: string;
};

type PropsType = {
  activeLink: string; // The currently active breadcrumb (the last one in the list)
  links: BreadcrumbLinkType[]; // An array of breadcrumb links (excluding the active one)
  hasActiveLink?: boolean;
};

/**
 * CustomBreadcrumb component
 *
 * A component to render breadcrumb navigation. It displays the given list of links
 * and highlights the active link at the end.
 *
 * @param {string} activeLink - The name of the currently active breadcrumb.
 * @param {BreadcrumbLinkType[]} links - An array of breadcrumb links with names and slugs.
 *
 * @returns {JSX.Element} The rendered breadcrumb navigation.
 */
const CustomBreadcrumb: FC<PropsType> = ({
  activeLink,
  links,
  hasActiveLink = true,
}) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">BNB Store</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>|</BreadcrumbSeparator>

        {links.map((link, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={link.slug}>{link.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {!hasActiveLink && index === links.length - 1 ? null : (
              <BreadcrumbSeparator>|</BreadcrumbSeparator>
            )}
          </Fragment>
        ))}
        {hasActiveLink ? (
          <BreadcrumbItem>
            <BreadcrumbPage className="text-orange">
              {activeLink}
            </BreadcrumbPage>
          </BreadcrumbItem>
        ) : null}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
