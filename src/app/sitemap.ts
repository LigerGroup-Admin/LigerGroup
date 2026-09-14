import type { MetadataRoute } from "next";

const BASE_URL = "https://theliger.group";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/force`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/force/requirement`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/remote`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/remote/sponsor`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/remote/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/remote/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/learn`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/learn/one-force`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
