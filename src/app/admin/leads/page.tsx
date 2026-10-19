import { BarChart3, Download, Search, SlidersHorizontal } from "lucide-react";
import { AdminPageHeader } from "@/components/admin-page-header";
import { listSubmissions } from "@/server/submissions/repository";

const POSTHOG_ACTIVITY_URL = "https://eu.posthog.com/project/91021/activity/explore";

const typeLabels: Record<string, string> = {
  cohort_interest: "Cohort interest",
  sponsor_pack: "Sponsor pack",
  discovery_call: "Discovery call",
  requirement: "Requirement",
  one_force_download: "One Force overview",
  diagnostic_call: "Diagnostic call",
  contact: "Contact",
};

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default async function AdminLeadsPage() {
  const rows = await listSubmissions(1000);
  const needsReview = rows.filter((r) => r.status === "new").length;
  const inProgress = rows.filter((r) => r.status === "in_progress").length;
  const qualified = rows.filter((r) => r.status === "qualified").length;

  return (
    <main id="main-content" className="admin-page admin-subpage">
      <AdminPageHeader
        kicker="CRM / submissions"
        title="Leads & forms"
        description="Review every application, booking request, requirement, and download across all three sites."
        action={{ label: "Export CSV", icon: Download, href: "/api/admin/leads/export" }}
      />

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
        <div><span>All leads</span><strong>{rows.length}</strong></div>
        <div><span>Needs review</span><strong>{needsReview}</strong></div>
        <div><span>In progress</span><strong>{inProgress}</strong></div>
        <div><span>Qualified</span><strong>{qualified}</strong></div>
      </section>

      <section className="admin-data-panel">
        <div className="admin-toolbar">
          <label>
            <Search size={15} aria-hidden="true" />
            <input placeholder="Search name, email, or company" />
          </label>
          <div>
            <select aria-label="Filter by site" defaultValue="all">
              <option value="all">All sites</option>
              <option value="remote">LigerRemote</option>
              <option value="force">LigerForce</option>
              <option value="learn">LigerLearn</option>
            </select>
            <select aria-label="Filter by status" defaultValue="all">
              <option value="all">All statuses</option>
              <option value="new">New</option>
              <option value="in_progress">In progress</option>
              <option value="qualified">Qualified</option>
              <option value="closed">Closed</option>
            </select>
            <button type="button" aria-label="More filters">
              <SlidersHorizontal size={15} aria-hidden="true" />
            </button>
          </div>
        </div>

        {rows.length === 0 ? (
          <p className="admin-empty-state">
            No submissions yet. They will appear here as soon as someone fills out a form on
            LigerRemote, LigerForce, or LigerLearn.
          </p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Contact</th>
                  <th>Site</th>
                  <th>Conversion</th>
                  <th>Organisation / detail</th>
                  <th>Status</th>
                  <th>Received</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
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
        )}
        <footer className="admin-data-panel__footer">
          <span>Showing {rows.length} records</span>
          <div><button type="button">Previous</button><button type="button">Next</button></div>
        </footer>
      </section>
    </main>
  );
}
