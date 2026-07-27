import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ExternalLink, Globe2, Settings2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin-page-header";

const sites = [
  { name: "LigerRemote", brand: "remote", domain: "ligerremote.com", route: "/remote", purpose: "Talent acquisition", pages: 2, conversion: "Cohort application", score: "96" },
  { name: "LigerForce", brand: "force", domain: "ligerforce.com", route: "/force", purpose: "Employer acquisition", pages: 2, conversion: "Discovery call", score: "98" },
  { name: "LigerLearn", brand: "learn", domain: "ligerlearn.org", route: "/learn", purpose: "Corporate credibility", pages: 2, conversion: "One Force download", score: "94" },
];

export default function AdminWebsitesPage() {
  return (
    <main id="main-content" className="admin-page admin-subpage">
      <AdminPageHeader
        kicker="Digital estate"
        title="Websites"
        description="Manage domains, publishing, conversion goals, integrations, and site health from one view."
        action={{ label: "Domain settings", icon: Globe2 }}
      />

      <section className="admin-domain-banner">
        <CheckCircle2 size={18} aria-hidden="true" />
        <div><strong>Platform healthy</strong><span>All public experiences are responding. SSL and form endpoints are available.</span></div>
        <Link href="/" target="_blank">Open group gateway <ArrowUpRight size={14} /></Link>
      </section>

      <section className="admin-website-list">
        {sites.map((site) => (
          <article key={site.name}>
            <header>
              <div><i className={`site-dot site-dot--${site.brand}`} /><div><h2>{site.name}</h2><p>{site.purpose}</p></div></div>
              <span className="admin-status admin-status--qualified">Live</span>
            </header>
            <div className={`admin-website-preview admin-website-preview--${site.brand}`}>
              <span>Liger / {site.name.replace("Liger", "")}</span>
              <strong>{site.brand === "remote" ? "Build a career the world can hire." : site.brand === "force" ? "Managed. Vetted. Accountable." : "Performance before programmes."}</strong>
            </div>
            <dl>
              <div><dt>Primary domain</dt><dd>{site.domain}</dd></div>
              <div><dt>Published pages</dt><dd>{site.pages}</dd></div>
              <div><dt>Primary conversion</dt><dd>{site.conversion}</dd></div>
              <div><dt>Performance score</dt><dd>{site.score} / 100</dd></div>
            </dl>
            <footer>
              <Link href={site.route} target="_blank"><ExternalLink size={14} /> Visit site</Link>
              <button type="button"><Settings2 size={14} /> Manage</button>
            </footer>
          </article>
        ))}
      </section>

      <section className="admin-integrations-panel">
        <div><p className="admin-kicker">Shared services</p><h2>Platform integrations</h2></div>
        <div>
          {[
            ["Supabase", "Database, authentication, and media", "Configuration required"],
            ["PostHog", "Consent-aware product and web analytics", "Configuration required"],
            ["Resend", "Form notifications and follow-up email", "Configuration required"],
            ["Calendly", "LigerForce discovery call scheduling", "Configuration required"],
          ].map(([name, purpose, status]) => (
            <div key={name}><div><strong>{name}</strong><span>{purpose}</span></div><b>{status}</b><button type="button">Configure</button></div>
          ))}
        </div>
      </section>
    </main>
  );
}
