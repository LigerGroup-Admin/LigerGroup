# Design System — The Liger Poster Series

<!-- Direction contract (chosen 2026-07-28, seed key 91ef2213, fused challenger posters-covers-sleeves-wpa-park-poster)

THESIS: One group, four travel posters. Every Liger business is a WPA-style
silkscreen poster series for a real journey (Lagos dawn → the world; the
workshop floor; the summit at dusk), refusing the category default — the
cream-consulting page with tasteful photography and an accent colour.

OWN-WORLD: Flat silkscreen inks on shared cream stock (#f4edda) with visible
ink grain. Four inks per brand, no gradients ever. Remote = cobalt/marigold/
teal (Lagos Dawn). Force = railway green/brick/ochre (Workshop Green).
Learn = oxblood/plum/brass (Summit Dusk). Group = night navy/gold/slate
(Night Series). Blocky poster caps per brand over quiet humanist body faces;
caption bars carry one imperative each; buttons clip a corner when active.

STORY: A visitor lands inside a poster for their own journey, understands the
offer from one imperative caption, scrolls through numbered series plates that
prove the mechanism, and acts in a form styled as part of the same sheet.

FIRST VIEWPORT (each brand home): full-bleed layered SVG landscape — sky swath
unbroken, midground planes, foreground silhouette — headline in poster caps on
the sky, caption bar beneath the scene with the single imperative CTA.

FORM: Silkscreen Poster Family — user-chosen fused challenger (beat my
grounded list at the decision page); staging: stacked poster sheets, planes
crop outside-in on mobile so the summit always survives.
-->

## Material rules

- **Cream stock is the light.** `#f4edda` is the shared paper across all four
  brands — text knockouts, backgrounds between plates, poster margins. Ink
  grain (SVG turbulence at low opacity) sits over ink fields only, never text.
- **Flat inks only.** No gradients, no shadows-as-depth, no glassmorphism.
  Depth comes from stacked planes and plane parallax.
- **Four inks per brand** plus cream. Never borrow another brand's ink.
- **Poster caps carry headlines**; body faces stay quiet and readable.
  Headlines are uppercase, tight-leading, large. One imperative per caption bar.
- **Caption bar**: an ink-filled horizontal bar beneath a scene or plate,
  carrying blocky caps and/or the primary CTA. The page's primary action
  always lives in a caption bar, and it must land inside the first viewport —
  hero heights are `calc(100svh − chrome)` where chrome is the header,
  any announcement strip, and the caption bar itself. It carries one
  imperative and one action; supporting proof goes in a facts strip below.
- **Poster frame** (`.poster-sheet`): every hero draws an inset cream hairline
  rule at `clamp(0.7rem, 1.4vw, 1.2rem)` — the printed sheet's margin.
- **Hero chip** (`.hero-chip`): the series label over a scene sits on its own
  `--ink-deep` plate. A bare label takes the scene's own ink and vanishes
  wherever the artwork crops behind it; plates on flat ground use
  `.series-label` instead.
- **Facts strip**: three stamped plates divided by 3px ink rules, directly
  under the hero caption bar (`.remote-facts`, `.force-facts`).
- **Buttons**: rectangular, flat ink fill (primary) or 2px ink border on cream
  (secondary). Active/hover state clips the bottom-right corner (polygon
  clip-path), no translateY lifts.
- **Numbered series plates**: sections are posters in a series — numbered
  "No. 01 / 02 …" labels in caps, thick rules, generous margins.
- **Photography** enters the world through duotone treatment (grayscale +
  brand-ink multiply/screen overlay), never full colour.
- **Motion**: gentle plane parallax on scroll/pointer for hero scenes; content
  reveals rise once. Everything gated by prefers-reduced-motion.
- **Mobile**: scenes crop from the outside in (the focal summit/sun survives);
  plates stack; caption bars go full-width.

## Brand worlds

| Brand | Scene | Ink 1 (swath) | Ink 2 | Ink 3 | Ink deep (text on cream) | Display face | Body face |
|---|---|---|---|---|---|---|---|
| Group `/` | Lagos skyline at night, gold moon | Night navy `#1c2b52` | Gold `#d3a04a` | Slate `#5a7191` | Deep ink `#0d152b` | Anton | Archivo |
| Remote `/remote` | Dawn over the lagoon, bridge silhouette | Cobalt `#1f4d92` | Marigold `#e39b2d` | Deep teal `#175e57` | Ink navy `#122840` | Staatliches | Work Sans |
| Force `/force` | Workshop rooftops, cranes, chimneys | Railway green `#2f5241` | Brick `#b5482f` | Ochre `#c98e3f` | Graphite `#1f2b26` | Alfa Slab One | Public Sans |
| Learn `/learn` | Summit range at dusk | Plum `#432b4e` | Oxblood `#6e2639` | Brass `#b98a3c` | Aubergine ink `#2a1730` | Marcellus | Spectral |

Tokens are set on the brand root (`.group-page`, `.remote-root`, `.force-root`,
`.learn-root`) as `--ink-1/2/3`, `--ink-deep`, `--display`, `--body`; the shared
`--stock` and `--grain` live on `:root`. The table above is the settled record.

Where a brand's warm ink is light (Group gold, Remote marigold, Force ochre,
Learn brass), `.ink-field` on that ink flips to `--ink-deep` text — each brand
CSS carries that one-line override. Scenes are authored in a 1440×810 viewBox
with `xMidYMax slice`, so wide-short heroes crop from the top and narrow heroes
crop from the sides; keep focal elements (sun, moon, summit) inside roughly
x 480–960, y 400–560 so they survive both crops.

## Type rules

- Display faces load per brand segment via `next/font` in the segment layout —
  never globally. Uppercase, `letter-spacing: 0.01em–0.04em`, `line-height ≤ 1`.
- Caption caps (nav, labels, caption bars): body face at 700–800, uppercase,
  tracked `0.08em+`, small sizes.
- Body text: brand body face, 1.6–1.75 line-height, max measure ~42rem.

## Non-negotiables preserved from the platform

- Form field names, hidden inputs, actions, and FormStatus behavior unchanged.
- Skip link, focus-visible outlines (2px ink offset 3px), reduced-motion guard.
- Admin (`/admin`) keeps its incumbent design — no poster vocabulary there.
- Host-based routing untouched; each brand stays inside its own world.
