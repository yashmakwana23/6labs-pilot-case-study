# Oracle pilot case study — Game A

A two-week paid pilot of **Oracle** by [6labs.ai](https://6labs.ai): full-population
analysis on the client's own data warehouse, with every answer confirmed against
recorded gameplay sessions.

**[Read the case study →](https://yashmakwana23.github.io/6labs-pilot-case-study/)**

| | |
|---|---|
| Chat moderation | RMT bots the filter ignores, a word filter that blocks the wrong things, harassment left standing |
| Retention and churn | Where new players stall across their first 100 guide quests, and what fills the last minutes before they stop |
| Technical issues and UX friction | Eight named defects: a live store bug, purchases that succeed while reporting failure, ad errors that misreport, a crash landing on boss failure |

## Anonymisation

Game A is a mobile idle RPG run by a mobile game publisher. The game, the publisher,
their region and their vendors are not named anywhere in this repository.

Every metric, denominator, percentage, error code, currency amount and pilot date is
the real one, unchanged.

Screens are **stylized reconstructions** of moments observed in recorded sessions —
drawn from scratch in CSS, carrying no client art, UI or footage. Each one is labelled
as a reconstruction. Actual footage is withheld to preserve anonymity; in a live pilot,
findings ship with the real clips attached.

Engineering causes inferred from video observation are hedged as such. Individual
player spend figures appear as anonymous evidence only, with no session link or
identifier attached.

## Files

```
index.html              case study home — how the pilot worked, five worked examples
chat-moderation.html    report 01
retention-churn.html    report 02
monetization-ux.html    report 03
recon.css               the screen-reconstruction component library
```

Static HTML and CSS. No build step, no JavaScript, no external requests beyond Google Fonts.
