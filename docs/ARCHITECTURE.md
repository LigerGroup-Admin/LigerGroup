# Liger Group Platform Architecture

## Product shape

The platform is one multi-brand application with four public entry points and one private operating layer:

- Liger Group: a restrained institutional gateway that routes visitors to the correct business.
- LigerRemote: mobile-first talent acquisition and sponsorship journeys.
- LigerForce: minimal employer acquisition with discovery-call conversion as the primary goal.
- LigerLearn: institutional credibility, programme proof, and the One Force lead magnet.
- Group Admin: consolidated content, enquiries, contacts, analytics, assets, and access control.

The public brands share infrastructure but not navigation. A visitor who enters an entity domain stays inside that entity unless they deliberately return to the Group gateway.

## Domain routing

One Next.js deployment serves all domains. `src/proxy.ts` maps the request host to an internal route namespace:

| Public host | Internal route |
| --- | --- |
| `ligergroup.com` | `/` |
| `ligerremote.com` | `/remote` |
| `ligerforce.com` | `/force` |
| `ligerlearn.org` / `ligerlearn.com` | `/learn` |
| `admin.ligergroup.com` | `/admin` |

Path-based routes remain available in local and preview environments, so every experience can be reviewed from a single preview URL.

## Core data model

- `sites`: entity identity, domains, design tokens, status, and integration settings.
- `pages`: site-scoped SEO, publishing state, and page composition.
- `content_blocks`: structured editable sections ordered within a page.
- `media_assets`: site-scoped images, documents, alt text, and usage metadata.
- `forms`: definitions for applications, sponsor leads, enquiries, requirements, and downloads.
- `submissions`: normalised lead record with source site, campaign, consent, status, and owner.
- `contacts`: deduplicated people and organisations created from submissions or admin entry.
- `conversations` / `messages`: inbound enquiries, notes, assignment, and response status.
- `events`: first-party conversion events and external analytics identifiers.
- `admin_users`, `roles`, `site_permissions`: group-wide and entity-scoped access control.
- `audit_log`: who changed content, lead status, settings, or access.

## Conversion events

| Entity | Primary events |
| --- | --- |
| LigerRemote | `application_started`, `application_submitted`, `sponsor_pack_requested` |
| LigerForce | `discovery_call_clicked`, `discovery_call_booked`, `requirement_submitted` |
| LigerLearn | `one_force_downloaded`, `diagnostic_call_requested`, `case_study_viewed` |
| Group | `entity_selected` |

Every event includes `site`, `page`, `source`, `medium`, `campaign`, referrer, device class, and consent state. Personally identifying fields remain in the CRM tables rather than the analytics event payload.

## Admin permissions

- Group Owner: all sites, settings, users, exports, and integrations.
- Group Admin: all operational data and content; no ownership/billing controls.
- Site Manager: full access to assigned entities only.
- Content Editor: draft and publish site content for assigned entities.
- Lead Manager: view, assign, update, and export leads for assigned entities.
- Analyst: read-only dashboards and reports.

## Delivery sequence

1. Shared shell, brand tokens, host routing, and responsive public prototypes.
2. LigerRemote application and sponsor flows; LigerForce booking and requirement flows.
3. LigerLearn credibility site and standalone One Force page.
4. Supabase Postgres/Auth/Storage with row-level site permissions.
5. Admin workflows, notifications, consent-aware analytics, and integrations.
6. Accessibility, performance, SEO, security, migration, and launch verification.

## Provisional decisions

The brief's navy/gold/entity accents are implemented as replaceable CSS tokens. Text wordmarks are used until a formal logo family is approved. Existing client photography is reused only as launch material and should be replaced with an original shoot when available.
