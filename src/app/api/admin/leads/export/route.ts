import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { listSubmissions } from "@/server/submissions/repository";
import { matchesSubmissionFilters, parseSubmissionFilters } from "@/server/submissions/filters";
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

export async function GET(request: NextRequest) {
  const email = await requireAdminEmail();
  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const params = request.nextUrl.searchParams;
  const filters = parseSubmissionFilters({
    site: params.get("site") ?? undefined,
    status: params.get("status") ?? undefined,
    range: params.get("range") ?? undefined,
    q: params.get("q") ?? undefined,
  });

  const allRows = await listSubmissions(1000);
  const rows = allRows.filter((row) => matchesSubmissionFilters(row, filters));

  const header = columns.join(",");
  const body = rows
    .map((row) =>
      columns
        .map((col) => csvField(String(row[col as keyof typeof row] ?? "")))
        .join(","),
    )
    .join("\r\n");
  const csv = `${header}\r\n${body}\r\n`;

  const filenameParts = [
    "leads",
    filters.site !== "all" ? filters.site : null,
    filters.status !== "all" ? filters.status : null,
    filters.range !== "all" ? filters.range : null,
    new Date().toISOString().slice(0, 10),
  ].filter(Boolean);
  const filename = `${filenameParts.join("-")}.csv`;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
