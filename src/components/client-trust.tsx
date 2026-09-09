import Image from "next/image";

export const GROUP_CLIENTS = [
  { name: "Access Bank", file: "access-bank.jpg", width: 1200, height: 630 },
  { name: "Coronation", file: "coronation.png", width: 200, height: 200 },
  { name: "Dangote Group", file: "dangote.png", width: 398, height: 251 },
  { name: "FirstBank", file: "first-bank.svg", width: 904, height: 243 },
  { name: "Jumia", file: "jumia.webp", width: 1000, height: 700 },
  { name: "Leadway Pensure", file: "leadway-pensure.png", width: 657, height: 465 },
  { name: "May & Baker", file: "may-baker.png", width: 447, height: 447 },
  { name: "MTN", file: "mtn.webp", width: 1045, height: 647 },
  { name: "Stanbic IBTC Insurance", file: "stanbic-ibtc-insurance.webp", width: 1940, height: 744 },
  { name: "Orange Island Lagos", file: "orange-island-lagos.jpg", width: 447, height: 447 },
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
      <div className="client-trust__row">
        {GROUP_CLIENTS.map((client) => (
          <span className="client-trust__logo" key={client.name}>
            <Image
              src={`/images/group/partners/${client.file}`}
              alt={`${client.name} logo`}
              width={client.width}
              height={client.height}
            />
          </span>
        ))}
      </div>
    </section>
  );
}
