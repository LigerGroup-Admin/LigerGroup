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
    accent: "#000000",
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
