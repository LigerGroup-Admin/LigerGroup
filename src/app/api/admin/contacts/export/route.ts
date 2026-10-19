import { NextResponse } from "next/server";
import { getContacts } from "@/server/submissions/contacts";
import { requireAdminEmail } from "@/server/admin-auth";

function csvField(value: string) {
  if (/[",\r\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

const columns = ["name", "email", "company", "site", "createdAt"] as const;

export async function GET() {
  const email = await requireAdminEmail();
  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const contacts = await getContacts();

  const header = columns.join(",");
  const body = contacts
    .map((row) =>
      columns
        .map((col) => csvField(String(row[col as keyof typeof row] ?? "")))
        .join(","),
    )
    .join("\r\n");
  const csv = `${header}\r\n${body}\r\n`;

  const filename = `contacts-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
