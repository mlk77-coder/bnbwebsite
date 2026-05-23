'use client';

import { Link } from '@/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';
import { useTranslations } from 'next-intl';
import { FC, Fragment } from 'react';

export type BreadcrumbLinkType = {
  name: string;
  slug: string;
};

type PropsType = {
  activeLink: string;
  links: BreadcrumbLinkType[];
  hasActiveLink?: boolean;
};

const CustomBreadcrumb: FC<PropsType> = ({
  activeLink,
  links,
  hasActiveLink = true,
}) => {
  const tA11y = useTranslations('accessibility');
  const tHome = useTranslations('home');

  return (
    <Breadcrumb ariaLabel={tA11y('breadcrumb')}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href='/'>{tHome('site-name')}</Link>
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
            <BreadcrumbPage className='text-orange'>{activeLink}</BreadcrumbPage>
          </BreadcrumbItem>
        ) : null}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
