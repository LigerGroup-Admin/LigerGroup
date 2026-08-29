-- The service role must be explicitly granted table privileges; it does not
-- receive them implicitly just because RLS is enabled. Row Level Security
-- policies are bypassed for service_role, but base GRANTs are still required.
grant select, insert, update, delete on public.submissions to service_role;

-- Keep future tables in this schema accessible to service_role by default,
-- so this class of error doesn't recur on the next migration.
alter default privileges in schema public
  grant select, insert, update, delete on tables to service_role;
