export const GROUP_CLIENTS = [
  "Access Bank",
  "Coronation",
  "Dangote Group",
  "FirstBank",
  "Jumia",
  "Leadway Pensure",
  "May & Baker",
  "MTN",
] as const;

export function ClientTrust({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <section className={className} aria-label="Selected organisations">
      <p>{label}</p>
      <div>
        {GROUP_CLIENTS.map((client) => (
          <span key={client}>{client}</span>
        ))}
      </div>
    </section>
  );
}
