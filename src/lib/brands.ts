export type BrandKey = "group" | "remote" | "force" | "learn";

export type Brand = {
  key: BrandKey;
  name: string;
  shortName: string;
  eyebrow: string;
  promise: string;
  description: string;
  path: string;
  accent: string;
};

export const brands: Record<BrandKey, Brand> = {
  group: {
    key: "group",
    name: "Liger Group",
    shortName: "Group",
    eyebrow: "Human performance, end to end",
    promise: "Potential, made operational.",
    description:
      "A Lagos-based group building talent, deploying capability, and transforming organisational performance.",
    path: "/",
    accent: "#b89243",
  },
  remote: {
    key: "remote",
    name: "LigerRemote",
    shortName: "Remote",
    eyebrow: "For ambitious African professionals",
    promise: "Build a remote career that travels.",
    description:
      "Practical training, real-world testing, and a credible pathway into global remote work.",
    path: "/remote",
    accent: "#467e6b",
  },
  force: {
    key: "force",
    name: "LigerForce",
    shortName: "Force",
    eyebrow: "For UK and US growth businesses",
    promise: "Managed. Vetted. Accountable.",
    description:
      "Reliable remote professionals without the hiring uncertainty or management overhead.",
    path: "/force",
    accent: "#0097b2",
  },
  learn: {
    key: "learn",
    name: "LigerLearn",
    shortName: "Learn",
    eyebrow: "For leaders and organisations",
    promise: "Performance before programmes.",
    description:
      "Corporate capability, leadership advisory, and executive search grounded in business outcomes.",
    path: "/learn",
    accent: "#902f2f",
  },
};

export const publicBrands = [brands.remote, brands.force, brands.learn];

export type SocialIconKey = "instagram" | "linkedin" | "x" | "facebook" | "telegram";

export type SocialLink = { label: string; href: string | null; icon: SocialIconKey };

// Only LigerRemote has live social accounts today (captured from
// ligerremote.com). The other businesses show the same platforms as
// placeholders — not linked — until they stand up their own.
export const socialLinksByBrand: Record<BrandKey, SocialLink[]> = {
  remote: [
    { label: "Instagram", href: "https://www.instagram.com/ligerremote/", icon: "instagram" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/ligerremote", icon: "linkedin" },
    { label: "X", href: "https://x.com/ligerremote", icon: "x" },
    { label: "Facebook", href: "https://www.facebook.com/Ligerremote", icon: "facebook" },
    { label: "Telegram", href: "https://t.me/+k2RrgPL84V84MTZk", icon: "telegram" },
  ],
  force: [
    { label: "Instagram", href: null, icon: "instagram" },
    { label: "LinkedIn", href: null, icon: "linkedin" },
    { label: "X", href: null, icon: "x" },
  ],
  learn: [
    { label: "Instagram", href: null, icon: "instagram" },
    { label: "LinkedIn", href: null, icon: "linkedin" },
    { label: "X", href: null, icon: "x" },
  ],
  group: [
    { label: "Instagram", href: null, icon: "instagram" },
    { label: "LinkedIn", href: null, icon: "linkedin" },
    { label: "X", href: null, icon: "x" },
  ],
};
