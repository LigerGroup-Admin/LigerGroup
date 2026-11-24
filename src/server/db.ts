import { neon } from "@neondatabase/serverless";

// Neon connection string, added automatically by the Vercel–Neon integration.
// POSTGRES_URL is deliberately not used as a fallback here — that var
// belongs to the Supabase integration and points at Supabase's own
// Postgres, not Neon.
export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return neon(url);
}

// Creates the submissions table on a fresh database. Safe to run repeatedly.
export async function ensureSchema() {
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL is not set");

  await sql`create extension if not exists pgcrypto`;
  await sql`do $$ begin
    create type liger_site as enum ('group', 'remote', 'force', 'learn');
  exception when duplicate_object then null; end $$`;
  await sql`do $$ begin
    create type lead_status as enum ('new', 'in_progress', 'qualified', 'closed');
  exception when duplicate_object then null; end $$`;
  await sql`create table if not exists submissions (
    id uuid primary key default gen_random_uuid(),
    site liger_site not null,
    form_type text not null,
    name text not null,
    email text not null,
    phone text,
    company text,
    consent boolean not null default false,
    status lead_status not null default 'new',
    payload jsonb not null default '{}'::jsonb,
    source_page text,
    referrer text,
    user_agent text,
    email_verified boolean not null default false,
    verification_token uuid not null default gen_random_uuid(),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
  )`;
  await sql`create index if not exists submissions_site_created_at_idx on submissions (site, created_at desc)`;
  await sql`create index if not exists submissions_status_created_at_idx on submissions (status, created_at desc)`;
  await sql`create index if not exists submissions_email_idx on submissions (lower(email))`;
  await sql`create index if not exists submissions_verification_token_idx on submissions (verification_token)`;
}
