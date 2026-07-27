import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import type { BrandKey } from "@/lib/brands";

export type NavItem = {
  label: string;
  href: string;
};

type SiteHeaderProps = {
  brand: BrandKey;
  nav: NavItem[];
  cta?: { label: string; href: string };
  light?: boolean;
  announcement?: React.ReactNode;
};

export function SiteHeader({
  brand,
  nav,
  cta,
  light = false,
  announcement,
}: SiteHeaderProps) {
  return (
    <>
      {announcement ? <div className="site-announcement">{announcement}</div> : null}
      <header className={`site-header ${light ? "site-header--light" : ""}`}>
        <BrandMark brand={brand} light={light} framed />

        <nav className="site-header__desktop" aria-label="Main navigation">
          {nav.map((item) => (
            <Link key={item.label} href={item.href} className="site-header__link">
              {item.label}
            </Link>
          ))}
        </nav>

        {cta ? (
          <Link href={cta.href} className="site-header__cta">
            {cta.label}
            <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
          </Link>
        ) : null}

        <details className="site-header__mobile">
          <summary aria-label="Open navigation">
            <Menu className="menu-open" size={22} aria-hidden="true" />
            <X className="menu-close" size={22} aria-hidden="true" />
          </summary>
          <nav aria-label="Mobile navigation">
            {nav.map((item) => (
              <Link key={item.label} href={item.href}>
                {item.label}
              </Link>
            ))}
            {cta ? (
              <Link href={cta.href} className="site-header__mobile-cta">
                {cta.label}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            ) : null}
          </nav>
        </details>
      </header>
    </>
  );
}
