# Version 0.3 — Visual and workstation redesign

The previous build used a procedural room and large centered workstation dialogs. This update makes the diner the main screen and places the tools around it.

- Illustrated counter, kitchen, back office, and stockroom. The drinks view crops the existing diner cover. Images preserve aspect ratio and crop inside the actual atlas frames.
- An order rail with hanging paper receipts, a green-screen pager, a metal service tray, a wooden station ledge, and a physical case-file shortcut.
- Docked live workstations with no full-screen dimmer. Orders and bottom station switches remain accessible. Reading documents still pauses time and uses a modal paper surface.
- Locally bundled Silkscreen pixel font under the included SIL Open Font License; no runtime font request.
- Real character-atlas portraits and food images on the grill. Supporting characters share some sprite variants; bespoke art for every identity is not claimed.
- Optional Explore diner mode retains the original walkable renderer. All existing saves and simulation systems remain compatible.

## Validation

59 simulation, renderer, and scene checks passed in JavaScriptCore. Another 15 DOM workflow checks passed using LinkeDOM with mocked canvas and speech. They cover clock-in, a complete authored meal, workstation navigation, transcript placement, note pausing, view switching, input guards, and event handling. The standalone HTML and source ZIP build successfully with both stylesheets, local font, and all scene modules included.

Artwork was inspected directly. Actual browser pixels, responsive screenshots, speech playback, and an extended human playthrough have not been verified. DOM checks do not establish final visual quality on every device.

## Budget

One additional PixelLab trial generation supplied the room atlas (three trial generations across the project). Existing cover, character, and food art are reused. No paid runtime AI calls or additional paid artwork were introduced.
