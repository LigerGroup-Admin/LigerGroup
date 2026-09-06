import Link from "next/link";
import { brands, type BrandKey } from "@/lib/brands";

type BrandMarkProps = {
  brand: BrandKey;
  light?: boolean;
  href?: string;
  compact?: boolean;
  framed?: boolean;
  /** Renders as a plain span instead of a Link — for use inside another link/button. */
  static?: boolean;
};

export function BrandMark({
  brand,
  light = false,
  href,
  compact = false,
  framed = false,
  static: isStatic = false,
}: BrandMarkProps) {
  const item = brands[brand];
  // Every brand's mark is tinted with its own accent colour (ring, divider,
  // and entity name) — Group's badge illustration stays black-and-white,
  // but its wordmark carries the same signature gold it always has.
  const brandTint = { "--brand-accent": item.accent } as React.CSSProperties;
  const className = `brand-mark ${light ? "brand-mark--light" : ""} ${
    framed ? "brand-mark--framed" : ""
  }`;
  const content = (
    <>
      <span className="brand-mark__liger">Liger</span>
      <span
        className="brand-mark__divider"
        style={{ backgroundColor: item.accent }}
        aria-hidden="true"
      />
      <span className="brand-mark__entity">
        {compact ? item.shortName.slice(0, 1) : item.shortName}
      </span>
    </>
  );

  if (isStatic) {
    return (
      <span className={className} style={brandTint} aria-hidden="true">
        {content}
      </span>
    );
  }

  return (
    <Link
      href={href ?? item.path}
      className={className}
      style={brandTint}
      aria-label={`${item.name} home`}
    >
      {content}
    </Link>
  );
}
