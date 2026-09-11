# Oracle pilot case study — Game-01

A two-week paid pilot of **Oracle** by [6labs.ai](https://6labs.ai) on a live mobile
idle RPG: full-population analysis on the client's own data warehouse, with every
answer confirmed against recorded gameplay sessions.

**[Read the case study →](https://yashmakwana23.github.io/6labs-pilot-case-study/)**

| | |
|---|---|
| Chat moderation | RMT bots the filter ignores, a word filter that blocks the wrong things, harassment left standing |
| Retention and churn | Where new players stall across their first 100 guide quests, and what fills the last minutes before they stop |
| Technical issues and UX friction | Eight named defects: a live store bug, purchases that succeed while reporting failure, ad errors that misreport, a crash landing on boss failure |

## Languages

English is the default, at the repo root. Every page also exists in Simplified
Chinese, Japanese and Korean, and each one carries a switcher in the header.

```
/            English      /ja/    日本語
/zh/         中文          /ko/    한국어
```

The reconstruction screens are **localised too** — UI, dialogs, buttons and system
messages — and the in-game strings quoted in the prose are localised to match them.
Player-typed chat quoted as evidence stays as typed, since the exact characters are
the finding. Each translated page says so in its own language.


## Anonymisation

**Game-01** is a live mobile idle RPG from a mobile game publisher. The name is a
stand-in — the real title, its publisher, their region and their vendors are kept
confidential.

Every metric, denominator, percentage, error code and currency amount is the real one,
unchanged.

Screens are **stylized reconstructions** of moments observed in recorded sessions —
drawn from scratch in CSS, carrying no client art, UI or footage. Each one is labelled
as a reconstruction, and the wording on them is lightly reworded. Actual footage is
withheld to preserve anonymity.

Engineering causes inferred from video observation are hedged as such. Individual
player spend figures appear as anonymous evidence only, with no session link or
identifier attached.

## Files

```
index.html              case study home — how the pilot worked, five worked examples
chat-moderation.html    report 01
retention-churn.html    report 02
technical-issues-ux.html    report 03
recon.css               the screen-reconstruction component library
recon.js                click a reconstruction to open it enlarged in a carousel
zh/ ja/ ko/             the same four pages, translated
```

Static HTML, CSS and one small script. No build step, no framework, no external
requests beyond Google Fonts.
