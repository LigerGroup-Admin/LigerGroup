# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **LigerRemote:** ambitious African professionals (Lagos-centred) seeking a credible pathway into global remote work. Mobile-first audience; applying via the talent application form is the core job. Secondary: sponsors funding placements.
- **LigerForce:** UK and US growth-business owners/ops leads who need reliable remote professionals without hiring uncertainty. Job: book a discovery call or submit a requirement brief.
- **LigerLearn:** leaders and organisations buying corporate capability, leadership advisory, and executive search. Job: request a diagnostic call, download the One Force programme pack.
- **Liger Group gateway:** any visitor orienting themselves across the three businesses; job is choosing the right entity.
- **Admin (out of current redesign scope):** internal group staff operating leads, content, and analytics.

## Product Purpose

One Next.js deployment serving four public brands (Group, Remote, Force, Learn) through their own domains plus a consolidated admin workspace. Success per brand: Remote → applications submitted; Force → discovery calls booked and requirements submitted; Learn → diagnostic calls and One Force downloads; Group → correct entity selected.

## Positioning

A Lagos-based group covering the full talent chain — building talent (Learn/Remote training), deploying capability (Force), and transforming organisational performance (Learn). "Potential, made operational." The brands share infrastructure and operational data but deliberately not navigation or identity: a visitor entering one entity domain stays inside it.

## Operating Context

- Host-based routing maps ligerremote.com → /remote, ligerforce.com → /force, ligerlearn.org → /learn, ligergroup.com → /. Path routes work locally.
- Public forms validate server-side; Supabase in production, local JSON in dev.
- Conversion events per entity are defined in docs/ARCHITECTURE.md and must keep working.

## Capabilities and Constraints

- Next.js 16 (App Router, Turbopack). This Next.js version has breaking changes vs. common knowledge — consult node_modules/next/dist/docs before nonstandard API use.
- Forms (application, sponsor, requirement) and their server actions/API routes must keep exact field names and behavior.
- Admin routes keep their current design (confirmed 2026-07-28).
- Photography on hand is limited launch material (public/images/learn/*, public/images/remote/*); original shoot planned later.

## Brand Commitments

- Names and wordmarks: Liger Group, LigerRemote, LigerForce, LigerLearn (text wordmarks until a logo family is approved).
- Prior palette (Group navy/gold, Remote teal, Force steel blue, Learn burgundy) was provisional; user confirmed 2026-07-28 it is free to be replaced per brand.
- Redesign mandate (2026-07-28): each business gets its own theme, colour, font style, and page designs — "distinct but corporate": unmistakably individual worlds that stay credible to UK/US business buyers and serious applicants.

## Evidence on Hand

- Real copy across all public pages (value propositions, programme steps, FAQs, testimonial quotes with names/photos in public/images).
- No verified benchmarks, client logos, or pricing beyond what pages already state — do not invent commercial claims.

## Product Principles

1. Each brand is a destination, not a section — identity, type, and colour diverge; infrastructure and data converge.
2. Conversion journeys outrank expression: Remote → apply, Force → book, Learn → diagnose/download must stay obvious.
3. Serious money is in the room: UK/US SME buyers and enterprise L&D leads must read the sites as credible.
4. Mobile-first for Remote's audience; responsive everywhere.
5. Never fabricate proof — real quotes, real programmes, clearly-scoped claims only.

## Accessibility & Inclusion

Skip links, focus-visible states, and prefers-reduced-motion handling exist today and must survive the redesign.
