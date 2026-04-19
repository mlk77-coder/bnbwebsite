"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import {
  ChevronRight,
  Phone,
  Mail,
  ArrowUp,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState, useEffect } from "react";

export type SocialLink = {
  id: number;
  type: "link" | "email" | "phone";
  value: string;
  image: string;
};

const socialIcons: Record<string, React.ReactNode> = {
  instagram: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  facebook: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  twitter: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  ),
};

const Footer = ({ socialLinks }: { socialLinks: SocialLink[] }) => {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const phoneLinks = socialLinks.filter((link) => link.type === "phone");
  const emailLinks = socialLinks.filter((link) => link.type === "email");
  const socialMediaLinks = socialLinks.filter((link) => link.type === "link");

  const footerLinks = {
    shopping: [
      { label: t("new-arrivals"), href: "/new-arrivals" },
      { label: t("best-sellers"), href: "/best-sellers" },
      { label: t("sale"), href: "/sale" },
      { label: t("size-chart"), href: "/size-chart" },
    ],
    customerService: [
      { label: t("delivery"), href: "/frequently-asked-questions/delivery-questions" },
      { label: t("returns-and-refunds"), href: "/frequently-asked-questions/returns-refunds" },
      { label: t("faqs"), href: "/frequently-asked-questions" },
      { label: t("contact-us.title"), href: "/contact-us" },
    ],
    aboutUs: [
      { label: t("about-bnb-store"), href: "/about-bnb-store" },
      { label: t("privacy-policy"), href: "/privacy-policy" },
      { label: t("terms-and-conditions"), href: "/terms-and-conditions" },
      { label: t("cookies-policy"), href: "/cookies-policy" },
    ],
  };

  return (
    <footer className="w-full bg-linear-to-b from-gray-50 to-white border-t border-gray-100">
      {/* Newsletter Section - Glassmorphism Card */}
      {/* <div className="max-w-screen-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {t("newsletter-title")}
                </h3>
                <p className="text-sm text-gray-500">
                  {t("newsletter-subtitle")}
                </p>
              </div>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <Input
                type="email"
                placeholder={t("enter-your-email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full md:w-72 h-11 bg-gray-50 border-gray-200 rounded-xl focus-visible:ring-primary/20"
              />
              <Button
                className="h-11 px-6 rounded-xl bg-primary hover:bg-primary/90 transition-all duration-300"
              >
                {t("subscribe")}
                <ChevronRight className="w-4 h-4 ms-1 rtl:rotate-180" />
              </Button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Footer Content */}
      <div className="max-w-screen-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/logo-light.png"
                alt="BNB Store"
                width={150}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
              {t("footer-description")}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              {phoneLinks.slice(0, 1).map((link) => (
                <a
                  key={link.id}
                  href={`https://wa.me/${link.value}`}
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary transition-colors group"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span dir="ltr">{link.value}</span>
                </a>
              ))}
              {emailLinks.slice(0, 1).map((link) => (
                <a
                  key={link.id}
                  href={`mailto:${link.value}`}
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary transition-colors group"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>{link.value}</span>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialMediaLinks.map((link) => {
                const platform = link.value
                  .toLowerCase()
                  .includes("instagram")
                  ? "instagram"
                  : link.value.toLowerCase().includes("facebook")
                  ? "facebook"
                  : link.value.toLowerCase().includes("twitter")
                  ? "twitter"
                  : null;

                return (
                  <a
                    key={link.id}
                    href={link.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center",
                      "text-gray-600 hover:bg-primary hover:text-white transition-all duration-300"
                    )}
                  >
                    {platform && socialIcons[platform] ? (
                      socialIcons[platform]
                    ) : (
                      <Image
                        src={link.image ?? ""}
                        alt="social"
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
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Shopping */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">
                {t("footer.title.shopping-with-bnb-store")}
              </h4>
              <ul className="space-y-3">
                {footerLinks.shopping.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 hover:text-primary transition-colors relative group"
                    >
                      {item.label}
                      <span className="absolute -bottom-0.5 inset-s-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">
                {t("footer.title.customer-service")}
              </h4>
              <ul className="space-y-3">
                {footerLinks.customerService.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 hover:text-primary transition-colors relative group"
                    >
                      {item.label}
                      <span className="absolute -bottom-0.5 inset-s-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Us */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">
                {t("footer.title.about-us")}
              </h4>
              <ul className="space-y-3">
                {footerLinks.aboutUs.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 hover:text-primary transition-colors relative group"
                    >
                      {item.label}
                      <span className="absolute -bottom-0.5 inset-s-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Payment Methods & Trust Badges */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500 uppercase tracking-wider">
                {t("payment-methods")}
              </span>
              <div className="flex items-center gap-2">
                <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-bold text-gray-600">
                  COD
                </div>
                <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center">
                  <svg className="w-6 h-4" viewBox="0 0 24 16" fill="currentColor">
                    <path d="M7 0H0v16h7V0zm8 0h-6v16h6V0zm8 0h-6v16h6V0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <p className="text-sm text-gray-500 text-center">
              © {new Date().getFullYear()} BNB Store. {t("all-rights-reserved")}
            </p>

            {/* Back to Top Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className={cn(
                "group flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-all duration-300",
                showScrollTop ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
            >
              {t("back-to-top")}
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
