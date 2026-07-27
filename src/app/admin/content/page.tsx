import Link from "next/link";
import { ArrowUpRight, FilePlus2, MoreHorizontal } from "lucide-react";
import { AdminPageHeader } from "@/components/admin-page-header";

const contentRows = [
  ["Liger Group gateway", "/", "group", "Published", "Lola O.", "15 Jul, 01:52"],
  ["LigerRemote home", "/remote", "remote", "Published", "Lola O.", "15 Jul, 01:54"],
  ["Sponsor a cohort", "/remote/sponsor", "remote", "Draft", "Lola O.", "15 Jul, 02:21"],
  ["LigerForce home", "/force", "force", "Published", "Lola O.", "15 Jul, 01:56"],
  ["Submit a requirement", "/force/requirement", "force", "Published", "Lola O.", "15 Jul, 01:57"],
  ["LigerLearn home", "/learn", "learn", "Published", "Lola O.", "15 Jul, 01:59"],
  ["One Force overview", "/learn/one-force", "learn", "Published", "Lola O.", "15 Jul, 02:01"],
];

export default function AdminContentPage() {
  return (
    <main id="main-content" className="admin-page admin-subpage">
      <AdminPageHeader
        kicker="Multi-site CMS"
        title="Content"
        description="Draft, review, publish, and schedule every page from one controlled workspace."
        action={{ label: "New page", icon: FilePlus2 }}
      />

      <section className="admin-content-summary">
        <div><strong>7</strong><span>Pages</span></div>
        <div><strong>6</strong><span>Published</span></div>
        <div><strong>1</strong><span>Draft</span></div>
        <div><strong>0</strong><span>Needs review</span></div>
        <div className="admin-content-summary__sites">
          <span><i className="site-dot site-dot--remote" /> 2 Remote</span>
          <span><i className="site-dot site-dot--force" /> 2 Force</span>
          <span><i className="site-dot site-dot--learn" /> 2 Learn</span>
        </div>
      </section>

      <section className="admin-data-panel">
        <div className="admin-content-tabs">
          <button type="button" className="is-active">All content</button>
          <button type="button">Pages</button>
          <button type="button">Stories & case studies</button>
          <button type="button">Downloads</button>
          <button type="button">Navigation</button>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table admin-content-table">
            <thead><tr><th>Page</th><th>Site</th><th>Status</th><th>Last editor</th><th>Updated</th><th /></tr></thead>
            <tbody>
              {contentRows.map(([title, path, brand, status, editor, updated]) => (
                <tr key={path}>
                  <td><strong>{title}</strong><span>{path}</span></td>
                  <td><span className="admin-site-name"><i className={`site-dot site-dot--${brand}`} />{brand === "group" ? "Group" : `Liger${brand.charAt(0).toUpperCase() + brand.slice(1)}`}</span></td>
                  <td><span className={`admin-status ${status === "Published" ? "admin-status--qualified" : "admin-status--in_progress"}`}>{status}</span></td>
                  <td><span className="admin-owner"><i>LO</i>{editor}</span></td>
                  <td>{updated}</td>
                  <td>
                    <div className="admin-row-actions">
                      <Link href={path} target="_blank" aria-label={`Preview ${title}`}><ArrowUpRight size={15} /></Link>
                      <button type="button" aria-label={`More actions for ${title}`}><MoreHorizontal size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
