import { promises as fs } from "node:fs";
import path from "node:path";
import { getSql } from "@/server/db";
import type { SubmissionRecord } from "@/server/submissions/schema";

const localDataPath = path.join(process.cwd(), "data", "dev-submissions.json");

async function readLocalRecords(): Promise<SubmissionRecord[]> {
  try {
    const file = await fs.readFile(localDataPath, "utf8");
    return JSON.parse(file) as SubmissionRecord[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

async function writeLocalRecord(record: SubmissionRecord) {
  await fs.mkdir(path.dirname(localDataPath), { recursive: true });
  const current = await readLocalRecords();
  const next = [record, ...current].slice(0, 1000);
  const temporaryPath = `${localDataPath}.${crypto.randomUUID()}.tmp`;
  await fs.writeFile(temporaryPath, JSON.stringify(next, null, 2), "utf8");
  await fs.rename(temporaryPath, localDataPath);
}

type Row = Record<string, unknown>;

function toRecord(row: Row): SubmissionRecord {
  return {
    id: row.id as string,
    site: row.site as SubmissionRecord["site"],
    type: row.form_type as string,
    name: row.name as string,
    email: row.email as string,
    phone: (row.phone as string | null) ?? undefined,
    company: (row.company as string | null) ?? undefined,
    consent: Boolean(row.consent) as true,
    website: undefined,
    status: row.status as SubmissionRecord["status"],
    payload: (row.payload ?? {}) as Record<string, string>,
    sourcePage: (row.source_page as string | null) ?? null,
    referrer: (row.referrer as string | null) ?? null,
    userAgent: (row.user_agent as string | null) ?? null,
    emailVerified: Boolean(row.email_verified),
    verificationToken: row.verification_token as string,
    createdAt: new Date(row.created_at as string | Date).toISOString(),
  };
}

export async function saveSubmission(record: SubmissionRecord) {
  const sql = getSql();

  if (sql) {
    await sql`insert into submissions (
      id, site, form_type, name, email, phone, company, consent, status, payload,
      source_page, referrer, user_agent, email_verified, verification_token, created_at
    ) values (
      ${record.id}, ${record.site}, ${record.type}, ${record.name}, ${record.email},
      ${record.phone ?? null}, ${record.company ?? null}, ${record.consent}, ${record.status},
      ${JSON.stringify(record.payload ?? {})}::jsonb, ${record.sourcePage}, ${record.referrer},
      ${record.userAgent}, ${record.emailVerified}, ${record.verificationToken}, ${record.createdAt}
    )`;
    return;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("Submission storage is not configured. Set DATABASE_URL.");
  }

  await writeLocalRecord(record);
}

export async function listSubmissions(limit = 100): Promise<SubmissionRecord[]> {
  const sql = getSql();

  if (sql) {
    const rows = (await sql`select * from submissions order by created_at desc limit ${limit}`) as Row[];
    return rows.map(toRecord);
  }

  if (process.env.NODE_ENV === "production") return [];
  return (await readLocalRecords()).slice(0, limit);
}

export async function deleteSubmissions(ids: string[]) {
  const sql = getSql();
  if (!sql) return;
  await sql`delete from submissions where id = any(${ids}::uuid[])`;
}

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Called from /api/verify-email when someone clicks the confirmation link
// in their submission email. Returns the now-verified record, or null if
// the token doesn't match anything (expired link, tampered URL, etc.).
export async function verifyEmailByToken(token: string): Promise<SubmissionRecord | null> {
  const sql = getSql();
  if (!sql || !uuidPattern.test(token)) return null;

  const rows = (await sql`update submissions set email_verified = true, updated_at = now()
    where verification_token = ${token}::uuid returning *`) as Row[];
  return rows[0] ? toRecord(rows[0]) : null;
}
