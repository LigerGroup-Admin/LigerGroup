import { Download, Plus, Search } from "lucide-react";
import { AdminPageHeader } from "@/components/admin-page-header";

const contacts = [
  ["Tomi Adeyemi", "tomi@example.com", "Individual", "LigerRemote", "remote", "Cohort candidate", "Today"],
  ["James Barrett", "james@northandfinch.co.uk", "North & Finch", "LigerForce", "force", "Employer lead", "Today"],
  ["Nneka Okafor", "nneka@meridian.example", "Meridian Assurance", "LigerLearn", "learn", "CHRO", "Today"],
  ["Aisha Oladipo", "aisha@futureworks.example", "FutureWorks Foundation", "LigerRemote", "remote", "Sponsor lead", "Yesterday"],
  ["Michael Kent", "michael@kentops.example", "Kent Operations", "LigerForce", "force", "Employer lead", "14 Jul"],
  ["Efe Udo", "efe@apex.example", "Apex Financial", "LigerLearn", "learn", "L&D leader", "12 Jul"],
];

export default function AdminContactsPage() {
  return (
    <main id="main-content" className="admin-page admin-subpage">
      <AdminPageHeader
        kicker="Group CRM"
        title="Contacts"
        description="A deduplicated view of people and organisations across every Liger relationship."
        action={{ label: "Add contact", icon: Plus }}
      />
      <section className="admin-stats-strip">
        <div><span>All contacts</span><strong>1,284</strong></div>
        <div><span>Individuals</span><strong>964</strong></div>
        <div><span>Organisations</span><strong>196</strong></div>
        <div><span>Added this month</span><strong>124</strong></div>
      </section>
      <section className="admin-data-panel">
        <div className="admin-toolbar">
          <label><Search size={15} aria-hidden="true" /><input placeholder="Search contacts" /></label>
          <div>
            <select aria-label="Filter relationship"><option>All relationships</option><option>Talent</option><option>Employers</option><option>Corporate clients</option><option>Sponsors</option></select>
            <button type="button" aria-label="Export contacts"><Download size={15} aria-hidden="true" /></button>
          </div>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Contact</th><th>Organisation</th><th>Primary site</th><th>Relationship</th><th>Owner</th><th>Last activity</th></tr></thead>
            <tbody>
              {contacts.map(([name, email, company, site, brand, relationship, activity]) => (
                <tr key={email}>
                  <td><strong>{name}</strong><span>{email}</span></td>
                  <td>{company}</td>
                  <td><span className="admin-site-name"><i className={`site-dot site-dot--${brand}`} />{site}</span></td>
                  <td>{relationship}</td>
                  <td><span className="admin-owner"><i>LO</i> Lola O.</span></td>
                  <td>{activity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <footer className="admin-data-panel__footer"><span>1,284 contacts</span><div><button>Previous</button><button>Next</button></div></footer>
      </section>
    </main>
  );
}
