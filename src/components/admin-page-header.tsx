import type { LucideIcon } from "lucide-react";

type AdminPageHeaderProps = {
  kicker: string;
  title: string;
  description: string;
  action?: {
    label: string;
    icon: LucideIcon;
    /** Renders as a real download link instead of a decorative button. */
    href?: string;
  };
};

export function AdminPageHeader({
  kicker,
  title,
  description,
  action,
}: AdminPageHeaderProps) {
  const ActionIcon = action?.icon;

  return (
    <div className="admin-page__heading admin-page__heading--subpage">
      <div>
        <p className="admin-kicker">{kicker}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action && ActionIcon ? (
        action.href ? (
          <a href={action.href} className="admin-primary-action" download>
            <ActionIcon size={15} aria-hidden="true" /> {action.label}
          </a>
        ) : (
          <button type="button" className="admin-primary-action">
            <ActionIcon size={15} aria-hidden="true" /> {action.label}
          </button>
        )
      ) : null}
    </div>
  );
}
