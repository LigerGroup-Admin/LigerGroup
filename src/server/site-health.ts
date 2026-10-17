export type SiteHealth = {
  name: string;
  brand: "remote" | "force" | "learn";
  domain: string;
  route: string;
  up: boolean;
  statusCode: number | null;
};

const sites: Array<Pick<SiteHealth, "name" | "brand" | "domain" | "route">> = [
  { name: "LigerRemote", brand: "remote", domain: "ligerremote.com", route: "/remote" },
  { name: "LigerForce", brand: "force", domain: "ligerforce.com", route: "/force" },
  { name: "LigerLearn", brand: "learn", domain: "ligerlearn.org", route: "/learn" },
];

// A genuine, real-time check — not a stored/cached status — so the admin
// dashboard never shows "live" for a site that's actually down.
export async function checkSiteHealth(): Promise<SiteHealth[]> {
  return Promise.all(
    sites.map(async (site) => {
      try {
        const response = await fetch(`https://${site.domain}/`, {
          method: "HEAD",
          signal: AbortSignal.timeout(5000),
          cache: "no-store",
        });
        return { ...site, up: response.ok, statusCode: response.status };
      } catch {
        return { ...site, up: false, statusCode: null };
      }
    }),
  );
}
