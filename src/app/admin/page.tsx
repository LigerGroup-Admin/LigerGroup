import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  ShieldAlert,
  UsersRound,
  XCircle,
} from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { listSubmissions } from "@/server/submissions/repository";
import { checkSiteHealth } from "@/server/site-health";
import { AdminDateRangeSelect } from "@/components/admin-date-range-select";

const typeLabels: Record<string, string> = {
  cohort_interest: "Cohort interest",
  sponsor_pack: "Sponsor pack",
  discovery_call: "Discovery call",
  requirement: "Requirement",
  one_force_download: "One Force overview",
  diagnostic_call: "Diagnostic call",
  contact: "Contact",
};

const rangeLabels: Record<string, string> = {
  "7d": "in the last 7 days",
  "30d": "in the last 30 days",
  "90d": "in the last 90 days",
  all: "all time",
};

function referrerLabel(referrer: string | null) {
  if (!referrer) return "Direct";
  try {
    return new URL(referrer).hostname;
  } catch {
    return "Direct";
  }
}

function relativeTime(value: string) {
  const diffMs = Date.now() - new Date(value).getTime();
  const minutes = Math.round(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hr${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

export default async function AdminOverviewPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const { range: rawRange } = await searchParams;
  const range = ["7d", "30d", "90d", "all"].includes(rawRange ?? "") ? rawRange! : "all";

  const [user, allSubmissions, siteHealth] = await Promise.all([
    currentUser(),
    listSubmissions(1000),
    checkSiteHealth(),
  ]);

  const firstName = user?.firstName?.trim() || user?.primaryEmailAddress?.emailAddress || "there";

  const now = new Date();
  const hour = now.getHours();
  const timeOfDay = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";
  const dateLabel = now.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const submissions =
    range === "all"
      ? allSubmissions
      : allSubmissions.filter((s) => {
          const days = range === "7d" ? 7 : range === "90d" ? 90 : 30;
          return new Date(s.createdAt).getTime() >= Date.now() - days * 24 * 60 * 60 * 1000;
        });

  const needsReview = submissions.filter((s) => s.status === "new").length;
  const inProgress = submissions.filter((s) => s.status === "in_progress").length;
  const qualified = submissions.filter((s) => s.status === "qualified").length;

  const metrics = [
    { label: "Leads", value: submissions.length, icon: UsersRound },
    { label: "Needs review", value: needsReview, icon: ShieldAlert },
    { label: "In progress", value: inProgress, icon: Clock3 },
    { label: "Qualified", value: qualified, icon: CheckCircle2 },
  ];

  const recentLeads = allSubmissions.slice(0, 4);
  const allSitesUp = siteHealth.every((s) => s.up);

  return (
    <main id="main-content" className="admin-page">
      <div className="admin-page__heading">
        <div>
          <p className="admin-kicker">{dateLabel}</p>
          <h1>Good {timeOfDay}, {firstName}.</h1>
          <p>Here is what is happening across the Liger portfolio, {rangeLabels[range]}.</p>
        </div>
        <AdminDateRangeSelect />
      </div>

      <section className="admin-metrics" aria-label="Portfolio metrics">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <article key={metric.label}>
              <div className="admin-metric__top">
                <span>{metric.label}</span>
                <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
              </div>
              <strong>{metric.value}</strong>
            </article>
          );
        })}
      </section>

      <section className="admin-dashboard-grid">
        <article className="admin-panel admin-panel--sites">
          <header className="admin-panel__header">
            <div>
              <p>Site health</p>
              <h2>Across the portfolio</h2>
            </div>
            <Link href="/admin/websites" aria-label="Manage websites">
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </header>
          <div className="admin-sites-list">
            {siteHealth.map((site) => {
              const leads = submissions.filter((s) => s.site === site.brand).length;
              return (
                <div key={site.name}>
                  <i className={`site-dot site-dot--${site.brand}`} />
                  <div>
                    <strong>{site.name}</strong>
                    <span>
                      {leads} lead{leads === 1 ? "" : "s"}
                      {range === "all" ? " total" : ` (${rangeLabels[range]})`}
                    </span>
                  </div>
                  <b style={{ color: site.up ? "#1b7a4d" : "#b3261e" }}>
                    {site.up ? "Live" : "Unreachable"}
                  </b>
                </div>
              );
            })}
          </div>
          <div className="admin-site-status">
            {allSitesUp ? (
              <CheckCircle2 size={16} aria-hidden="true" />
            ) : (
              <XCircle size={16} aria-hidden="true" />
            )}
            <span>
              {allSitesUp
                ? "All three sites are live and responding normally"
                : "One or more sites are not responding — check Websites for details"}
            </span>
          </div>
        </article>

        <article className="admin-panel admin-panel--leads">
          <header className="admin-panel__header">
            <div>
              <p>Latest activity</p>
              <h2>New leads</h2>
            </div>
            <Link href="/admin/leads" className="admin-panel__link">
              View all <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </header>
          {recentLeads.length === 0 ? (
            <p className="admin-empty-state">
              No submissions yet — they will show up here as soon as someone fills out a form.
            </p>
          ) : (
            <div className="admin-lead-list">
              {recentLeads.map((lead) => (
                <div key={lead.id}>
                  <span className={`admin-avatar admin-avatar--${lead.site}`}>
                    {lead.name
                      .split(/\s+/)
                      .map((p) => p[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>
                  <div>
                    <strong>{lead.name}</strong>
                    <span>
                      {typeLabels[lead.type] ?? lead.type} · Liger
                      {lead.site.charAt(0).toUpperCase() + lead.site.slice(1)}
                    </span>
                  </div>
                  <div>
                    <b>{referrerLabel(lead.referrer)}</b>
                    <time>{relativeTime(lead.createdAt)}</time>
                  </div>
                </div>
              ))}
            </div>
          )}
        </article>
      </section>
    </main>
  );
}
