# Liger Group Platform

A unified, multi-brand web platform for Liger Group, LigerRemote, LigerForce, and LigerLearn. One Next.js deployment serves each public brand through its own domain and provides a consolidated Group admin workspace.

## Included experiences

| Experience | Local route | Purpose |
| --- | --- | --- |
| Liger Group | `/` | Institutional gateway and three-business selector |
| LigerRemote | `/remote` | Talent applications and sponsor acquisition |
| LigerForce | `/force` | UK SME employer acquisition and discovery-call conversion |
| LigerForce brief | `/force/requirement` | Warm-lead requirement submission |
| LigerLearn | `/learn` | Corporate capability and advisory credibility |
| One Force | `/learn/one-force` | Post-merger insurance programme landing page |
| Group Admin | `/admin` | Portfolio analytics, leads, inbox, contacts, content, and site health |

The public brands share typography, infrastructure, forms, and operational data. Their navigation, accent colours, page density, and conversion journeys remain independent.

## Current delivery status

This repository contains a responsive, production-buildable public-site and admin prototype. Public forms are validated on the server and can persist to Supabase. In development, forms use an ignored local JSON file so the complete journey can be tested without credentials.

Before production launch, provision Supabase, apply the schema, connect admin authentication and role policies, add the approved booking link and notification email service, and replace preview analytics with the selected analytics provider. The admin route must not be exposed publicly before authentication is configured.

## Run locally

Requirements: Node.js 20.9 or newer and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). Path-based routes work from the same host.

To test host-based routing locally, use:

- `http://remote.localhost:3000`
- `http://force.localhost:3000`
- `http://learn.localhost:3000`
- `http://admin.localhost:3000`

## Environment

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_PREVIEW_ENABLED=false
```

Never expose `SUPABASE_SERVICE_ROLE_KEY` in client-side code. With no Supabase values, local form records are written to `data/dev-submissions.json`. Production intentionally rejects submissions if durable storage has not been configured.

Production also returns a not-found response for every admin route unless `ADMIN_PREVIEW_ENABLED=true`. Use that override only on an access-controlled stakeholder preview; authenticated admin roles are the launch gate.

## Supabase setup

1. Create a Supabase project.
2. Run [`supabase/schema.sql`](./supabase/schema.sql) in the SQL editor.
3. Add the project URL, publishable key, and server-only service-role key to the deployment environment.
4. Create the first admin accounts and apply site-scoped role policies before enabling `/admin` publicly.

The initial schema grants no direct table access to anonymous or authenticated clients. Public form writes pass through the validated server route at `/api/submissions`.

## Domain routing

[`src/proxy.ts`](./src/proxy.ts) rewrites each host into its internal brand namespace:

| Domain | Route namespace |
| --- | --- |
| `ligergroup.com` | `/` |
| `ligerremote.com` | `/remote` |
| `ligerforce.com` | `/force` |
| `ligerlearn.org` or `ligerlearn.com` | `/learn` |
| `admin.ligergroup.com` | `/admin` |

All domains should point to the same deployment. Keep the path routes enabled on preview deployments for stakeholder review.

## Quality checks

```bash
npm run lint
npm run build
npm audit --omit=dev
```

## Important project files

- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — product, data, permissions, events, and delivery architecture
- [`src/lib/brands.ts`](./src/lib/brands.ts) — shared brand definitions
- [`src/server/submissions/schema.ts`](./src/server/submissions/schema.ts) — server-side form validation
- [`src/server/submissions/repository.ts`](./src/server/submissions/repository.ts) — Supabase and local-development persistence
- [`src/app/api/submissions/route.ts`](./src/app/api/submissions/route.ts) — public submission endpoint
- [`supabase/schema.sql`](./supabase/schema.sql) — initial secure database schema

## Provisional launch items

The brief’s navy, gold, teal, steel, and burgundy palette is implemented as replaceable design tokens. Text wordmarks remain until the final identity system is approved. Current client photography is reused as temporary launch material and should be replaced by an original image library when available.
