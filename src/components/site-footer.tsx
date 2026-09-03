import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import type { BrandKey } from "@/lib/brands";

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
  // Until a brand has its own published Terms/Privacy page, route the link
  // to a real request rather than a dead "#" anchor.
  const resolvedPrivacyHref =
    privacyHref ?? `mailto:${email}?subject=${encodeURIComponent("Privacy policy request")}`;
  const resolvedTermsHref =
    termsHref ?? `mailto:${email}?subject=${encodeURIComponent("Terms & conditions request")}`;

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
        </div>
      </div>
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
