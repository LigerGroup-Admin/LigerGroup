import Link from "next/link";
import {
  BarChart3,
  Bell,
  ContactRound,
  FilePenLine,
  Globe2,
  Inbox,
  LayoutDashboard,
  Menu,
  Search,
  Settings,
  UsersRound,
  X,
} from "lucide-react";
import { BrandMark } from "@/components/brand-mark";

const navigation = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Leads & forms", href: "/admin/leads", icon: UsersRound },
  { label: "Inbox", href: "/admin/inbox", icon: Inbox, badge: "17" },
  { label: "Contacts", href: "/admin/contacts", icon: ContactRound },
  { label: "Content", href: "/admin/content", icon: FilePenLine },
  { label: "Websites", href: "/admin/websites", icon: Globe2 },
];

function AdminNavigation() {
  return (
    <nav className="admin-nav" aria-label="Admin navigation">
      <p>Workspace</p>
      {navigation.map((item) => {
        const Icon = item.icon;
        return (
          <Link key={item.href} href={item.href}>
            <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
            <span>{item.label}</span>
            {item.badge ? <b>{item.badge}</b> : null}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <BrandMark brand="group" light />
          <span>Admin</span>
        </div>
        <AdminNavigation />
        <div className="admin-sidebar__sites">
          <p>Sites</p>
          <a href="/remote" target="_blank">
            <i className="site-dot site-dot--remote" /> LigerRemote
          </a>
          <a href="/force" target="_blank">
            <i className="site-dot site-dot--force" /> LigerForce
          </a>
          <a href="/learn" target="_blank">
            <i className="site-dot site-dot--learn" /> LigerLearn
          </a>
        </div>
        <div className="admin-sidebar__user">
          <span>LO</span>
          <div>
            <strong>Lola O.</strong>
            <small>Group owner</small>
          </div>
          <Link href="/admin/settings" aria-label="Open settings">
            <Settings size={16} aria-hidden="true" />
          </Link>
        </div>
      </aside>

      <details className="admin-mobile-nav">
        <summary>
          <BrandMark brand="group" />
          <Menu className="menu-open" size={22} aria-label="Open admin navigation" />
          <X className="menu-close" size={22} aria-label="Close admin navigation" />
        </summary>
        <AdminNavigation />
      </details>

      <div className="admin-workspace">
        <header className="admin-topbar">
          <label className="admin-search">
            <Search size={16} aria-hidden="true" />
            <input aria-label="Search admin" placeholder="Search leads, contacts, content…" />
            <kbd>⌘ K</kbd>
          </label>
          <div className="admin-topbar__actions">
            <span className="admin-preview-label">Preview data</span>
            <button type="button" aria-label="Notifications">
              <Bell size={18} aria-hidden="true" />
              <i />
            </button>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
