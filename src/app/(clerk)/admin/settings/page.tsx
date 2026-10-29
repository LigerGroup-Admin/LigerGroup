import { currentUser } from "@clerk/nextjs/server";
import { AdminPageHeader } from "@/components/admin-page-header";

export default async function AdminSettingsPage() {
  const user = await currentUser();
  const currentEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase();

  const allowedAdminEmails = (process.env.ADMIN_ALLOWED_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

  return (
    <main id="main-content" className="admin-page admin-subpage">
      <AdminPageHeader
        kicker="Workspace configuration"
        title="Settings"
        description="Who has access to this dashboard."
      />
      <section className="admin-settings-layout">
        <div className="admin-settings-content" style={{ gridColumn: "1 / -1" }}>
          <section id="team">
            <header>
              <h2>Admin access</h2>
              <p>Anyone signed in with one of these emails can reach this dashboard.</p>
            </header>
            {allowedAdminEmails.map((email) => (
              <div className="admin-team-row" key={email}>
                <span>{email.slice(0, 2).toUpperCase()}</span>
                <div>
                  <strong>{email}</strong>
                  <small>{email === currentEmail ? "Signed in now" : "Admin"}</small>
                </div>
              </div>
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}
