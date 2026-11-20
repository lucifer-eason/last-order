# LAST ORDER 0.2.0 — reviewed improvements

This update selectively incorporates the external audit supplied with the project. The live English-language game, five-shift story, original artwork, and version-1 saves are preserved.

## Changes adopted

- **Lost property:** the forgotten pager is now recorded, retained in saves, and visible in the office. Its owner remains unverified; logging it does not invent intelligence or award trust to an arbitrary character.
- **Cooking feedback:** each raw-to-ready and ready-to-burnt transition has a distinct cue. Sale audio uses a short two-note sequence. Muting still applies to both speech and effects.
- **Voice loading:** English voice choices refresh when the browser announces that its voice list has loaded. Existing event listeners are preserved. The browser's English fallback remains available when no list is exposed.
- **Shortcuts:** the kitchen supports 1/2 for patties, 3 for starting fries, C/O for toppings, A for the first ready patty, and F for lifting fries. Drinks supports 1 for coffee and 2 for soda. Counter supports R/Q for listening/clarification and Enter for service. Typing, modifier keys, repeated keydown events, and native Enter activation on focused buttons/links are protected.
- **Stable controls:** cooking timers update their text and progress rather than replacing focused buttons every quarter-second.
- **Report feedback:** adds evening time variants, written depot variants, and alteration/privacy vocabulary. Handles the tested shared negations, neither/nor, explicit corrections, and the non-negative phrase “not only.” A negated closure inside a longer Northline match is rejected.
- **Cash:** discarding a tray cannot create or increase debt. Existing daily overhead and its consequences still apply.
- **Events:** exhausted histories start a fresh cycle without duplicating active events; a fridge upgrade's prevented event still counts as seen. Free-service rollovers now settle unresolved faults rather than hiding their repair events and leaving broken machines behind.
- **Rendering:** reuses depth/counter/pixel buffers. The floor retains the earlier coarse pixel projection and palette, preparing one ImageData upload instead of thousands of rectangle calls. Customer state badges, patience bars, and equipment/document warnings are visible only when their sprites are visible. Reduced motion keeps warnings steady.
- **Packaging:** explicit UTF-8 and an optional separate output directory. New delivery builds can be generated without overwriting an earlier download.

## Suggestions adjusted or deferred

The proposed negation-window enlargement still fails the supplied “not at 7:30 or the east entrance” example: its regular expression does not consume the intervening time. This version tests and handles that specific scope rather than relying on a longer character window.

The proposed 256-color conversion is generally lossy. Pixel edges can stay sharp while colors change. This update retains the existing cover bytes and does not claim a 420 KB download or 88% reduction. A later asset optimization should be assessed visually and measured before replacing the cover.

The suggested 70% rendering speedup was not measured in a browser. The automated checks establish lower drawing-call counts and buffer reuse, not a universal frame-rate improvement.

Multi-choice event scenes are deferred to a narrative-design pass. Existing events retain their current story meaning.

## Validation

54 automated checks pass: 27 existing simulation/script checks, six renderer smoke checks, and 21 targeted improvement checks. Renderer samples compare projection and lit/outage colors with the previous calculation. Tests also cover old saves, actual event outcomes, cooking transitions, report counterexamples, asynchronous voice loading, and guarded shortcuts.

Interactive browser and visual playtesting remain unverified. The report evaluator remains an authored pattern system with limited language coverage, not a grammar examiner or general semantic model.

Generate an updated standalone build and full source ZIP with:

```sh
python3 tools/package.py --output-dir /tmp/last-order-v0.2.0
```
