'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { SocialLink } from '@/features/social';
import { Link } from '@/navigation';
import { ArrowUp, Mail, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export type { SocialLink };

const socialIcons: Record<string, React.ReactNode> = {
  instagram: (
    <svg
      className='h-5 w-5'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <rect width='20' height='20' x='2' y='2' rx='5' ry='5' />
      <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
      <line x1='17.5' x2='17.51' y1='6.5' y2='6.5' />
    </svg>
  ),
  facebook: (
    <svg
      className='h-5 w-5'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
    </svg>
  ),
  twitter: (
    <svg
      className='h-5 w-5'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' />
    </svg>
  ),
};

const Footer = ({ socialLinks }: { socialLinks: SocialLink[] }) => {
  const t = useTranslations();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const phoneLinks = socialLinks.filter(link => link.type === 'phone');
  const emailLinks = socialLinks.filter(link => link.type === 'email');
  const socialMediaLinks = socialLinks.filter(link => link.type === 'link');

  const footerLinks = {
    shopping: [
      { label: t('new-arrivals'), href: '/new-arrivals' },
      { label: t('best-sellers'), href: '/best-sellers' },
      { label: t('sale'), href: '/sale' },
    ],
    customerService: [
      { label: t('contact-us.title'), href: '/contact-us' },
    ],
  };

  return (
    <footer className='w-full border-t border-gray-100 bg-linear-to-b from-gray-50 to-white'>
      {/* Main Footer Content */}
      <div className='max-w-screen-3xl mx-auto px-2.5 md:px-4 lg:px-6 xl:px-24 pt-12 pb-8'>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12'>
          {/* Brand Column */}
          <div className='space-y-6 lg:col-span-4'>
            <Link href='/' className='inline-block'>
              <Image
                src='/logo-light.png'
                alt='BNB Store'
                width={150}
                height={40}
                className='h-10 w-auto object-contain'
              />
            </Link>
            <p className='max-w-xs text-sm leading-relaxed text-gray-600'>
              {t('footer-description')}
            </p>

            {/* Contact Info */}
            <div className='space-y-3'>
              {phoneLinks.slice(0, 1).map(link => (
                <a
                  key={link.id}
                  href={`https://wa.me/${link.value}`}
                  className='hover:text-primary group flex items-center gap-3 text-sm text-gray-600 transition-colors'
                >
                  <div className='group-hover:bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 transition-colors'>
                    <Phone className='h-4 w-4' />
                  </div>
                  {/* <span dir='ltr'>{link.value}</span> */}
                  <span dir='ltr'>+963981296153</span>
                </a>
              ))}
              {emailLinks.slice(0, 1).map(link => (
                <a
                  key={link.id}
                  href={`mailto:${link.value}`}
                  className='hover:text-primary group flex items-center gap-3 text-sm text-gray-600 transition-colors'
                >
                  <div className='group-hover:bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 transition-colors'>
                    <Mail className='h-4 w-4' />
                  </div>
                  {/* <span>{link.value}</span> */}
                  <span>ibrahim.said@gmail.com</span>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className='flex items-center gap-2'>
              {socialMediaLinks.map(link => {
                const platform = link.value.toLowerCase().includes('instagram')
                  ? 'instagram'
                  : link.value.toLowerCase().includes('facebook')
                    ? 'facebook'
                    : link.value.toLowerCase().includes('twitter')
                      ? 'twitter'
                      : null;

                return (
                  <a
                    key={link.id}
                    href={link.value}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100',
                      'hover:bg-primary text-gray-600 transition-all duration-300 hover:text-white'
                    )}
                  >
                    {platform && socialIcons[platform] ? (
                      socialIcons[platform]
                    ) : (
                      <Image
                        src={link.image ?? ''}
                        alt='social'
                        width={20}
                        height={20}
                      />
                    )}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-8'>
            {/* Shopping */}
            <div className='space-y-4'>
              <h4 className='font-semibold text-gray-900'>
                {t('footer.title.shopping-with-bnb-store')}
              </h4>
              <ul className='space-y-3'>
                {footerLinks.shopping.map(item => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className='hover:text-primary group relative text-sm text-gray-600 transition-colors'
                    >
                      {item.label}
                      <span className='bg-primary absolute inset-s-0 -bottom-0.5 h-0.5 w-0 transition-all duration-300 group-hover:w-full' />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div className='space-y-4'>
              <h4 className='font-semibold text-gray-900'>
                {t('footer.title.customer-service')}
              </h4>
              <ul className='space-y-3'>
                {footerLinks.customerService.map(item => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className='hover:text-primary group relative text-sm text-gray-600 transition-colors'
                    >
                      {item.label}
                      <span className='bg-primary absolute inset-s-0 -bottom-0.5 h-0.5 w-0 transition-all duration-300 group-hover:w-full' />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Payment Methods & Trust Badges */}
        <div className='mt-12 border-t border-gray-100 pt-8'>
          <div className='flex flex-col items-center justify-between gap-6 md:flex-row'>
            {/* Payment Methods */}
            <div className='flex items-center gap-4'>
              <span className='text-xs tracking-wider text-gray-500 uppercase'>
                {t('payment-methods')}
              </span>
              <div className='flex items-center gap-2'>
                <div className='flex h-6 w-10 items-center justify-center rounded bg-gray-200 text-xs font-bold text-gray-600'>
                  COD
                </div>
                <div className='flex h-6 w-10 items-center justify-center rounded bg-gray-200'>
                  <svg
                    className='h-4 w-6'
                    viewBox='0 0 24 16'
                    fill='currentColor'
                  >
                    <path d='M7 0H0v16h7V0zm8 0h-6v16h6V0zm8 0h-6v16h6V0z' />
                  </svg>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <p className='text-center text-sm text-gray-500'>
              © {new Date().getFullYear()} BNB Store. {t('all-rights-reserved')}
            </p>

            {/* Back to Top Button */}
            <Button
              variant='ghost'
              size='sm'
              onClick={scrollToTop}
              className={cn(
                'group hover:text-primary flex items-center gap-2 text-sm text-gray-500 transition-all duration-300',
                showScrollTop ? 'opacity-100' : 'pointer-events-none opacity-0'
              )}
            >
              {t('back-to-top')}
              <ArrowUp className='h-4 w-4 transition-transform group-hover:-translate-y-1' />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
