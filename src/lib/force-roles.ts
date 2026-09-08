export type ForceRoleOption = {
  slug: string;
  label: string;
};

export const FORCE_ROLE_OPTIONS: ForceRoleOption[] = [
  { slug: "va", label: "Virtual Assistant" },
  { slug: "sdr", label: "Sales Development Rep" },
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
