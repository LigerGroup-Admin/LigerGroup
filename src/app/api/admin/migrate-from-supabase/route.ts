import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { requireAdminEmail } from "@/server/admin-auth";
import { ensureSchema, getSql } from "@/server/db";

// One-time move of existing leads from Supabase into Neon. Admin-only and
// safe to re-run: rows already copied are skipped. Remove after the move.
export async function GET() {
  if (!(await requireAdminEmail())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sql = getSql();
  if (!sql) return NextResponse.json({ error: "DATABASE_URL is not set" }, { status: 500 });
  await ensureSchema();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ ok: true, schema: "ready", copied: 0, note: "Supabase not configured" });
  }

  const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await supabase.from("submissions").select("*").order("created_at");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  let copied = 0;
  for (const r of data ?? []) {
    const rows = await sql`insert into submissions (
      id, site, form_type, name, email, phone, company, consent, status, payload,
      source_page, referrer, user_agent, email_verified, verification_token, created_at, updated_at
    ) values (
      ${r.id}, ${r.site}, ${r.form_type}, ${r.name}, ${r.email}, ${r.phone}, ${r.company},
      ${r.consent}, ${r.status}, ${JSON.stringify(r.payload ?? {})}::jsonb, ${r.source_page},
      ${r.referrer}, ${r.user_agent}, ${r.email_verified ?? false},
      ${r.verification_token ?? crypto.randomUUID()}, ${r.created_at}, ${r.updated_at ?? r.created_at}
    ) on conflict (id) do nothing returning id`;
    copied += rows.length;
  }

  const [{ count }] = (await sql`select count(*)::int as count from submissions`) as { count: number }[];
  return NextResponse.json({ ok: true, inSupabase: data?.length ?? 0, copied, inNeon: count });
}
