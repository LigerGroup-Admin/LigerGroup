import { Download, Search, SlidersHorizontal } from "lucide-react";
import { AdminPageHeader } from "@/components/admin-page-header";
import { listSubmissions } from "@/server/submissions/repository";
import type { SubmissionRecord } from "@/server/submissions/schema";

const previewSubmissions: SubmissionRecord[] = [
  {
    id: "preview-1",
    site: "remote",
    type: "cohort_interest",
    name: "Tomi Adeyemi",
    email: "tomi@example.com",
    phone: "+234 800 000 0000",
    company: undefined,
    consent: true,
    website: undefined,
    status: "new",
    payload: { career_stage: "Changing careers", city: "Lagos" },
    sourcePage: "/remote",
    referrer: "Instagram",
    userAgent: null,
    createdAt: "2026-07-15T01:44:00.000Z",
  },
  {
    id: "preview-2",
    site: "force",
    type: "discovery_call",
    name: "James Barrett",
    email: "james@example.co.uk",
    phone: undefined,
    company: "North & Finch",
    consent: true,
    website: undefined,
    status: "qualified",
    payload: { team_size: "11–50", requirement: "Operations support" },
    sourcePage: "/force",
    referrer: "LinkedIn",
    userAgent: null,
    createdAt: "2026-07-15T01:26:00.000Z",
  },
  {
    id: "preview-3",
    site: "learn",
    type: "one_force_download",
    name: "Nneka Okafor",
    email: "nneka@example.com",
    phone: undefined,
    company: "Meridian Assurance",
    consent: true,
    website: undefined,
    status: "in_progress",
    payload: { role: "CHRO", merger_stage: "0–6 months post-close" },
    sourcePage: "/learn/one-force",
    referrer: "Direct",
    userAgent: null,
    createdAt: "2026-07-15T00:48:00.000Z",
  },
  {
    id: "preview-4",
    site: "remote",
    type: "sponsor_pack",
    name: "Aisha Oladipo",
    email: "aisha@example.org",
    phone: undefined,
    company: "FutureWorks Foundation",
    consent: true,
    website: undefined,
    status: "new",
    payload: { sponsorship_interest: "Sponsor a full cohort" },
    sourcePage: "/remote/sponsor",
    referrer: "Email",
    userAgent: null,
    createdAt: "2026-07-14T23:10:00.000Z",
  },
];

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
  const stored = await listSubmissions(50);
  const rows = stored.length ? stored : previewSubmissions;

  return (
    <main id="main-content" className="admin-page admin-subpage">
      <AdminPageHeader
        kicker="CRM / submissions"
        title="Leads & forms"
        description="Review every application, booking request, requirement, and download across all three sites."
        action={{ label: "Export CSV", icon: Download }}
      />

      <section className="admin-stats-strip" aria-label="Lead counts">
        <div><span>All leads</span><strong>{rows.length || 184}</strong></div>
        <div><span>Needs review</span><strong>37</strong></div>
        <div><span>In progress</span><strong>28</strong></div>
        <div><span>Qualified</span><strong>41</strong></div>
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
        <footer className="admin-data-panel__footer">
          <span>Showing {rows.length} records</span>
          <div><button type="button">Previous</button><button type="button">Next</button></div>
        </footer>
      </section>
    </main>
  );
}
