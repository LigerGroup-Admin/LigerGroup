import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Eye,
  MessageSquareText,
  MousePointerClick,
  UsersRound,
} from "lucide-react";

const metrics = [
  {
    label: "Unique visitors",
    value: "12,480",
    change: "+18.2%",
    trend: "up",
    icon: Eye,
    note: "across all sites",
  },
  {
    label: "New leads",
    value: "184",
    change: "+12.7%",
    trend: "up",
    icon: UsersRound,
    note: "37 need review",
  },
  {
    label: "Primary conversions",
    value: "71",
    change: "+8.4%",
    trend: "up",
    icon: MousePointerClick,
    note: "applications, calls, downloads",
  },
  {
    label: "Unread messages",
    value: "17",
    change: "-3.1%",
    trend: "down",
    icon: MessageSquareText,
    note: "oldest is 6h",
  },
];

const recentLeads = [
  {
    initials: "TA",
    name: "Tomi Adeyemi",
    detail: "Cohort interest · LigerRemote",
    time: "8 min ago",
    source: "Instagram",
    brand: "remote",
  },
  {
    initials: "JB",
    name: "James Barrett",
    detail: "Discovery call · LigerForce",
    time: "26 min ago",
    source: "LinkedIn",
    brand: "force",
  },
  {
    initials: "NO",
    name: "Nneka Okafor",
    detail: "One Force overview · LigerLearn",
    time: "1 hr ago",
    source: "Direct",
    brand: "learn",
  },
  {
    initials: "AO",
    name: "Aisha Oladipo",
    detail: "Sponsor pack · LigerRemote",
    time: "2 hrs ago",
    source: "Email",
    brand: "remote",
  },
];

function TrafficChart() {
  return (
    <div className="admin-chart" role="img" aria-label="Traffic trend over 30 days">
      <svg viewBox="0 0 800 240" preserveAspectRatio="none">
        <title>Visitors rose from approximately 220 to 510 per day</title>
        <defs>
          <linearGradient id="traffic-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#b89243" stopOpacity="0.22" />
            <stop offset="1" stopColor="#b89243" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="admin-chart__grid">
          <line x1="0" y1="40" x2="800" y2="40" />
          <line x1="0" y1="100" x2="800" y2="100" />
          <line x1="0" y1="160" x2="800" y2="160" />
          <line x1="0" y1="220" x2="800" y2="220" />
        </g>
        <path
          className="admin-chart__area"
          d="M0 187 C45 194 70 166 110 171 C153 176 180 146 220 151 C260 158 286 122 330 131 C371 140 405 104 444 112 C485 122 506 81 550 91 C593 102 620 67 663 76 C707 87 743 49 800 55 L800 240 L0 240 Z"
        />
        <path
          className="admin-chart__line"
          d="M0 187 C45 194 70 166 110 171 C153 176 180 146 220 151 C260 158 286 122 330 131 C371 140 405 104 444 112 C485 122 506 81 550 91 C593 102 620 67 663 76 C707 87 743 49 800 55"
        />
        <circle cx="800" cy="55" r="5" />
      </svg>
      <div className="admin-chart__labels">
        <span>16 Jun</span>
        <span>23 Jun</span>
        <span>30 Jun</span>
        <span>7 Jul</span>
        <span>15 Jul</span>
      </div>
    </div>
  );
}

export default function AdminOverviewPage() {
  return (
    <main id="main-content" className="admin-page">
      <div className="admin-page__heading">
        <div>
          <p className="admin-kicker">Wednesday, 15 July</p>
          <h1>Good morning, Lola.</h1>
          <p>Here is what is happening across the Liger portfolio.</p>
        </div>
        <button className="admin-date-button" type="button">
          <CalendarDays size={16} aria-hidden="true" />
          Last 30 days
        </button>
      </div>

      <section className="admin-metrics" aria-label="Portfolio metrics">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === "up" ? ArrowUpRight : ArrowDownRight;
          return (
            <article key={metric.label}>
              <div className="admin-metric__top">
                <span>{metric.label}</span>
                <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
              </div>
              <strong>{metric.value}</strong>
              <div className={`admin-metric__change admin-metric__change--${metric.trend}`}>
                <span>
                  <TrendIcon size={13} aria-hidden="true" /> {metric.change}
                </span>
                <small>{metric.note}</small>
              </div>
            </article>
          );
        })}
      </section>

      <section className="admin-dashboard-grid">
        <article className="admin-panel admin-panel--traffic">
          <header className="admin-panel__header">
            <div>
              <p>Portfolio traffic</p>
              <h2>Visitors over time</h2>
            </div>
            <div className="admin-legend">
              <span><i /> Total visitors</span>
            </div>
          </header>
          <div className="admin-traffic-value">
            <strong>12,480</strong>
            <span><ArrowUpRight size={14} aria-hidden="true" /> 18.2%</span>
          </div>
          <TrafficChart />
        </article>

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
            {[
              ["LigerRemote", "6,842", "92", "remote", "+22%"],
              ["LigerForce", "3,691", "54", "force", "+17%"],
              ["LigerLearn", "1,947", "38", "learn", "+9%"],
            ].map(([name, visits, leads, brand, change]) => (
              <div key={name}>
                <i className={`site-dot site-dot--${brand}`} />
                <div>
                  <strong>{name}</strong>
                  <span>{visits} visits · {leads} leads</span>
                </div>
                <b>{change}</b>
              </div>
            ))}
          </div>
          <div className="admin-site-status">
            <CheckCircle2 size={16} aria-hidden="true" />
            <span>All three sites are live and responding normally</span>
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
          <div className="admin-lead-list">
            {recentLeads.map((lead) => (
              <div key={`${lead.name}-${lead.detail}`}>
                <span className={`admin-avatar admin-avatar--${lead.brand}`}>
                  {lead.initials}
                </span>
                <div>
                  <strong>{lead.name}</strong>
                  <span>{lead.detail}</span>
                </div>
                <div>
                  <b>{lead.source}</b>
                  <time>{lead.time}</time>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="admin-panel admin-panel--goals">
          <header className="admin-panel__header">
            <div>
              <p>Monthly goals</p>
              <h2>Conversion progress</h2>
            </div>
            <span className="admin-panel__muted">July</span>
          </header>
          <div className="admin-goals">
            {[
              ["Remote applications", "34 / 60", "57%", "remote"],
              ["Force discovery calls", "6 / 10", "60%", "force"],
              ["One Force downloads", "11 / 15", "73%", "learn"],
            ].map(([label, value, width, brand]) => (
              <div key={label}>
                <div>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
                <div className="admin-progress">
                  <i className={`admin-progress--${brand}`} style={{ width }} />
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
