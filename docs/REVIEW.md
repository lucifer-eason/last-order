# Self-review — LAST ORDER 0.1.0

## Delivery assessment

This is a playable campaign prototype with a continuous restaurant simulation. It implements the requested combination of first-person diner work and undercover listening, reading, and writing. The player prepares actual orders, manages changing restaurant state, handles events, collects evidence, and writes summaries. It is a small five-shift game, not a finished commercial simulator.

## Verified

The automated checks pass **30 checks** in macOS JavaScriptCore: 27 simulation/script checks and three renderer smoke checks. Coverage includes all authored order variants; raw/ready/burnt cooking; incorrect components; payment integrity; contact verification and handoff prerequisites; expired pickup rejection; refrigeration and power failures; notice writing; every random-event resolution; expired events; stock and upgrades; inspection and cover reward integrity; all five authored report examples; simple negated time/place statements; duplicate-report prevention; day resets; partial evidence recovery; full traversal to each of four endings; free-service rollover; and save round-tripping. The browser scripts also parse successfully. Renderer checks draw every station in eight directions, render both atlas and procedural customers in lit/outage conditions, and verify that forward movement does not cross the service counter. These use a mock drawing context and do not evaluate actual browser pixels.

Static HTML checks verify unique IDs, every linked local script/style, included cover art, and no remote runtime assets in the page. Artwork was inspected before integration; the renderer and portrait coordinates were adjusted to the actual four-by-two character sheet.

Self-review corrected repeat payment on contact orders, repeat inspection rewards, daily random-event scheduling, free-service rollover, escaped report patterns, basic negation checks, a potentially hidden mandatory story screen after closing settings, and unstable event-button replacement.

## Verification limit

A browser-control connection was not available for this build. Full interactive visual QA, responsive screenshots, actual browser speech playback, keyboard focus behavior, and a human-length playthrough were not verified. Automated simulation traversal does not establish that every browser interaction works. Test the delivered version in a current browser before presenting it as a polished public release.

## Known limitations and design debts

- **Writing feedback:** authored patterns recognize expected facts and some negations. They can miss valid paraphrases or accept a contradictory statement. The interface labels the feedback as essential-fact checking rather than grammar or general language grading.
- **Speech:** uses installed English browser voices. Timbre and voice diversity vary by device; some devices may need connectivity for a chosen voice. Captions preserve all dialogue.
- **Art:** character and food atlases are generated; other regulars and the environment use procedural art. Character animations, directional walking sprites, and bespoke environmental illustrations are not included.
- **Events:** the twelve events have linked state changes, but several use a single response rather than a separate interactive scene. The notice event requires real writing; source-comparison events present authored evidence.
- **Balance:** the economic values and patience have not had extended human playtesting. Pausing reading dialogs is intentional accessibility support and reduces time pressure. Station jumps are an accessible alternative to movement.
- **Scope:** one interior, five shifts, six order patterns, four final choices. No open city, multiplayer, free-form AI dialogue, professional voice acting, or unlimited narrative generation.
- **Persistence:** saves are browser-local. Clearing browser data removes them; exported JSON provides a portable backup. Private-browsing and file-origin restrictions can prevent autosave.
- **Pixel rendering:** the game uses a lightweight software raycaster. Wall/counter occlusion, billboard scale, and motion comfort need visual playtesting across screen sizes.

## Budget and data

Two PixelLab trial generations were used. Existing cover art was reused. The game has no paid runtime AI calls, analytics, cloud save, microphone recording, or account requirement. No API keys are embedded. Source, authored story, asset prompts, and regression tests are included for review and continuation.

## Next review priorities

1. Play one full standard shift with a fresh player and observe order preparation, panel navigation, speech, and contact handling.
2. Inspect the title, first-person view, all work panels, report, and ending on desktop and a narrow mobile viewport.
3. Expand report acceptance examples and contradiction tests using player-written summaries.
4. Balance earnings, replenishment, and upgrades over all five shifts.
5. Replace the most repetitive event responses with spatial or conversational interactions, then commission only the extra art those interactions require.

## Publication status

The private site identity was registered, but source synchronization could not reach its upload host because DNS resolution failed in the execution environment. No successful web deployment is claimed. The delivered standalone HTML and source ZIP run independently of that service. The original project ID is retained for a later publishing retry.
