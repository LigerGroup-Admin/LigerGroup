import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ExternalLink, Globe2, XCircle } from "lucide-react";
import { AdminPageHeader } from "@/components/admin-page-header";
import { listSubmissions } from "@/server/submissions/repository";
import { checkSiteHealth } from "@/server/site-health";

const taglines: Record<string, string> = {
  remote: "Build a career the world can hire.",
  force: "Managed. Vetted. Accountable.",
  learn: "Performance before programmes.",
};

const purposes: Record<string, string> = {
  remote: "Talent acquisition",
  force: "Employer acquisition",
  learn: "Corporate credibility",
};

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default async function AdminWebsitesPage() {
  const [sites, submissions] = await Promise.all([checkSiteHealth(), listSubmissions(1000)]);
  const allUp = sites.every((s) => s.up);
  const supabaseConnected = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

  return (
    <main id="main-content" className="admin-page admin-subpage">
      <AdminPageHeader
        kicker="Digital estate"
        title="Websites"
        description="Live status and lead volume for each brand, checked in real time on every page load."
      />

      <section className="admin-domain-banner">
        {allUp ? <CheckCircle2 size={18} aria-hidden="true" /> : <XCircle size={18} aria-hidden="true" />}
        <div>
          <strong>{allUp ? "Platform healthy" : "Attention needed"}</strong>
          <span>
            {allUp
              ? "All public experiences are responding."
              : "At least one site is not responding — see details below."}
          </span>
        </div>
        <Link href="/" target="_blank">Open group gateway <ArrowUpRight size={14} /></Link>
      </section>

      <section className="admin-website-list">
        {sites.map((site) => {
          const siteLeads = submissions.filter((s) => s.site === site.brand);
          const lastSubmission = siteLeads[0];
          return (
            <article key={site.name}>
              <header>
                <div>
                  <i className={`site-dot site-dot--${site.brand}`} />
                  <div>
                    <h2>{site.name}</h2>
                    <p>{purposes[site.brand]}</p>
                  </div>
                </div>
                <span className={`admin-status ${site.up ? "admin-status--qualified" : "admin-status--closed"}`}>
                  {site.up ? "Live" : "Unreachable"}
                </span>
              </header>
              <div className={`admin-website-preview admin-website-preview--${site.brand}`}>
                <span>Liger / {site.name.replace("Liger", "")}</span>
                <strong>{taglines[site.brand]}</strong>
              </div>
              <dl>
                <div><dt>Primary domain</dt><dd>{site.domain}</dd></div>
                <div><dt>HTTP status</dt><dd>{site.statusCode ?? "No response"}</dd></div>
                <div><dt>Total leads</dt><dd>{siteLeads.length}</dd></div>
                <div>
                  <dt>Last submission</dt>
                  <dd>{lastSubmission ? formatTime(lastSubmission.createdAt) : "None yet"}</dd>
                </div>
              </dl>
              <footer>
                <Link href={`https://${site.domain}`} target="_blank">
                  <ExternalLink size={14} /> Visit site
                </Link>
              </footer>
            </article>
          );
        })}
      </section>

      <section className="admin-integrations-panel">
        <div><p className="admin-kicker">Shared services</p><h2>Platform integrations</h2></div>
        <div>
          {[
            ["Supabase", "Database for form submissions", supabaseConnected ? "Connected" : "Configuration required"],
            ["PostHog", "Consent-aware product and web analytics", "Configuration required"],
            ["Resend", "Form notifications and follow-up email", "Configuration required"],
            ["Calendly", "LigerForce discovery call scheduling", "Configuration required"],
          ].map(([name, purpose, status]) => (
            <div key={name}><div><strong>{name}</strong><span>{purpose}</span></div><b>{status}</b></div>
          ))}
        </div>
      </section>
    </main>
  );
}
