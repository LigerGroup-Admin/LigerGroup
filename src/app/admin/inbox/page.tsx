import { Archive, Mail, MoreHorizontal, Reply, Search } from "lucide-react";
import { AdminPageHeader } from "@/components/admin-page-header";

const messages = [
  { initials: "JB", name: "James Barrett", subject: "Re: discovery call request", preview: "Thursday at 10:30 works well for me…", time: "08:42", brand: "force", unread: true },
  { initials: "AO", name: "Aisha Oladipo", subject: "Cohort sponsorship", preview: "Could you share the reporting structure…", time: "07:18", brand: "remote", unread: true },
  { initials: "NO", name: "Nneka Okafor", subject: "One Force overview", preview: "Thank you. I have shared this with our CEO…", time: "Yesterday", brand: "learn", unread: true },
  { initials: "TA", name: "Tomi Adeyemi", subject: "Application question", preview: "I am currently employed full-time and wanted…", time: "Yesterday", brand: "remote", unread: false },
  { initials: "MK", name: "Michael Kent", subject: "Operations role brief", preview: "Attached is the revised list of outcomes…", time: "Mon", brand: "force", unread: false },
];

export default function AdminInboxPage() {
  return (
    <main id="main-content" className="admin-page admin-subpage">
      <AdminPageHeader
        kicker="Shared communications"
        title="Inbox"
        description="Read and manage messages from every brand without switching accounts."
      />

      <section className="admin-inbox">
        <div className="admin-inbox__list">
          <div className="admin-inbox__tools">
            <label><Search size={15} aria-hidden="true" /><input placeholder="Search messages" /></label>
            <button type="button" aria-label="Message options"><MoreHorizontal size={17} aria-hidden="true" /></button>
          </div>
          <div className="admin-inbox__tabs">
            <button className="is-active" type="button">All <span>17</span></button>
            <button type="button">Unread</button>
            <button type="button">Assigned to me</button>
          </div>
          {messages.map((message, index) => (
            <article key={`${message.name}-${message.subject}`} className={`${message.unread ? "is-unread" : ""} ${index === 0 ? "is-selected" : ""}`}>
              <span className={`admin-avatar admin-avatar--${message.brand}`}>{message.initials}</span>
              <div>
                <div><strong>{message.name}</strong><time>{message.time}</time></div>
                <b>{message.subject}</b>
                <p>{message.preview}</p>
              </div>
            </article>
          ))}
        </div>

        <article className="admin-message">
          <header>
            <div>
              <span className="admin-avatar admin-avatar--force">JB</span>
              <div><strong>James Barrett</strong><span>james@northandfinch.co.uk</span></div>
            </div>
            <div>
              <button type="button" aria-label="Archive"><Archive size={16} aria-hidden="true" /></button>
              <button type="button" aria-label="More options"><MoreHorizontal size={17} aria-hidden="true" /></button>
            </div>
          </header>
          <div className="admin-message__meta">
            <div><span>Subject</span><strong>Re: discovery call request</strong></div>
            <div><span>Site</span><strong><i className="site-dot site-dot--force" /> LigerForce</strong></div>
            <div><span>Received</span><strong>15 Jul, 08:42</strong></div>
          </div>
          <div className="admin-message__body">
            <p>Hi Lola,</p>
            <p>Thanks for getting back to me. Thursday at 10:30 works well for me.</p>
            <p>For context, we are looking for someone to take ownership of customer onboarding operations. The work is clear; what I want to avoid is spending the next two months managing the recruitment and settling-in process.</p>
            <p>Happy to explain the workflow on the call.</p>
            <p>Best,<br />James</p>
          </div>
          <footer>
            <button type="button" className="admin-primary-action"><Reply size={15} aria-hidden="true" /> Reply</button>
            <button type="button"><Mail size={15} aria-hidden="true" /> Mark unread</button>
          </footer>
        </article>
      </section>
    </main>
  );
}
