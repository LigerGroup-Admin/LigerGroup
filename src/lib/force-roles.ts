export type ForceRoleOption = {
  slug: string;
  label: string;
  priceRange?: string;
};

export const FORCE_ROLE_OPTIONS: ForceRoleOption[] = [
  { slug: "va", label: "Virtual Assistant", priceRange: "$1,400–$1,500/month" },
  { slug: "sdr", label: "Sales Development Rep", priceRange: "$1,800–$2,200/month" },
  { slug: "support", label: "Customer Support Specialist" },
  { slug: "ea", label: "Executive Assistant" },
  { slug: "bookkeeping", label: "Bookkeeping & Admin Support" },
  { slug: "social", label: "Social Media/Content Coordinator" },
];

export const FORCE_ROLE_OTHER_SLUG = "other";

export function forceRoleLabel(slug: string): string | null {
  if (slug === FORCE_ROLE_OTHER_SLUG) return "Other";
  return FORCE_ROLE_OPTIONS.find((role) => role.slug === slug)?.label ?? null;
}

export function forceRolePriceLine(slug: string): string | null {
  if (slug === FORCE_ROLE_OTHER_SLUG) {
    return "We will share tailored pricing for this role on the call.";
  }
  const role = FORCE_ROLE_OPTIONS.find((role) => role.slug === slug);
  if (!role) return null;
  if (!role.priceRange) {
    return "We will share tailored pricing for this role on the call.";
  }
  return `Most ${role.label} engagements start at ${role.priceRange}.`;
}
