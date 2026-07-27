import { CalendarDays, Download, TrendingUp } from "lucide-react";
import { AdminPageHeader } from "@/components/admin-page-header";

const brandRows = [
  { name: "LigerRemote", brand: "remote", visitors: "6,842", conversions: "92", rate: "4.1%", growth: "+22%" },
  { name: "LigerForce", brand: "force", visitors: "3,691", conversions: "54", rate: "3.7%", growth: "+17%" },
  { name: "LigerLearn", brand: "learn", visitors: "1,947", conversions: "38", rate: "2.9%", growth: "+9%" },
];

export default function AdminAnalyticsPage() {
  return (
    <main id="main-content" className="admin-page admin-subpage">
      <AdminPageHeader
        kicker="Portfolio intelligence"
        title="Analytics"
        description="Compare reach, acquisition quality, and conversion behaviour across the full group."
        action={{ label: "Export report", icon: Download }}
      />

      <div className="admin-analytics-controls">
        <div>
          <button type="button" className="is-active">All sites</button>
          <button type="button">LigerRemote</button>
          <button type="button">LigerForce</button>
          <button type="button">LigerLearn</button>
        </div>
        <button type="button"><CalendarDays size={15} aria-hidden="true" /> Last 30 days</button>
      </div>

      <section className="admin-analytics-grid">
        <article className="admin-panel admin-analytics-main">
          <header className="admin-panel__header">
            <div><p>Acquisition</p><h2>Visitors by site</h2></div>
            <span className="admin-analytics-growth"><TrendingUp size={14} aria-hidden="true" /> 18.2%</span>
          </header>
          <div className="admin-stacked-bar" aria-label="Visitor share by site">
            <i className="admin-progress--remote" style={{ width: "55%" }} />
            <i className="admin-progress--force" style={{ width: "29.5%" }} />
            <i className="admin-progress--learn" style={{ width: "15.5%" }} />
          </div>
          <div className="admin-analytics-breakdown">
            {brandRows.map((row) => (
              <div key={row.name}>
                <span><i className={`site-dot site-dot--${row.brand}`} /> {row.name}</span>
                <strong>{row.visitors}</strong>
                <small>{row.growth}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="admin-panel admin-analytics-sources">
          <header className="admin-panel__header">
            <div><p>Attribution</p><h2>Top acquisition sources</h2></div>
          </header>
          <div className="admin-source-bars">
            {[
              ["Organic search", "3,970", "82%"],
              ["LinkedIn", "3,118", "66%"],
              ["Instagram", "2,406", "51%"],
              ["Direct", "1,624", "35%"],
              ["Email", "1,362", "29%"],
            ].map(([label, value, width]) => (
              <div key={label}>
                <div><span>{label}</span><strong>{value}</strong></div>
                <div><i style={{ width }} /></div>
              </div>
            ))}
          </div>
        </article>

        <article className="admin-panel admin-analytics-table">
          <header className="admin-panel__header">
            <div><p>Performance</p><h2>Site conversion comparison</h2></div>
          </header>
          <table className="admin-table">
            <thead><tr><th>Site</th><th>Visitors</th><th>Conversions</th><th>Conversion rate</th><th>Growth</th></tr></thead>
            <tbody>
              {brandRows.map((row) => (
                <tr key={row.name}>
                  <td><span className="admin-site-name"><i className={`site-dot site-dot--${row.brand}`} />{row.name}</span></td>
                  <td><strong>{row.visitors}</strong></td>
                  <td>{row.conversions}</td>
                  <td>{row.rate}</td>
                  <td><span className="admin-positive">{row.growth}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </section>
    </main>
  );
}
