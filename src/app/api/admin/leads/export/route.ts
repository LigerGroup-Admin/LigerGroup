import { NextResponse } from "next/server";
import { listSubmissions } from "@/server/submissions/repository";
import { requireAdminEmail } from "@/server/admin-auth";

function csvField(value: string) {
  if (/[",\r\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

const columns = [
  "id",
  "site",
  "type",
  "name",
  "email",
  "phone",
  "company",
  "emailVerified",
  "status",
  "sourcePage",
  "referrer",
  "createdAt",
] as const;

export async function GET() {
  const email = await requireAdminEmail();
  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await listSubmissions(1000);

  const header = columns.join(",");
  const body = rows
    .map((row) =>
      columns
        .map((col) => csvField(String(row[col as keyof typeof row] ?? "")))
        .join(","),
    )
    .join("\r\n");
  const csv = `${header}\r\n${body}\r\n`;

  const filename = `leads-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
