import { Download, Search } from "lucide-react";
import { AdminPageHeader } from "@/components/admin-page-header";
import { getContacts } from "@/server/submissions/contacts";

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default async function AdminContactsPage() {
  const contacts = await getContacts();

  const withCompany = contacts.filter((c) => c.company).length;
  const thisMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();
  const addedThisMonth = contacts.filter(
    (c) => new Date(c.createdAt).getTime() >= thisMonthStart,
  ).length;

  return (
    <main id="main-content" className="admin-page admin-subpage">
      <AdminPageHeader
        kicker="Group CRM"
        title="Contacts"
        description="Every unique person who has submitted a form across the three sites, deduplicated by email."
        action={{ label: "Export CSV", icon: Download, href: "/api/admin/contacts/export" }}
      />
      <section className="admin-stats-strip">
        <div><span>All contacts</span><strong>{contacts.length}</strong></div>
        <div><span>With company</span><strong>{withCompany}</strong></div>
        <div><span>Individuals</span><strong>{contacts.length - withCompany}</strong></div>
        <div><span>Added this month</span><strong>{addedThisMonth}</strong></div>
      </section>
      <section className="admin-data-panel">
        <div className="admin-toolbar">
          <label><Search size={15} aria-hidden="true" /><input placeholder="Search contacts" /></label>
        </div>
        {contacts.length === 0 ? (
          <p className="admin-empty-state">
            No contacts yet — they will appear here as soon as someone submits a form.
          </p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Contact</th><th>Organisation</th><th>Primary site</th><th>Last activity</th></tr></thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.email}>
                    <td><strong>{contact.name}</strong><span>{contact.email}</span></td>
                    <td>{contact.company ?? "—"}</td>
                    <td>
                      <span className="admin-site-name">
                        <i className={`site-dot site-dot--${contact.site}`} />
                        Liger{contact.site.charAt(0).toUpperCase() + contact.site.slice(1)}
                      </span>
                    </td>
                    <td>{formatTime(contact.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <footer className="admin-data-panel__footer"><span>{contacts.length} contacts</span></footer>
      </section>
    </main>
  );
}
