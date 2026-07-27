import { Save } from "lucide-react";
import { AdminPageHeader } from "@/components/admin-page-header";

export default function AdminSettingsPage() {
  return (
    <main id="main-content" className="admin-page admin-subpage">
      <AdminPageHeader
        kicker="Workspace configuration"
        title="Settings"
        description="Control group identity, notifications, team access, consent, and shared platform defaults."
        action={{ label: "Save changes", icon: Save }}
      />
      <section className="admin-settings-layout">
        <nav aria-label="Settings sections">
          <a href="#workspace" className="is-active">Workspace</a>
          <a href="#team">Team & permissions</a>
          <a href="#notifications">Notifications</a>
          <a href="#privacy">Privacy & consent</a>
          <a href="#integrations">Integrations</a>
          <a href="#audit">Audit log</a>
        </nav>
        <div className="admin-settings-content">
          <section id="workspace">
            <header><h2>Workspace</h2><p>Core details used across the admin and group-level communication.</p></header>
            <div className="admin-settings-form">
              <label>Workspace name<input defaultValue="Liger Group" /></label>
              <label>Primary admin email<input type="email" defaultValue="admin@ligergroup.com" /></label>
              <label>Default timezone<select defaultValue="Africa/Lagos"><option>Africa/Lagos</option><option>Europe/London</option></select></label>
              <label>Reporting currency<select defaultValue="GBP"><option>GBP — British Pound</option><option>NGN — Nigerian Naira</option><option>USD — US Dollar</option></select></label>
            </div>
          </section>
          <section id="team">
            <header><h2>Team & permissions</h2><p>Access remains scoped by role and, where needed, by individual site.</p></header>
            <div className="admin-team-row"><span>LO</span><div><strong>Lola O.</strong><small>lola@ligergroup.com</small></div><b>Group owner</b><button type="button">Manage</button></div>
            <div className="admin-team-row"><span>FO</span><div><strong>Femi O.</strong><small>femi@ligerlearn.org</small></div><b>LigerLearn manager</b><button type="button">Manage</button></div>
            <button className="admin-secondary-action" type="button">Invite team member</button>
          </section>
          <section id="notifications">
            <header><h2>Lead notifications</h2><p>Choose which events trigger email or dashboard alerts.</p></header>
            {[
              ["New LigerRemote application", "Notify the Remote lead manager immediately"],
              ["New LigerForce discovery call", "Notify the Force lead manager immediately"],
              ["New One Force download", "Notify Femi for personal follow-up"],
              ["Unanswered message reminder", "Alert the owner after 12 hours"],
            ].map(([title, detail]) => (
              <label className="admin-toggle-row" key={title}><div><strong>{title}</strong><span>{detail}</span></div><input type="checkbox" defaultChecked /></label>
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}
