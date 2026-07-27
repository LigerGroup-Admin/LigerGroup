import Link from "next/link";
import { brands, type BrandKey } from "@/lib/brands";

type BrandMarkProps = {
  brand: BrandKey;
  light?: boolean;
  href?: string;
  compact?: boolean;
  framed?: boolean;
};

export function BrandMark({
  brand,
  light = false,
  href,
  compact = false,
  framed = false,
}: BrandMarkProps) {
  const item = brands[brand];

  return (
    <Link
      href={href ?? item.path}
      className={`brand-mark ${light ? "brand-mark--light" : ""} ${
        framed ? "brand-mark--framed" : ""
      }`}
      aria-label={`${item.name} home`}
    >
      <span className="brand-mark__liger">Liger</span>
      <span
        className="brand-mark__divider"
        style={{ backgroundColor: item.accent }}
        aria-hidden="true"
      />
      <span className="brand-mark__entity">
        {compact ? item.shortName.slice(0, 1) : item.shortName}
      </span>
    </Link>
  );
}
