alter table public.submissions
  add column email_verified boolean not null default false,
  add column verification_token uuid not null default gen_random_uuid();

create index submissions_verification_token_idx
  on public.submissions (verification_token);
