import Link from "next/link";
import { BarChart3, Download } from "lucide-react";
import { AdminPageHeader } from "@/components/admin-page-header";
import { AdminLeadsFilters } from "@/components/admin-leads-filters";
import {
  AdminDeleteSelectedButton,
  AdminSelectAllCheckbox,
} from "@/components/admin-delete-selected-button";
import { listSubmissions } from "@/server/submissions/repository";
import { matchesSubmissionFilters, parseSubmissionFilters } from "@/server/submissions/filters";

const POSTHOG_ACTIVITY_URL = "https://eu.posthog.com/project/91021/activity/explore";
const PAGE_SIZE = 25;

const typeLabels: Record<string, string> = {
  cohort_interest: "Cohort interest",
  sponsor_pack: "Sponsor pack",
  discovery_call: "Discovery call",
  requirement: "Requirement",
  one_force_download: "One Force overview",
  diagnostic_call: "Diagnostic call",
  contact: "Contact",
  "learn-conversation": "Qualifying conversation",
};

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{
    site?: string;
    status?: string;
    range?: string;
    q?: string;
    page?: string;
    deleted?: string;
  }>;
}) {
  const { page: rawPage, deleted, ...rawFilters } = await searchParams;
  const { site, status, range, q } = parseSubmissionFilters(rawFilters);
  const page = Math.max(1, Number(rawPage) || 1);

  const allRows = await listSubmissions(1000);
  const filtered = allRows.filter((row) => matchesSubmissionFilters(row, { site, status, range, q }));

  const needsReview = filtered.filter((r) => r.status === "new").length;
  const inProgress = filtered.filter((r) => r.status === "in_progress").length;
  const qualified = filtered.filter((r) => r.status === "qualified").length;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Shared across the export link, the delete redirect, and the pagination
  // links, so every one of them stays scoped to the filters currently on
  // screen rather than silently falling back to the whole table.
  const filterParams = new URLSearchParams();
  if (site !== "all") filterParams.set("site", site);
  if (status !== "all") filterParams.set("status", status);
  if (range !== "all") filterParams.set("range", range);
  if (q) filterParams.set("q", q);

  function pageHref(targetPage: number) {
    const params = new URLSearchParams(filterParams);
    if (targetPage > 1) params.set("page", String(targetPage));
    const qs = params.toString();
    return `/admin/leads${qs ? `?${qs}` : ""}`;
  }

  const exportHref = (() => {
    const qs = filterParams.toString();
    return `/api/admin/leads/export${qs ? `?${qs}` : ""}`;
  })();

  return (
    <main id="main-content" className="admin-page admin-subpage">
      <AdminPageHeader
        kicker="CRM / submissions"
        title="Leads & forms"
        description="Review every application, booking request, requirement, and download across all three sites."
        action={{ label: "Export CSV", icon: Download, href: exportHref }}
      />

      {deleted ? (
        <div className="admin-banner admin-banner--success">
          Deleted {deleted} lead{deleted === "1" ? "" : "s"}.
        </div>
      ) : null}

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "-1.25rem", marginBottom: "1.25rem" }}>
        <a
          href={POSTHOG_ACTIVITY_URL}
          target="_blank"
          rel="noreferrer"
          className="admin-panel__link"
        >
          <BarChart3 size={14} aria-hidden="true" /> View real-time activity in PostHog
        </a>
      </div>

      <section className="admin-stats-strip" aria-label="Lead counts">
        <div><span>Matching leads</span><strong>{filtered.length}</strong></div>
        <div><span>Needs review</span><strong>{needsReview}</strong></div>
        <div><span>In progress</span><strong>{inProgress}</strong></div>
        <div><span>Qualified</span><strong>{qualified}</strong></div>
      </section>

      <section className="admin-data-panel">
        <AdminLeadsFilters />

        {filtered.length === 0 ? (
          <p className="admin-empty-state">
            {allRows.length === 0
              ? "No submissions yet. They will appear here as soon as someone fills out a form on LigerRemote, LigerForce, or LigerLearn."
              : "No leads match these filters."}
          </p>
        ) : (
          <form action="/api/admin/leads/delete" method="post">
            <input type="hidden" name="redirectTo" value={pageHref(currentPage)} />
            <div className="admin-table-actions">
              <AdminDeleteSelectedButton />
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th><AdminSelectAllCheckbox /></th>
                    <th>Contact</th>
                    <th>Site</th>
                    <th>Conversion</th>
                    <th>Organisation / detail</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Received</th>
                  </tr>
                </thead>
                <tbody>
                  {pageRows.map((row) => (
                    <tr key={row.id}>
                      <td><input type="checkbox" name="id" value={row.id} /></td>
                      <td>
                        <strong>{row.name}</strong>
                        <span>{row.email}</span>
                      </td>
                      <td>
                        <span className="admin-site-name">
                          <i className={`site-dot site-dot--${row.site}`} />
                          Liger{row.site.charAt(0).toUpperCase() + row.site.slice(1)}
                        </span>
                      </td>
                      <td>{typeLabels[row.type] ?? row.type}</td>
                      <td>
                        <strong>{row.company ?? row.payload.city ?? "—"}</strong>
                        <span>{row.payload.role ?? row.payload.career_stage ?? ""}</span>
                      </td>
                      <td>
                        <span
                          className={`admin-status admin-status--${row.emailVerified ? "qualified" : "closed"}`}
                        >
                          {row.emailVerified ? "Verified" : "Unverified"}
                        </span>
                      </td>
                      <td>
                        <span className={`admin-status admin-status--${row.status}`}>
                          {row.status.replace("_", " ")}
                        </span>
                      </td>
                      <td><time>{formatTime(row.createdAt)}</time></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </form>
        )}
        <footer className="admin-data-panel__footer">
          <span>
            Showing {pageRows.length} of {filtered.length} matching record
            {filtered.length === 1 ? "" : "s"}
          </span>
          <div>
            {currentPage > 1 ? (
              <Link href={pageHref(currentPage - 1)}>Previous</Link>
            ) : (
              <span aria-disabled="true">Previous</span>
            )}
            {currentPage < totalPages ? (
              <Link href={pageHref(currentPage + 1)}>Next</Link>
            ) : (
              <span aria-disabled="true">Next</span>
            )}
          </div>
        </footer>
      </section>
    </main>
  );
}
