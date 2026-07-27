import { promises as fs } from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import type { SubmissionRecord } from "@/server/submissions/schema";

const localDataPath = path.join(process.cwd(), "data", "dev-submissions.json");

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) return null;

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

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

export async function saveSubmission(record: SubmissionRecord) {
  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { error } = await supabase.from("submissions").insert({
      id: record.id,
      site: record.site,
      form_type: record.type,
      name: record.name,
      email: record.email,
      phone: record.phone ?? null,
      company: record.company ?? null,
      consent: record.consent,
      status: record.status,
      payload: record.payload,
      source_page: record.sourcePage,
      referrer: record.referrer,
      user_agent: record.userAgent,
      created_at: record.createdAt,
    });

    if (error) throw error;
    return;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "Submission storage is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  await writeLocalRecord(record);
}

export async function listSubmissions(limit = 100): Promise<SubmissionRecord[]> {
  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;

    return (data ?? []).map((row) => ({
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
      createdAt: row.created_at as string,
    }));
  }

  if (process.env.NODE_ENV === "production") return [];
  return (await readLocalRecords()).slice(0, limit);
}
