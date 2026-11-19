# LAST ORDER

**Keep the grill hot. Keep your story straight.**

**Play online:** https://last-order-starline.pages.dev

Source: https://github.com/lucifer-eason/last-order · Production branch: `main`. Cloudflare Pages automatically deploys updates from this branch.

A playable English-language prototype of a first-person restaurant and undercover-spy simulator. Bellport, October 1999. You work at Starline Burger under the name Alex Vale. Your customers want lunch; your handler wants a list of names. The people on that list want to survive the week.

## Play

Open `dist/index.html` in a current desktop browser, or open the self-contained `LAST-ORDER.html` included with the delivery. No installation, login, API key, subscription, or server is required. If your browser blocks saving from a local file, use **Settings → Export save**.

The hosted edition is private to its owner by default. The downloadable version works independently of hosting.

1. **Clock in.** Read the morning brief and staff memo. The optional 90-second briefing timer can be switched off.
2. **Take an order.** Select a customer, listen, and ask for clarification when needed.
3. **Make the food.** Cook beef or veggie patties. Choose cheese and onions, assemble the burger, and add the ordered fries and drink. Food burns if left cooking.
4. **Serve the right person.** Orders, patience, cash, inventory, hygiene, reputation, and suspicion share the same simulation.
5. **Complete the other job.** Listen to your contact, verify the matching detail, serve the cover order, collect evidence, and secure it in the office.
6. **Write the report.** Summarize the evidence in your own English, preserving sources, corrections, and uncertainty. After the fifth shift, choose a recipient.

Controls: **W A S D** move, **left/right arrows** look, **E** interact, **N** notebook, **Escape** close/pause. Drag the scene to look around. The station buttons provide immediate navigation; touch movement controls are included.

The notebook and reading dialogs pause time. Kitchen, counter, office, drinks, and stockroom panels stay live. Default shifts last six minutes; three- and ten-minute options are available each morning. You can close a shift early and accept the consequences.

## Included systems

- Navigable software-rendered first-person pixel diner, with kitchen, dining room, office, and stockroom.
- Five original story shifts, ten recurring character identities, source-labelled case files, four decisions/endings, and continuing free service.
- Six authored order patterns with corrections and negation; browser English speech, replay, read-back, and optional captions.
- Beef/veggie cooking, raw/ready/burnt states, toppings, fries, coffee/soda, order matching, remakes, and waste.
- Stock replenishment, cash, daily costs, hygiene, customer patience, trust, suspicion, and three equipment upgrades.
- Twelve random event types plus the scripted storm outage. Repairs, writing a shortage notice, helping a regular, conflicting sources, false requests, and lost property.
- Real text entry for reports, cover identity, personal notes, and a public notice. Authored fact checks give transparent feedback.
- Autosave, JSON export/import, keyboard access, captions, slower patience, reduced weather motion, and touch station navigation.

## What this version is

Version **0.1.0** is a small complete campaign prototype, designed to demonstrate the connected simulation loop. It is not a finished commercial release. Dialogue is synthesized by the browser, with voice quality depending on the device. Report feedback uses authored patterns, not a language-model grader; valid paraphrases can be missed and some contradictions can escape detection. The art is a mixture of generated assets and original procedural environment rendering. See `docs/REVIEW.md` for validation and known limits.

## Files

| File | Purpose |
| --- | --- |
| `dist/index.html`, `style.css`, `app.js` | Interface, accessibility controls, persistence, and speech |
| `dist/core.js` | Simulation state and rules |
| `dist/story.js` | Full five-day script, orders, events, facts, and report criteria |
| `dist/world.js` | Navigable raycast environment and runtime props |
| `dist/art.js`, `food-art.js`, `cover.png` | Included art; no external image URLs needed |
| `docs/GAME-DESIGN.md` | Story, learning design, systems, and scope |
| `docs/ART-PROMPTS.md` | Production asset list and reusable English prompts |
| `docs/REVIEW.md` | Self-review, checks, risks, and honest verification limits |
| `tests/simulation.js` | Meaningful simulation regressions and campaign traversal |
| `tools/package.py` | Rebuild the standalone HTML and source ZIP |

## Development

Buildless HTML, CSS, and JavaScript. There are no npm dependencies. For an HTTP development preview, run `python3 -m http.server 8080 --directory dist` from this folder and open `http://localhost:8080`. Stop the server with Control-C.

On macOS, run the simulation suite from this folder:

```sh
/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc tests/simulation.js
/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc tests/render-smoke.js
```

The tests use the JavaScript shell's `load`, `readFile`, and `print` functions. The production game uses ordinary browser APIs. No secrets or service credentials belong in this project.

## Art budget

This build used **two PixelLab trial generations**: a character sheet and a food sheet. It reuses the existing diner cover. No further art generation is needed to run the project, and gameplay makes no paid API calls.
