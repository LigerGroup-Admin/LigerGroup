create extension if not exists "pgcrypto";

create type public.liger_site as enum ('group', 'remote', 'force', 'learn');
create type public.lead_status as enum ('new', 'in_progress', 'qualified', 'closed');

create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  site public.liger_site not null,
  form_type text not null,
  name text not null,
  email text not null,
  phone text,
  company text,
  consent boolean not null default false,
  status public.lead_status not null default 'new',
  payload jsonb not null default '{}'::jsonb,
  source_page text,
  referrer text,
  user_agent text,
  assigned_to uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index submissions_site_created_at_idx
  on public.submissions (site, created_at desc);
create index submissions_status_created_at_idx
  on public.submissions (status, created_at desc);
create index submissions_email_idx
  on public.submissions (lower(email));

alter table public.submissions enable row level security;

-- Public forms write through the server-only service role. No anonymous table
-- privileges are granted. Authenticated admin policies are added with the role
-- and site-permission migration once the first admin accounts are provisioned.
revoke all on public.submissions from anon, authenticated;
