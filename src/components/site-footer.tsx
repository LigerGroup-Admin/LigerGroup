import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { publicBrands, socialLinksByBrand, type BrandKey } from "@/lib/brands";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TelegramIcon,
  XIcon,
} from "@/components/social-icons";

const socialIcons = {
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
  facebook: FacebookIcon,
  telegram: TelegramIcon,
};

type SiteFooterProps = {
  brand: BrandKey;
  statement: string;
  email: string;
  light?: boolean;
  termsHref?: string;
  privacyHref?: string;
};

export function SiteFooter({
  brand,
  statement,
  email,
  termsHref,
  privacyHref,
}: SiteFooterProps) {
  // Brands without their own dedicated Terms/Privacy page link to the
  // shared group-level page instead.
  const resolvedPrivacyHref = privacyHref ?? "/privacy";
  const resolvedTermsHref = termsHref ?? "/privacy#terms";
  const siblingBrands = publicBrands.filter((item) => item.key !== brand);
  const socialLinks = socialLinksByBrand[brand];

  return (
    <footer className="site-footer ink-field ink-field--deep">
      <div className="site-footer__main">
        <BrandMark brand={brand} />
        <div>
          <p className="site-footer__statement">{statement}</p>
          <a href={`mailto:${email}`} className="site-footer__email">
            {email}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          {socialLinks.length > 0 ? (
            <div className="site-footer__social">
              {socialLinks.map((item) => {
                const Icon = socialIcons[item.icon];
                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                  >
                    <Icon size={17} />
                  </a>
                ) : (
                  <span key={item.label} aria-label={`${item.label} — coming soon`}>
                    <Icon size={17} />
                  </span>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
      {siblingBrands.length > 0 ? (
        <div className="site-footer__siblings">
          <span>Also part of Liger Group</span>
          <div>
            {siblingBrands.map((item) => (
              <Link
                key={item.key}
                href={item.path}
                aria-label={item.name}
                className="site-footer__sibling"
              >
                <BrandMark brand={item.key} static />
              </Link>
            ))}
          </div>
        </div>
      ) : null}
      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} Liger Group</span>
        <div>
          <Link href={resolvedPrivacyHref}>Privacy</Link>
          <Link href={resolvedTermsHref}>Terms</Link>
          <Link href="/">Liger Group</Link>
        </div>
      </div>
    </footer>
  );
}
